import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { showToast } from "@/utils/showToast";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export function useNovaCurtidaComentario(comentarioid: any) {
  const [loading, setLoading] = useState(false);
  const {isLoggedIn, usuarioId} = useAuth();

  const novaCurtidaComentario = async (comentarioid: number): Promise<boolean> => {
    try {
      console.log('entrou em novaCurtida')  
      console.log('comentarioid ', comentarioid)
      console.log('usuarioId ', usuarioId)
      setLoading(true);
      await api.post(`/curtidaComentario/${comentarioid}`, {
        usuarioid: usuarioId, 
      });  

      return true;
    } catch (err) {
      const error = err as AxiosError; 

      let errorMessage = 'Erro ao curtir postagem. Tente novamente mais tarde.';

      if (axios.isAxiosError(error) && error.response && error.response.data) {
        if (typeof error.response.data === 'object' && 'message' in error.response.data) {
          errorMessage = (error.response.data as { message: string }).message;
        }
      }
      showToast({
        type: 'error',
        text1: 'Erro ao curtir postagem',
        text2: errorMessage,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    novaCurtidaComentario,
  };
}