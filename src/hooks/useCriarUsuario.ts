import api from '@/services/api';
import { useState } from 'react';
import { Alert } from 'react-native';


export function useCriarUsuario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const criarUsuario = async (perfil: number): Promise<boolean> => {
    
    const mensagem = perfil === 2 ? 'Professor' : 'Aluno';
    try {
      setLoading(true);
      const responseCredencial =  await api.post('/credencial', {
        username,
        password,
      });
     
      const credencialId = responseCredencial.data.id;
      

      console.log('Credencial criada com sucesso Id: ', credencialId );
      if (responseCredencial.data.id != null){
        await api.post('/usuario', {
            nome,
            perfilid: Number(perfil),
            credencialId: Number(credencialId),
        });
      }

      Alert.alert(mensagem +  ' cadastrado com sucesso!')
      return true;
    } catch (err) {
      Alert.alert('Erro', 'Falha ao criar o ' + mensagem);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    nome,
    setUsername,
    setPassword,
    setNome,
    loading,
    criarUsuario,
  };
}