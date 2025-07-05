import api from '@/services/api';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useExcluirUsuario() {
  const [usuarioIdExcluindo, setUsuarioIdExcluindo] = useState<number | null>(null);

  const excluirUsuario = async (credencialId: number, usuarioId: number): Promise<boolean> => {
    try {
      setUsuarioIdExcluindo(null);
      const response = await api.delete(`/usuario/${usuarioId}`);
      if (response.status === 200) {
            const responseCredencial = await api.delete(`/credencial/${credencialId}`);
            if (responseCredencial.status === 200){
                return true;
            }
      }
      Alert.alert('Erro', 'Não foi possível excluir a usuário.');
      return false;
    } catch (err) {
      Alert.alert('Erro', 'Falha ao tentar excluir a usuaário.');
      return false;
    } finally {
      setUsuarioIdExcluindo(null);
    }
  };

  return { excluirUsuario, usuarioIdExcluindo };

}