import api from "@/services/api";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export function useComentarioCount(postagemId: number | null) {
  const [comentarioCount, setComentarioCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!postagemId) return;

      const fetchComentarioCount = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/comentario/count/${postagemId}`);
          const count = res.data;
          setComentarioCount(count);
          setErro(null);
        } catch (err) {
          console.error(err);
          setErro("Erro ao carregar informações do comentário.");
          setComentarioCount(null);
        } finally {
          setLoading(false);
        }
      };

      fetchComentarioCount();
    }, [postagemId])
  );

  return { comentarioCount, loading, erro };
}
