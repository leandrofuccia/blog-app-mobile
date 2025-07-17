import api from "@/services/api";
import { useEffect, useState } from "react";

export function useCurtidaComentarioCount(comentarioid: number) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchCount = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/curtidaComentario/count/${comentarioid}`);
      setCount(res.data.count);
      setErro(null);
    } catch (err) {
      setErro("Erro ao carregar curtidas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [comentarioid]);

  return { count, loading, erro, refresh: fetchCount };
}
