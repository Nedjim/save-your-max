import { toast } from 'sonner-native';
import { FormError } from '../types';

type FormFieldError = [string, FormError];

export const toastFormFieldError = (error: FormFieldError) => {
  const [fieldName, content] = error;

  const formattedFieldName =
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

  const toastError = `${formattedFieldName}: ${content.message || 'invalid input'}`;

  toast.error(toastError);
};
