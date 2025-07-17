import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";

export function useCurtidaComentarioStatus(comentarioid: number) {
  const [curtiu, setCurtiu] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
   const {usuarioId} = useAuth();

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/curtidaComentario/status/${comentarioid}?usuarioid=${usuarioId}`);
      setCurtiu(res.data.curtiu); // true ou false
      setErro(null);
    } catch (err) {
      setErro("Erro ao verificar curtida.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [comentarioid]);

  return { curtiu, loading, erro, refresh: fetchStatus, setCurtiu };
}
