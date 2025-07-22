
import { theme } from '@/theme/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface ConfirmToastProps {
  text1: string;
  text2?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmToast({
  text1,
  text2,
  onConfirm,
  onCancel,
}: ConfirmToastProps) {
  return (
    <View
      style={styles.container}
      accessibilityRole="alert"
      accessibilityLabel="Confirmação de ação"
    >
      <Icon
        name="help-circle"
        size={24}
        color={theme.colors.amarelo}
        style={styles.icon}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={onCancel}
          style={styles.cancelButton}
          accessibilityLabel="Cancelar exclusão"
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onConfirm}
          style={styles.confirmButton}
          accessibilityLabel="Confirmar exclusão"
        >
          <Text style={styles.confirmText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: theme.colors.neutroInput,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.amarelo,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  icon: {
    marginRight: 10,
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
  buttons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  cancelButton: {
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  cancelText: {
    ...theme.fonts.button,
    color: theme.colors.textoSecundario,
  },
  confirmButton: {
    backgroundColor: theme.colors.vermelho,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  confirmText: {
    ...theme.fonts.button,
    color: '#fff',
  },
});
