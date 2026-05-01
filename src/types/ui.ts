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

/**
 * Represents a validation error returned by React Hook Form.
 *
 * This type describes the structure of an error object associated with a form field.
 * It is typically used to display validation feedback in the UI.
 *
 * @property {string} [message] - Human-readable error message describing the validation issue.
 * @property {{ name: string }} [ref] - Reference to the input element associated with the error.
 * Contains the field name.
 * @property {string} [type] - Type of validation error (e.g., "required", "min", "maxLength").
 *
 * @example
 * const error: FormError = {
 *   message: "This field is required",
 *   type: "required",
 *   ref: { name: "email" }
 * };
 */
export type FormError = {
  message?: string;
  ref?: { name: string };
  type?: string;
};
