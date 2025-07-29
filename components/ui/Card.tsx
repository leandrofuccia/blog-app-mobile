import { theme } from '@/theme/theme';
import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.neutroInput,
    borderWidth: 1,
    borderColor: theme.colors.neutroBorda,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
});
