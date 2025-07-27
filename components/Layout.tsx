import { theme } from '@/theme/theme';
import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.neutroFundo,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutroFundo,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default Layout;
