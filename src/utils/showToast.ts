import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info' | 'alert';

interface ShowToastParams {
  type: ToastType;
  text1: string;
  text2?: string;
  duration?: number;
}

export const showToast = ({
  type,
  text1,
  text2,
  duration = 5000,
}: ShowToastParams) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'bottom',
    visibilityTime: duration,
  });
};


export const showConfirmToast = ({
  text1,
  text2,
  onConfirm,
  onCancel,
}: {
  text1: string;
  text2?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  Toast.show({
    type: 'confirm',
    text1,
    text2,
    position: 'top',
    autoHide: false,
    props: {
      onConfirm,
      onCancel,
    },
  });
};
