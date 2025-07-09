import { theme } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const adminStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primaria,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  
  locked: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.vermelho,
    textAlign: 'center',
  },

});
