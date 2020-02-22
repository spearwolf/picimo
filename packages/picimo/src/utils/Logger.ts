export class Logger {
  throttleTimeoutMs: number;
  paused = false;
  stopAfterNLogs: number;

  private readonly name: string;
  private lastLog: any[] = [];
  private sleeping = false;
  private logCount = 0;

  constructor(name: string, throttleTimeoutMs = 0, stopAfterNLogs = Infinity) {
    this.name = name;
    this.throttleTimeoutMs = throttleTimeoutMs;
    this.stopAfterNLogs = stopAfterNLogs;
    console.debug(`[${name}] logger created:`, this);
  }

  log(...messages: any[]) {
    if (!this.paused && !this.sleeping) {
      if (!this.equalsLastLog(messages)) {
        this.lastLog = messages;
        console.debug(`[${this.name}]`, ...messages);
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
          console.debug(
            `[${this.name}] logger stopped after ${this.stopAfterNLogs} messages`,
          );
        }
      }
    }
  }

  equalsLastLog(messages: any[]) {
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
