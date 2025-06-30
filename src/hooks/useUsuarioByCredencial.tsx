import api from '@/services/api';
import { useEffect, useState } from 'react';

type Usuario = {
  id: number;
  nome: string;
  perfilid: number;
  credencialId: number;
};

export function useUsuarioByCredencial(credencialId: number | null) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!credencialId) return;

    const fetchUsuario = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/usuario/credencial/${credencialId}`);
        const dados = Array.isArray(res.data) ? res.data[0] : res.data;
        setUsuario(dados);
        setErro(null);
      } catch (err) {
        setErro('Erro ao carregar informações do usuário.');
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [credencialId]);

  const isProfessor = usuario?.perfilid === 2;

  return { usuario, loading, erro, isProfessor };
}