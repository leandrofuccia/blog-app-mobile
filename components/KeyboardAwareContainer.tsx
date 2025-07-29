import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: ReactNode;
  style?: any;
}

export default function KeyboardAwareContainer({ children, style }: Props) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, style]}
      enableOnAndroid
      enableAutomaticScroll
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
});
