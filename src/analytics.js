// @flow

export function track(eventName: string, eventData?: Object): void {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
}
