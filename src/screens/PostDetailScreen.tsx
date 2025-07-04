import { usePostagemById } from '@/hooks/usePostagemById';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import api from '../services/api';

type PostDetailParams = {
  PostDetail: {
    postId: number;
  };
};

type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  datacriacao?: string;
  usuario: {
    id: number;
    nome: string;
  };
};

type RootStackParamList = {
  PostDetail: { postId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;


export default function PostDetailScreen({ route }: Props) {
  const { postId } = route.params;

  const [post, setPost] = useState<Post | null>(null);
  const { postagem, loading, error } = usePostagemById(postId);


  useEffect(() => {
    api.get(`/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(() => setPost(null))
      ;
  }, [postId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (!post) {
    return <Text style={styles.error}>Postagem não encontrada.</Text>;
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>{post.titulo}</Text>
        <Text style={styles.author}>Autor(a): {post.usuario?.nome}</Text>
        <Text style={styles.date}>
          Criado em:{' '}
          {post.datacriacao
              ? new Date(post.datacriacao).toLocaleDateString('pt-BR')
              : 'data desconhecida'}
          </Text>
        <Text style={styles.content}>{post.conteudo}</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  author: { fontSize: 16, color: '#555' },
  date: { fontSize: 14, color: '#888', marginBottom: 20 },
  content: { fontSize: 16, lineHeight: 24, color: '#333' },
  error: { marginTop: 40, textAlign: 'center', color: 'red' },
});