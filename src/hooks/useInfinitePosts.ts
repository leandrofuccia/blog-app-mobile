import api from '@/services/api';
import { useState } from 'react';
import { Post } from './usePosts';

export function useInfinitePosts(limit = 10) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (reset = false) => {
    if (loading) return;

    try {
      setLoading(true);
      const pageToFetch = reset ? 1 : page;
      const response = await api.get(`/posts?page=${pageToFetch}&limit=${limit}`);
      const fetched = Array.isArray(response.data) ? response.data : [];

      if (reset) {
        setPosts(fetched);
        setPage(2); // próxima página será 2
        setHasMore(fetched.length >= limit);
      } else {
        setPosts((prev) => {
          const merged = [...prev, ...fetched];
          const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());
          return unique;
        });

        if (fetched.length < limit) {
          setHasMore(false);
        } else {
          setPage((prev) => prev + 1);
        }
      }

      setError(null);
    } catch (err) {
      setError('Erro ao carregar postagens.');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setHasMore(true);
    setPage(1);
    fetchPosts(true);
  };

  return { posts, fetchPosts, refresh, loading, hasMore, error };
}