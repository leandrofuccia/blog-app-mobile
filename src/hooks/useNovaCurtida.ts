import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { showToast } from "@/utils/showToast";
import axios, { AxiosError } from 'axios'; // Importar AxiosError para tipagem
import { useState } from "react";

export function useNovaCurtida(postId: any) {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, usuarioId } = useAuth();

  const novaCurtida = async (postId: number): Promise<boolean> => {
    try {
      console.log('entrou em novaCurtida');
      console.log('postId ', postId);
      console.log('usuarioId ', usuarioId);
      setLoading(true);
      await api.post(`/curtida/${postId}`, {
        usuarioid: usuarioId,
      });

      return true;
    } catch (err) {
      // Tipar o erro como AxiosError para acessar as propriedades de resposta
      const error = err as AxiosError; 

      let errorMessage = 'Erro ao curtir postagem. Tente novamente mais tarde.';

      // Verificar se o erro é uma resposta do Axios e se tem uma mensagem no data
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        // Acessar a mensagem específica do backend
        if (typeof error.response.data === 'object' && 'message' in error.response.data) {
          errorMessage = (error.response.data as { message: string }).message;
        }
      }

      showToast({
        type: 'error',
        text1: 'Erro ao curtir postagem',
        text2: errorMessage, // Exibir a mensagem do backend ou a mensagem padrão
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    novaCurtida,
  };
}