import api from '@/services/api';
import { showToast } from '@/utils/showToast';
import { useState } from 'react';

export function useEditarUsuario(credencialId: number, usuarioId: number) {
  const [username, setUserName] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [perfilid, setPerfilid] = useState('');
  const [loading, setLoading] = useState(false);
  
  const carregarUsuario = async () => {
    try {
      setLoading(true);
      console.log('usuarioId ', usuarioId);
      console.log('credencialId ', credencialId);

      const response = await api.get(`/usuario/credencial/${credencialId}`);
      const usuario = response.data?.[0];

      if (!usuario) {
        showToast({
            type: 'error',
            text1: 'Usuário não encontrado.',
        });
        return;
      }

      setUserName(usuario.credencial?.username ?? '');
      setNome(usuario.nome ?? '');
      setPerfilid(usuario.perfilid ?? '');
    } catch (err) {
      console.error(err);
      showToast({
        type: 'error',
        text1: 'Não foi possível carregar os dados do usuário.',
        text2: 'Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const atualizarUsuario = async () => {
    if (!username.trim() || !nome.trim() || !password.trim()) {
        showToast({
            type: 'alert',
            text1: 'Campos obrigatórios',
            text2: 'E-mail, nome e senha são obrigatórios.',
            duration: 7000,
        });
      return false;
    }

    try {
      setLoading(true);
      console.log('hook perfilid ', perfilid)  
      await api.put(`/usuario/${usuarioId}`, {
        nome,
        perfilid, 
      });

      await api.put(`/credencial/${credencialId}`, {
        username,
        password,
      });
      showToast({
        type: 'success',
        text1: 'Usuário atualizado',
        text2: 'Usuário atualizado com sucesso!',
      });
      return true;
    } catch (err) {
      console.error(err);
      showToast({
        type: 'error',
        text1: 'Não foi possível atualizar o usuário',
        text2: 'Tente novamente mais tarde.',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    nome,
    username,
    password,
    perfilid,
    setNome,
    setUserName,
    setPassword,
    setPerfilid,
    loading,
    carregarUsuario,
    atualizarUsuario,
  };
}
