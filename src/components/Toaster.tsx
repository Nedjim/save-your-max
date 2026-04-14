import { Toaster } from 'sonner-native';

const ToasterComponent = () => {
  return (
    <Toaster
      position="top-center"
      richColors
      toastOptions={{
        success: {
          backgroundColor: '#F0FDF4',
          borderColor: '#22C55E',
          borderLeftColor: '#22C55E',
        },

        error: {
          backgroundColor: '#FEF2F2',
          borderColor: '#EF4444',
          borderLeftWidth: 4,
          borderLeftColor: '#EF4444',
        },

        info: {
          backgroundColor: '#EFF6FF',
          borderColor: '#3B82F6',
          borderLeftWidth: 4,
          borderLeftColor: '#3B82F6',
        },
      }}
    />
  );
};

export default ToasterComponent;
