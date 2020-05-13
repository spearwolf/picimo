/* eslint-disable no-console */
import eventize, {Eventize} from 'eventize-js';

// TODO extract this class to a separate npm package: 'sticky-log'

const LogLevel = {
  ERROR: 1,
  WARN: 2,
  INFO: 4,
  DEBUG: 8,

  getDescription(logLevel: number) {
    if (logLevel === 0) return 'NONE';
    const level: string[] = [];
    if (logLevel & LogLevel.ERROR) level.push('ERROR');
    if (logLevel & LogLevel.WARN) level.push('WARN');
    if (logLevel & LogLevel.INFO) level.push('INFO');
    if (logLevel & LogLevel.DEBUG) level.push('DEBUG');
    return level.join('|');
  },
};

const $isInitialized = Symbol('isInitialized');

interface ILoggerConfig extends Eventize {
  defaultLogLevel: number;
  verbose: boolean;
  disable: boolean;
  logger: Record<string, number>;

  setDefaultLogLevel: (logLevel: number) => void;
  setLogLevel: (name: string, logLevel: number) => void;
  clearLogLevel: (name: string) => void;

  toJSON: (...args: any[]) => string;
  save: () => void;
  clear: () => void;
  remove: () => void;

  [$isInitialized]: boolean;
}

const GLOBAL_LOG_CONFIG_KEY = 'stickyLogConfig';
const LOCAL_STORAGE_KEY = 'stickyLogConfig';

const LOGGER_NAME = 'sticky-log';

const VERBOSE_BY_DEFAULT = false;
const DEFAULT_LOG_LEVEL =
  LogLevel.ERROR | LogLevel.WARN | LogLevel.INFO | LogLevel.DEBUG;

const debug = (domain: string, ...args: any[]) =>
  console.debug(`[${LOGGER_NAME}${domain ? `:${domain}` : ''}]`, ...args);

/**
 * @internal
 */
export const getGlobalLogConfig = () => {
  // @ts-ignore
  let cfg: ILoggerConfig = globalThis[GLOBAL_LOG_CONFIG_KEY];
  if (!cfg?.[$isInitialized]) {
    if (cfg?.disable === true) {
      // @ts-ignore
      cfg = {
        verbose: false,
        defaultLogLevel: 0,
        logger: {},
        [$isInitialized]: true,
        disable: true,
      };
    } else {
      const cfgAsStr = globalThis.localStorage?.getItem(LOCAL_STORAGE_KEY);
      if (cfgAsStr) {
        debug(null, 'load config from localStorage, key=', LOCAL_STORAGE_KEY);
        cfg = JSON.parse(cfgAsStr);
      } else if (cfg) {
        debug(null, 'using static config global, key=', GLOBAL_LOG_CONFIG_KEY);
      }
      cfg = eventize({
        verbose: cfg?.verbose ?? VERBOSE_BY_DEFAULT,
        defaultLogLevel: cfg?.defaultLogLevel ?? DEFAULT_LOG_LEVEL,
        logger: cfg?.logger ?? {},

        setDefaultLogLevel(this: ILoggerConfig, logLevel: number) {
          this.defaultLogLevel = logLevel;
          this.emit('defaultLogLevel', logLevel);
          if (this.verbose) {
            debug(
              null,
              `set default log level to ${LogLevel.getDescription(logLevel)}`,
            );
          }
        },

        setLogLevel(this: ILoggerConfig, name: string, logLevel: number) {
          this.logger[name] = logLevel;
          this.emit(name, logLevel);
        },

        clearLogLevel(this: ILoggerConfig, name: string) {
          delete this.logger[name];
          this.emit(name, undefined);
        },

        toJSON(this: ILoggerConfig, space?: string | number) {
          return JSON.stringify(
            {
              defaultLogLevel: this.defaultLogLevel,
              verbose: this.verbose,
              logger: this.logger,
            },
            null,
            space,
          );
        },

        save(this: ILoggerConfig) {
          const {localStorage} = globalThis;
          if (localStorage) {
            debug(
              null,
              'store config to localStorage, key=',
              LOCAL_STORAGE_KEY,
            );
            localStorage.setItem(LOCAL_STORAGE_KEY, this.toJSON());
          }
        },

        remove(this: ILoggerConfig) {
          const {localStorage} = globalThis;
          if (localStorage) {
            if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              debug(
                null,
                'removed config from localStorage, key=',
                LOCAL_STORAGE_KEY,
              );
            }
          }
        },

        clear(this: ILoggerConfig) {
          debug(null, 'clear config and reset to defaults');
          this.verbose = VERBOSE_BY_DEFAULT;
          this.defaultLogLevel = DEFAULT_LOG_LEVEL;
          Object.keys(this.logger).forEach((name) => this.clearLogLevel(name));
          this.logger = {};
        },

        [$isInitialized]: true,
        disable: false,
      });
    }
    // @ts-ignore
    globalThis[GLOBAL_LOG_CONFIG_KEY] = cfg;
  }
  return cfg;
};

