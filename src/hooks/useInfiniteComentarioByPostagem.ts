import api from '@/services/api';
import { useState } from 'react';

type Comentario = {
  id: number;
  nome_autor: string;
  conteudo: string;
  datacriacao: string;
};

export function useInfiniteComentarioByPostagem(limit = 10, postagemId: number | null) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComentarios = async (reset = false) => {
    if (!postagemId) return;
    if (loading) return;

    try {
      setLoading(true);
      const pageToFetch = reset ? 1 : page;
      const response = await api.get(
        `/comentario/postagem/${postagemId}?page=${pageToFetch}&limit=${limit}`
      );

      const fetched = Array.isArray(response.data) ? response.data : [];

      if (reset) {
        setComentarios(fetched);
        setPage(2);
        setHasMore(fetched.length >= limit);
      } else {
        setComentarios((prev) => {
          const merged = [...prev, ...fetched];
          const unique = Array.from(new Map(merged.map((c) => [c.id, c])).values());
          return unique;
        });
        setPage((prev) => prev + 1);
        setHasMore(fetched.length >= limit);
      }

      setError(null);
    } catch (err) {
      setError('Erro ao carregar comentários.');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setHasMore(true);
    setPage(1);
    fetchComentarios(true);
  };

  return { comentarios, fetchComentarios, refresh, loading, hasMore, error };
}
