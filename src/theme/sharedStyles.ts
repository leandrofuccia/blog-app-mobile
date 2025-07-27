// src/theme/sharedStyles.ts
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const sharedStyles = StyleSheet.create({
  // Usado em telas para conter o conteúdo
  container: {
    flex: 1,
    padding: 16,
  },

  // Título centralizado com destaque
  header: {
    ...theme.fonts.headerTitle,
    color: theme.colors.primaria,
    marginBottom: 20,
    textAlign: 'center',
  },

  // Input padrão reutilizável
  input: {
    borderWidth: 1,
    borderColor: theme.colors.neutroBorda,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: theme.colors.neutroInput,
    color: theme.colors.textoPrincipal,
  },

  // Textarea (input de múltiplas linhas)
  textarea: {
    height: 140,
    textAlignVertical: 'top',
  },

  // Botão padrão com cor de destaque
  button: {
    backgroundColor: theme.colors.destaque,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  buttonText: {
    ...theme.fonts.button,
    color: '#fff',
  },

  // Centraliza conteúdo na vertical e horizontal
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Texto secundário (rodapé, dicas, etc.)
  footerText: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.textoSecundario,
  },

  scrollContainer: {
  flexGrow: 1,
  justifyContent: 'center',
},

});
