import { useEffect, useState } from 'react';
import api from '../services/api';

export interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  usuarioid: number;
  datacriacao?: string;
  dataatualizacao?: string;
  usuario: {
    id?: number;
    nome: string;
  };
}


export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/posts?limit=50');
      console.log('response.data', response.data);
      
      if (Array.isArray(response.data)) {
        setPosts(response.data); 
      } else {
        console.warn('Resposta inesperada:', response.data);
        setPosts([]);
      }

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
  }, []);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };
}

