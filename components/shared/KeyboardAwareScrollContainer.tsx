import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  children: ReactNode;
}

export default function KeyboardAwareScrollViewWrapper({ children }: Props) {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.innerContainer}>
        {children}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  innerContainer: {
    flex: 0, 
  },
});
