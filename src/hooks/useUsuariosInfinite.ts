import api from '@/services/api';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

type Usuarios = {
  id: number;
  nome: string;
  perfilid: number;
  datacriacao?: string;
  ultimologin?: string;
  credencialId?: number;
};

export function useUsuariosInfinite(limit = 10) {
  const [usuarios, setusuarios] = useState<Usuarios[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const { perfil } = route.params as { perfil: number };

  console.log('perfil Selecionado menu', perfil)

  const fetchusuarios = async (reset = false) => {
    if (loading) return;
    try {
      setLoading(true);
      const pageToFetch = reset ? 1 : page;
      const res = await api.get(`/usuario?page=${pageToFetch}&limit=${limit}`);
      const fetched = Array.isArray(res.data) ? res.data.filter(p => p.perfilid === perfil) : [];

      if (reset) {
        setusuarios(fetched);
        setPage(2);
        setHasMore(fetched.length >= limit);
      } else {
        setusuarios((prev) => {
          const merged = [...prev, ...fetched];
          const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());
          return unique;
        });
        if (fetched.length < limit) setHasMore(false);
        else setPage(prev => prev + 1);
      }
      setError(null);
    } catch {
      setError('Erro ao carregar usuários.');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setPage(1);
    setHasMore(true);
    fetchusuarios(true);
  };

  return { usuarios, fetchusuarios, refresh, loading, hasMore, error };
}