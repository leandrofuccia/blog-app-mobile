import api from '@/services/api';
import { showToast } from '@/utils/showToast';
import { useState } from 'react';

export function useExcluirUsuario() {
  const [usuarioIdExcluindo, setUsuarioIdExcluindo] = useState<number | null>(null);

  const excluirUsuario = async (credencialId: number, usuarioId: number): Promise<boolean> => {
    try {
      setUsuarioIdExcluindo(null);
      const response = await api.delete(`/usuario/${usuarioId}`);
      if (response.status === 200) {
            const responseCredencial = await api.delete(`/credencial/${credencialId}`);
            if (responseCredencial.status === 200){
              showToast({
                type: 'success',
                text1: 'Usuário excluido!',
                text2: 'Usuário excluído com sucesso.',
              });
              return true;
            }
      }
      showToast({
        type: 'error',
        text1: 'Não foi possível excluir a usuário.',
        text2: 'Tente novamente mais tarde.',
      });
      return false;
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Falha ao tentar excluir a usuaário.',
        text2: 'Tente novamente mais tarde.',
      });
      return false;
    } finally {
      setUsuarioIdExcluindo(null);
    }
  };

  return { excluirUsuario, usuarioIdExcluindo };

}