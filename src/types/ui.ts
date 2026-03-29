/**
 * Represents devices supported in the application
 *
 * This enum is used to differentiate UI and navigation behavior depending on the platform.
 * The values correspond to `Platform.OS` for React Native.
 *
 * @example
 * const currentDevice: Device = Device.IOS;
 * if (currentDevice === Device.Web) {
 *   console.log('Render web-specific UI');
 * }
 */
export enum Device {
  Web = 'web',
  IOS = 'ios',
  Android = 'android',
}
