/**
 * Represents the different states of the authentication flow.
 *
 * * Each value corresponds to a specific step in the authentication process:
 *
 * 1. **signinRequest** - User is entering their credentials to sign in
 * 2. **signupRequest** - User is creating a new account
 * 3. **signupEmailSent** - A confirmation email has been successfully sent
 * 4. **signupConfirm** - User account is validated in Supabase, and the profile is created in the database
 * 5. **resetPasswordRequest** - User submits their email to receive a password reset link
 * 6. **resetPasswordEmailSent** - A password reset email has been successfully sent
 * 7. **resetPasswordConfirm** - User is entering a new password using the reset link
 * 8. **resetPasswordDone** - Password has been successfully updated
 *
 * @example
 * const mode: AuthMode = 'signinRequest';
 */
export type AuthMode =
  | 'signinRequest'
  | 'signupRequest'
  | 'signupEmailSent'
  | 'signupConfirm'
  | 'resetPasswordRequest'
  | 'resetPasswordEmailSent'
  | 'resetPasswordConfirm'
  | 'resetPasswordDone';

/**
 * Represents the query parameters returned by Supabase during the password recovery flow.
 * These parameters are automatically appended to the URL when the user is redirected
 * from the password reset email to the application.
 *
 * 1. **access_token** - Temporary access token used to authenticate the user during the recovery session
 * 2. **type** - Indicates the authentication flow type in Supabase (`recovery` for password reset, `signup` for new user account)
 * 3. **refresh_token** - Life duration of the access_token
 *
 */
export type AuthSearchParams = {
  access_token?: string;
  type?: 'recovery' | 'signup';
  refresh_token?: string;
};

/**
 * Represents a user profile stored in the database.
 *
 * This model links application-specific user data to the Supabase authentication user.
 *
 * 1. **id** - Unique identifier (UUID) of the profile (primary key)
 * 2. **userId** - Identifier of the associated Supabase Auth user
 * 3. **createdAt** - Profile creation date (ISO 8601 string)
 *
 * @example
 * const profile: Profile = {
 *   id: 'uuid-123',
 *   userId: 'supabase-user-456',
 *   createdAt: '2026-03-29T08:30:56.073Z',
 * };
 */
export type Profile = {
  id: string;
  userId: string;
  createdAt: string;
};

/**
 * Represents the credentials required by Supabase to authenticate a user.
 *
 * This payload is typically used for authentication requests such as sign-in or sign-up.
 *
 * 1. **email** - User's email address
 * 2. **password** - User's password (sensitive data)
 *
 * @example
 * const payload: SupabasePayload = {
 *   email: 'test@hotmail.fr',
 *   password: 'testpassword',
 * }
 */
export type SupabasePayload = {
  email: string;
  password: string;
};
