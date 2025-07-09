import { usePostagemById } from '@/hooks/usePostagemById';
import { theme } from '@/theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  const { loading } = usePostagemById(postId);

  useEffect(() => {
    api.get(`/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(() => setPost(null));
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primaria} />
      </View>
    );
  }

  if (!post) {
    return (
      <Layout>
        <View style={styles.center}>
          <Text style={styles.error}>Postagem não encontrada.</Text>
        </View>
      </Layout>
    );
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.neutroFundo,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.neutroFundo,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.neutroFundo,
  },
  title: {
    ...theme.fonts.headerTitle,
    color: theme.colors.textoPrincipal,
    marginBottom: 10,
  },
  author: {
    ...theme.fonts.body,
    color: theme.colors.textoSecundario,
    marginBottom: 4,
  },
  date: {
    ...theme.fonts.label,
    color: theme.colors.textoSecundario,
    marginBottom: 16,
  },
  content: {
    ...theme.fonts.body,
    lineHeight: 24,
    color: theme.colors.textoPrincipal,
  },
  error: {
    ...theme.fonts.body,
    textAlign: 'center',
    color: theme.colors.vermelho,
    marginTop: 40,
  },
});
