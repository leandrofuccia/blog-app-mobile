import api from "@/services/api";
import { useEffect, useState } from "react";

type Comentario = {
  id: number;
  nome_autor: string;
  conteudo: string;
  datacriacao: string;
};

export function useComentarioByPostagem(postagemId: number | null) {
  const [comentario, setComentario] = useState<Comentario | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!postagemId) return;

    const fetchComentario = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/comentario/postagem/${postagemId}`);
        const dados = Array.isArray(res.data) ? res.data[0] : res.data;
        setComentario(dados);
        setErro(null);
      } catch (err) {
        setErro('Erro ao carregar informações do usuário.');
        setComentario(null);
      } finally {
        setLoading(false);
      }
    };

    fetchComentario();
  }, [postagemId]);

  return { comentario, loading, erro};
}