const $log = Symbol('log');

/**
 * @public
 */
export class Logger {
  throttleTimeoutMs: number;
  paused = false;
  stopAfterNLogs: number;
  logLevel: number;

  private readonly name: string;
  private lastLog: any[] = [];
  private sleeping = false;
  private logCount = 0;

  constructor(name: string, throttleTimeoutMs = 0, stopAfterNLogs = Infinity) {
    this.name = name;
    this.throttleTimeoutMs = throttleTimeoutMs;
    this.stopAfterNLogs = stopAfterNLogs;

    const logConfig = getGlobalLogConfig();
    if (!logConfig.disable) {
      this.logLevel = logConfig.logger[this.name] ?? logConfig.defaultLogLevel;
      const updateLogLevel = (logLevel: number) => {
        if (logLevel !== this.logLevel) {
          if (logConfig.verbose) {
            debug(
              name,
              `switch log level to ${LogLevel.getDescription(logLevel)}`,
            );
          }
          this.logLevel = logLevel;
        }
      };
      logConfig.on('defaultLogLevel', (defaultLogLevel: number) => {
        this.logLevel = logConfig.logger[this.name] ?? defaultLogLevel;
      });
      logConfig.on(this.name, (logLevel: number) => {
        updateLogLevel(logLevel ?? logConfig.defaultLogLevel);
      });

      if (logConfig.verbose) {
        debug(name, 'created', this);
      }
    } else {
      const noop = (): void => undefined;
      Object.defineProperties(this, {
        logLevel: {value: 0},
        log: {value: noop},
        debug: {value: noop},
        info: {value: noop},
        warn: {value: noop},
        error: {value: noop},
        DEBUG: {value: false},
        LOG: {value: false},
        VERBOSE: {value: false},
        INFO: {value: false},
        WARN: {value: false},
        ERROR: {value: false},
      });
      this.log = () => undefined;
      this.debug = () => undefined;
      this.info = () => undefined;
      this.warn = () => undefined;
      this.error = () => undefined;
    }
  }

  get DEBUG() {
    return (this.logLevel & LogLevel.DEBUG) !== 0;
  }

  get LOG() {
    return (this.logLevel & LogLevel.DEBUG) !== 0;
  }

  get VERBOSE() {
    return (this.logLevel & LogLevel.DEBUG) !== 0;
  }

  get INFO() {
    return (this.logLevel & LogLevel.INFO) !== 0;
  }

  get WARN() {
    return (this.logLevel & LogLevel.WARN) !== 0;
  }

  get ERROR() {
    return (this.logLevel & LogLevel.ERROR) !== 0;
  }

  log = this[$log].bind(this, 'debug');
  debug = this[$log].bind(this, 'debug');
  info = this[$log].bind(this, 'info');
  warn = this[$log].bind(this, 'warn');
  error = this[$log].bind(this, 'error');

  private [$log](
    logMethod: 'debug' | 'info' | 'warn' | 'error',
    ...messages: any[]
  ) {
    if (!this.paused && !this.sleeping) {
      if (!this.equalsLastLog(messages)) {
        this.lastLog = messages;
        console[logMethod](`[${this.name}]`, ...messages);
        if (this.throttleTimeoutMs > 0) {
          this.sleeping = true;
          setTimeout(() => {
            this.sleeping = false;
          }, this.throttleTimeoutMs);
        }
        ++this.logCount;
        if (this.logCount >= this.stopAfterNLogs) {
          this.paused = true;
          this.logCount = 0;
          if (getGlobalLogConfig().verbose) {
            debug(
              this.name,
              `logger stopped after ${this.stopAfterNLogs} messages`,
            );
          }
        }
      }
    }
  }

  private equalsLastLog(messages: any[]) {
    const {lastLog} = this;
    if (messages.length === lastLog.length) {
      const {length} = messages;
      for (let i = 0; i < length; i++) {
        if (messages[i] !== lastLog[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
}
