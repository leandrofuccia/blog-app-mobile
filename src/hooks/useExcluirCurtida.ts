import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { showToast } from '@/utils/showToast';
import { useState } from "react";

export function useExcluirCurtida(postId: number) {
    const [curtidaIdExcluida, setcurtidaIdExcluindo] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { usuarioId } = useAuth();

  const excluirCurtida = async (curtidaId: number): Promise<boolean> => {
    try {
      console.log('entrou no excluirCurtida');
      console.log('postId ', postId);
      console.log('usuarioId ', usuarioId);
      setLoading(true); 
      setcurtidaIdExcluindo(null); 

      await api.delete(`/curtida/${postId}`, {
        params: {
          usuarioid: usuarioId
        }
      });
      return true;
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Falha ao tentar descurtir a postagem',
        text2: 'Tente novamente mais tarde.',
      });
      return false;
    } finally {
      setLoading(false);
      setcurtidaIdExcluindo(null); 
    }
  };

  return { excluirCurtida, curtidaIdExcluida, loading };
}