import api from "@/services/api";
import { useEffect, useState } from "react";

export function useCurtidaCount(postId: number) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchCount = async () => {
    try {

      console.log('entrou no useCurtidaCount postId ', postId)  
      setLoading(true);
      const res = await api.get(`/curtida/count/${postId}`);
      setCount(res.data.count);
      console.log('useCurtidaCount count = ', res.data.count) 
      setErro(null);
    } catch (err) {
      setErro("Erro ao carregar curtidas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [postId]);

  return { count, loading, erro, refresh: fetchCount };
}
