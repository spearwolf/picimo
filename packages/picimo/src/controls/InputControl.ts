const $unregister = Symbol('unregister');

export class InputControl {
  private readonly [$unregister]: [EventTarget, string, any][] = [];

  protected subscribe = (
    host: EventTarget,
    eventName: string,
    callback: any,
  ) => {
    host.addEventListener(eventName, callback, {passive: true});
    this[$unregister].push([host, eventName, callback]);
  };

  get isActive() {
    return this[$unregister].length > 0;
  }

  stop() {
    this[$unregister].forEach(([host, eventName, callback]) => {
      host.removeEventListener(eventName, callback);
    });
    this[$unregister].length = 0;
  }
}
