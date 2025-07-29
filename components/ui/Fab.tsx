import { theme } from '@/theme/theme';
import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FABProps {
  onPress: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

export default function Fab({ onPress, children, style }: FABProps) {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[
        styles.fab,
        { bottom: 16 + insets.bottom },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    backgroundColor: theme.colors.primaria,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
