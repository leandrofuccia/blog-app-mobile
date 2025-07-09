import api from '@/services/api';
import { showToast } from '@/utils/showToast';
import { useState } from 'react';

export function useEditarPostagem(postId: number) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);

  const carregarPostagem = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/posts/${postId}`);
      setTitulo(response.data.titulo);
      setConteudo(response.data.conteudo);
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Não foi possível carregar os dados da postagem',
        text2: 'Tente novamente mais tarde.',
      });
    
    } finally {
      setLoading(false);
    }
  };

  const atualizarPostagem = async () => {
    if (!titulo.trim() || !conteudo.trim()) {
      showToast({
        type: 'alert',
        text1: 'Campos obrigatórios',
        text2: 'Título e conteúdo são obrigatórios.',
        duration: 7000,
      });
      return false;
    }

    try {
      setLoading(true);
      await api.put(`/posts/${postId}`, {
        titulo,
        conteudo,
      });
      showToast({
        type: 'success',
        text1: 'Postagem atualizada!',
        text2: 'Sua postagem atualizada com sucesso.',
      });
      return true;
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Erro ao atualizar postagem',
        text2: 'Tente novamente mais tarde.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    titulo,
    conteudo,
    setTitulo,
    setConteudo,
    loading,
    carregarPostagem,
    atualizarPostagem,
  };
}