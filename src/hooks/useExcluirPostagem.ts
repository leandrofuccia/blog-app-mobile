import api from '@/services/api';
import { showToast } from '@/utils/showToast';
import { useState } from 'react';

export function useExcluirPostagem() {
  const [postIdExcluindo, setPostIdExcluindo] = useState<number | null>(null);

  const excluirPostagem = async (postId: number): Promise<boolean> => {
    try {
      setPostIdExcluindo(null);
      const response = await api.delete(`/posts/${postId}`);
      if (response.status === 200) {
        showToast({
          type: 'success',
          text1: 'Postagem excluida!',
          text2: 'Sua postagem foi excluída com sucesso.',
        });
        return true;
      }
      showToast({
        type: 'error',
        text1: 'Erro ao excluir postagem',
        text2: 'Tente novamente mais tarde.',
      });
      return false;
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Falha ao tentar excluir a postagem',
        text2: 'Tente novamente mais tarde.',
      });
      return false;
    } finally {
      setPostIdExcluindo(null);
    }
  };

  return { excluirPostagem, postIdExcluindo };

}