import api from '@/services/api';
import { useState } from 'react';

type Comentario = {
  id: number;
  nome_autor: string;
  conteudo: string;
  datacriacao: string;
  curtidasCount?: number;
  postagem_titulo: string;
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
      console.log('entrou no useInfiniteComentarioByPostagem fetchComentarios, page:', pageToFetch);

      const response = await api.get(
        `/comentario/postagem/${postagemId}?page=${pageToFetch}&limit=${limit}`
      );

      const fetched = Array.isArray(response.data) ? response.data.map((raw: any) => ({
        id: raw.comentario_id,
        nome_autor: raw.comentario_nome_autor,
        conteudo: raw.comentario_conteudo,
        datacriacao: raw.comentario_datacriacao,
        curtidasCount: Number(raw.curtidasCount ?? 0),
        postagem_titulo: raw.postagem_titulo,
      })) : [];

      console.log('useInfiniteComentarioByPostagem fetched', fetched);

      if (reset) {
        setComentarios(fetched);
        setPage(2);
        setHasMore(fetched.length === limit); 
      } else {
        setComentarios((prev) => {
          const merged = [...prev, ...fetched];
          const unique = Array.from(new Map(merged.map((c) => [c.id, c])).values());
          return unique;
        });
        setPage((prev) => prev + 1);
        setHasMore(fetched.length === limit);
      }

      setError(null);
    } catch (err) {
      console.error("Erro em fetchComentarios:", err);
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
