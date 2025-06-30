import api from '@/services/api';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useEditarPostagem(postId: number) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);

  const carregarPostagem = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/posts/${postId}`);
      setTitulo(response.data.titulo);
      setConteudo(response.data.conteudo);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar os dados da postagem.');
    } finally {
      setLoading(false);
    }
  };

  const atualizarPostagem = async () => {
    if (!titulo.trim() || !conteudo.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha título e conteúdo.');
      return false;
    }

    try {
      setLoading(true);
      await api.put(`/posts/${postId}`, {
        titulo,
        conteudo,
      });
      Alert.alert('Sucesso', 'Postagem atualizada com sucesso!');
      return true;
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível atualizar a postagem.');
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
    carregarPostagem,
    atualizarPostagem,
  };
}