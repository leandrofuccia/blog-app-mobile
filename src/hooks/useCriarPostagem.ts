import api from '@/services/api';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useCriarPostagem() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);

  const criarPostagem = async (usuarioid: number): Promise<boolean> => {
    if (!titulo.trim() || !conteudo.trim()) {
      Alert.alert('Campos obrigatórios', 'Título e conteúdo são obrigatórios.');
      return false;
    }

    try {
      setLoading(true);
      await api.post('/posts', {
        titulo,
        conteudo,
        usuarioid,
      });
      Alert.alert('Postagem criada com sucesso!');
      return true;
    } catch (err) {
      Alert.alert('Erro', 'Falha ao criar a postagem.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    titulo,
    conteudo,
    setTitulo,
    setConteudo,
    loading,
    criarPostagem,
  };
}