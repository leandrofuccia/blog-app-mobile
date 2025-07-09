import { theme } from '@/theme/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'alert';
  text1?: string;
  text2?: string;
}

const iconMap: Record<CustomToastProps['type'], string> = {
  success: 'checkmark-circle',
  error: 'close-circle',
  info: 'information-circle',
  alert: 'alert-circle',
};

const colorMap: Record<CustomToastProps['type'], string> = {
  success: theme.colors.sucesso,
  error: theme.colors.vermelho,
  info: theme.colors.info,
  alert: theme.colors.amarelo,
};

export default function CustomToast({
  type,
  text1,
  text2,
}: CustomToastProps) {
  return (
    <View
      style={[
        styles.container,
        { borderLeftColor: colorMap[type] },
      ]}
      accessibilityRole="alert"
      accessibilityLabel={`${type} toast`}
    >
      <Icon
        name={iconMap[type]}
        size={24}
        color={colorMap[type]}
        style={styles.icon}
      />

      <View style={styles.textContainer}>
        {text1 ? (
          <Text style={styles.text1}>{text1}</Text>
        ) : null}
        {text2 ? (
          <Text style={styles.text2}>{text2}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.neutroInput,
    borderLeftWidth: 4,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    ...theme.fonts.toastTitle,
    color: theme.colors.textoPrincipal,
  },
  text2: {
    ...theme.fonts.toastText,
    color: theme.colors.textoSecundario,
    marginTop: 2,
  },
});
