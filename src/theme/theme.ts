import { TextStyle } from 'react-native';

export const theme = {
  colors: {
    primaria: '#10B981',          // Verde principal
    secundaria: '#34D399',        // Verde claro
    destaque: '#0E7490',          // Azul petróleo
    vermelho: '#EF4444',          // Vermelho
    neutroFundo: '#F0FDF4',       // Fundo geral
    neutroInput: '#FFFFFF',       // Campos
    neutroBorda: '#E5E7EB',       // Bordas
    textoPrincipal: '#111827',    // Títulos
    textoSecundario: '#374151',   // Subtítulos
    itemAtivoFundo: '#D1FAE5',    // Item ativo no Drawer
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
  },
};
