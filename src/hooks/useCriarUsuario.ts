import api from '@/services/api';
import { showToast } from '@/utils/showToast';
import { useState } from 'react';


export function useCriarUsuario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const criarUsuario = async (perfil: number): Promise<boolean> => {
  const mensagem = perfil === 2 ? 'Professor' : 'Aluno';
    try {
      if (!username.trim() || !nome.trim() || !password.trim()) {
        showToast({
            type: 'alert',
            text1: 'Campos obrigatórios',
            text2: 'E-mail, nome e senha são obrigatórios.',
            duration: 7000,
        });
      return false;
    }
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
      showToast({
        type: 'success',
        text1: mensagem + ' cadastrado',
        text2: mensagem +  ' cadastrado com sucesso!',
      });
      return true;
    } catch (err) {
        showToast({
        type: 'error',
        text1: 'Falha ao criar o ' + mensagem,
        text2: 'Tente novamente mais tarde.',
      });
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