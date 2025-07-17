import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { showToast } from "@/utils/showToast";
import { useState } from "react";

export function useExcluirCurtidaComentario(comentarioid: number) {
  const [curtidaComentarioIdExcluida, setcurtidaComentarioIdExcluindo] = useState<number | null>(null);
  const { usuarioId} = useAuth();

  const excluirCurtidaComentario = async (comentarioid: number): Promise<boolean> => {
    try {
      console.log('entrou no excluirCurtida')
      console.log('comentarioid ', comentarioid)
      console.log('usuarioId ', usuarioId)
      setcurtidaComentarioIdExcluindo(null);
      await api.delete(`/curtidaComentario/${comentarioid}`, {
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
      setcurtidaComentarioIdExcluindo(null);
    }
  };

  return { excluirCurtidaComentario, curtidaComentarioIdExcluida };

}