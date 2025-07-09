import { TextStyle } from 'react-native';

export const theme = {
  colors: {
    primaria: '#10B981',          // Verde principal
    secundaria: '#34D399',        // Verde claro
    destaque: '#0E7490',          // Azul petróleo
    neutroFundo: '#F0FDF4',       // Fundo geral
    neutroInput: '#FFFFFF',       // Campos
    neutroBorda: '#E5E7EB',       // Bordas
    textoPrincipal: '#111827',    // Títulos
    textoSecundario: '#374151',   // Subtítulos
    itemAtivoFundo: '#D1FAE5',    // Item ativo no Drawer
    sucesso: '#28a745',
    vermelho: '#dc3545',
    amarelo: '#ffc107',
    info: '#17a2b8',
  },

  fonts: {
    headerTitle: {
      fontWeight: '600',
      fontSize: 18,
    } as TextStyle,

    label: {
      fontWeight: '500',
      fontSize: 14,
    } as TextStyle,

    body: {
      fontWeight: '400',
      fontSize: 16,
    } as TextStyle,

    button: {
      fontWeight: '600',
      fontSize: 16,
    } as TextStyle,

    regular: {
      fontWeight: '400',
      fontSize: 15,
    } as TextStyle,

    toastTitle: {
      fontSize: 16,
      fontWeight: '600',
    }as TextStyle,

    toastText: {
     fontSize: 14,
     fontWeight: '400',
    }as TextStyle,
  },
  

};
