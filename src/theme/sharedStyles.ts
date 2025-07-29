import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    ...theme.fonts.headerTitle,
    color: theme.colors.primaria,
    marginBottom: 20,
    textAlign: 'center',
  },

 
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

  textarea: {
    height: 140,
    textAlignVertical: 'top',
  },

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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

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
