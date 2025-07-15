import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { showToast } from "@/utils/showToast";
import { useState } from "react";


export function useNovoComentario() {
  const [nomeAutor, setNomeAutor] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);
  const {isLoggedIn, usuarioId, username, nome } = useAuth();

  const novoComentario = async (postId: number): Promise<boolean> => {
    if (!conteudo.trim()) {
       showToast({
        type: 'alert',
        text1: 'Campo obrigatório',
        text2: 'Conteúdo é obrigatório.',
        duration: 7000,
      });
      return false;
    }

    try {
      setLoading(true);
      await api.post(`/comentario/${postId}`, {
        usuarioid: usuarioId, 
        nome_autor: nome,
        conteudo: conteudo.trim(),
      });  
      showToast({
        type: 'success',
        text1: 'Comentário adicionado!',
        text2: 'Seu comentário foi publicado com sucesso.',
      });
      return true;
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Erro ao adicionar comentário',
        text2: 'Tente novamente mais tarde.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    nomeAutor,
    conteudo,
    setNomeAutor,
    setConteudo,
    loading,
    novoComentario,
  };
}