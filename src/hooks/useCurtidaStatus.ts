import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";

export function useCurtidaStatus(postId: number) {
  const [curtiu, setCurtiu] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
   const {usuarioId} = useAuth();

  const fetchStatus = async () => {
    try {
      setLoading(true);
      console.log('entrou no useCurtidaStatus')
      const res = await api.get(`/curtida/status/${postId}?usuarioid=${usuarioId}`);
      setCurtiu(res.data.curtiu);
      console.log('useCurtidaStatus', res.data.curtiu)
      setErro(null);
    } catch (err) {
      setErro("Erro ao verificar curtida.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [postId]);

  return { curtiu, loading, erro, refresh: fetchStatus, setCurtiu };
}
