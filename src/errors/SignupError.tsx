import type { SignupErrorType } from '@/src/types';

export class SignupError extends Error {
  readonly code: SignupErrorType;

  constructor(code: SignupErrorType, options?: ErrorOptions) {
    super(code, options);

    this.name = 'SignupError';
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
