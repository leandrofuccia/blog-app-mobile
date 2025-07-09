import api from '@/services/api';
import { useEffect, useState } from 'react';

export interface Postagem {
  id: number;
  titulo: string;
  conteudo: string;
  usuarioid: number;
  datacriacao?: string;
  dataatualizacao?: string;
}

export function usePosts(page = 1, limit = 10) {
  const [posts, setPosts] = useState<Postagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get<Postagem[]>(`/posts`, {
        params: { page, limit },
      });
      setPosts(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar postagens');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };
}