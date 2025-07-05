import api from '@/services/api';
import { useState } from 'react';
import { Alert } from 'react-native';

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
        Alert.alert('Erro', 'Usuário não encontrado.');
        return;
      }

      setUserName(usuario.credencial?.username ?? '');
      setNome(usuario.nome ?? '');
      setPerfilid(usuario.perfilid ?? '');
      //setPassword(usuario.credencial?.password ?? '');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    } finally {
      setLoading(false);
    }
  };

  const atualizarUsuario = async () => {
    if (!username.trim() || !nome.trim() || !password.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha e-mail, nome e senha.');
      return false;
    }

    try {
      setLoading(true);
      console.log('hook perfilid ', perfilid)  
      // Atualiza o nome e perfilId no /usuario/:usuarioId
      await api.put(`/usuario/${usuarioId}`, {
        nome,
        perfilid, 
      });

      // Atualiza a credencial no /credencial/:credencialId
      await api.put(`/credencial/${credencialId}`, {
        username,
        password,
      });

      Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      return true;
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
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
