export const en = {
  actions: {
    add: 'Add',
    create: 'Create',
    update: 'Update',
    save: 'Save',
    send: 'Send',
    delete: 'Delete',
    cancel: 'Cancel',
    logout: 'Logout',
    ok: 'Ok',
    yes: 'Yes',
  },
  modal: {
    confirm_message: 'Are you sure ?',
  },
  success: {
    saved: 'Your changes have been saved.',
  },
  errors: {
    default: 'Something went wrong. Please try again.',
    invalid_url: 'Please enter a valid URL.',
  },
  auth: {
    signin_title: 'Sign in',
    signin_description: 'Enter your email and password.',
    signup_title: 'Create an account',
    signup_description:
      ' Enter your email and password to create your account.',
    signup_confirm_error_title: 'Invalid verification link',
    signup_confirm_error_description:
      'This verification link is invalid or has expired. Please restart signup to receive a new verification link.',
    signup_exchange_code_error:
      "Your account has been confirmed, but we couldn't sign you in automatically. Please try signing in manually or contact our support team if the issue persists",
    signup_exchange_empty_user:
      'Unable to complete your account creation. Please try again.',
    signup_create_profile_error:
      'We were unable to create your profile. Please contact our support team for assistance.',
    signup_create_profile_success:
      'Welcome aboard! Your account was created successfully.',
    delete_account_title: 'Delete account',
    delete_account_description: 'Your account is about to be deleted.',
    reset_email_title: 'Change email address',
    reset_password_title: 'Reset your password',
    reset_password_description:
      'Enter your email to receive a password reset link.',
    field_email: 'E-mail',
    field_password: 'Password',
    field_confirmedPassword: 'Confirm password',
    field_confirmedEmail: 'Confirm email address',
    forgot_password: 'Forgot your password ?',
    email_sent_title: 'Your email has been sent successfully!',
    email_sent_signup_description:
      'Please check your email to confirm your account and complete registration.',
    email_sent_reset_password_description:
      'If an account exists, you’ll receive a password reset link shortly. Please follow the instructions.',
    reset_password_done_description:
      'Your password has been successfully updated. Please sign in with your new password.',
  },
  profile: {
    name: 'Name',
    name_placeholder: 'Ex: John',
    surname: 'Surname',
    surname_placeholder: 'Ex: Doe',
    pseudo: 'Pseudo',
    pseudo_placeholder: 'Ex: Mimi Siku',
    date_of_birth: 'Date of birth',
  },
  performance: {
    weight: 'Weight (kg)',
    weight_placeholder: 'Ex: 34 kg',
    reps: 'Reps',
    reps_placeholder: 'Ex: 10 repetitions',
    date: 'Date',
    create_success: 'Nice! Your performance is up to date.',
    delete_message: 'This performance is about to be deleted.',
    empty_state_description:
      'You don’t have any performances yet. Create your first one to get started.',
  },
  exercise: {
    create_title: 'New exercise',
    create_title_placeholder: 'Bench press',
    create_success: 'Exercise {{name}} was created successfully 🎉',
    delete_message: 'This exercise is about to be deleted.',
  },
} as const;
