import { useEffect, useState } from 'react';
import api from '../services/api';

export interface PostagemDetalhe {
  id: number;
  titulo: string;
  conteudo: string;
  datacriacao?: string;
  dataatualizacao?: string;
  usuario: {
    id: number;
    nome: string;
  };
}

export function usePostagemById(postId: number) {
  const [postagem, setPostagem] = useState<PostagemDetalhe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    setLoading(true);
    api
      .get(`/posts/${postId}`)
      .then(response => {
        setPostagem(response.data);
        setError(null);
      })
      .catch(err => {
        console.error('Erro ao buscar postagem:', err);
        setPostagem(null);
        setError('Não foi possível carregar a postagem.');
      })
      .finally(() => setLoading(false));
  }, [postId]);

  return { postagem, loading, error };
}