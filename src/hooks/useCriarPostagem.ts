import api from '@/services/api';
import { showToast } from '@/utils/showToast';
import { useState } from 'react';

export function useCriarPostagem() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);

  const criarPostagem = async (usuarioid: number): Promise<boolean> => {
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
      await api.post('/posts', {
        titulo,
        conteudo,
        usuarioid,
      });
      showToast({
        type: 'success',
        text1: 'Postagem criada!',
        text2: 'Sua postagem foi publicada com sucesso.',
      });
      return true;
    } catch (err) {
      showToast({
        type: 'error',
        text1: 'Erro ao criar postagem',
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
    criarPostagem,
  };
}