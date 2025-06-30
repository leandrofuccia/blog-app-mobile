import api from '@/services/api';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useExcluirPostagem() {
  const [postIdExcluindo, setPostIdExcluindo] = useState<number | null>(null);

  const excluirPostagem = async (postId: number): Promise<boolean> => {
    try {
      setPostIdExcluindo(null);
      const response = await api.delete(`/posts/${postId}`);
      if (response.status === 200) {
        return true;
      }
      Alert.alert('Erro', 'Não foi possível excluir a postagem.');
      return false;
    } catch (err) {
      Alert.alert('Erro', 'Falha ao tentar excluir a postagem.');
      return false;
    } finally {
      setPostIdExcluindo(null);
    }
  };

  return { excluirPostagem, postIdExcluindo };

}