import { theme } from '@/theme/theme';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
}

const FormContainer = ({ children }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
        style={styles.scroll}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.neutroFundo,
  },
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.neutroFundo,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.neutroFundo,
  },
});

export default FormContainer;
