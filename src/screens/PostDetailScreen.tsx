import { useAuth } from '@/context/AuthContext';
import { useComentarioCount } from '@/hooks/useComentarioCount';
import { useCurtidaCount } from '@/hooks/useCurtidaCount';
import { useCurtidaStatus } from '@/hooks/useCurtidaStatus';
import { useExcluirCurtida } from '@/hooks/useExcluirCurtida';
import { useNovaCurtida } from '@/hooks/useNovaCurtida';
import { usePostagemById } from '@/hooks/usePostagemById';
import { theme } from '@/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import api from '../services/api';

type RootStackParamList = {
  PostDetail: { postId: number };
  Comentarios: { postId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;

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

export default function PostDetailScreen({ route }: Props) {
  const { postId } = route.params;
  const navigation = useNavigation();
  const [post, setPost] = useState<Post | null>(null);
  const { isLoggedIn } = useAuth();
  const { loading: postLoading } = usePostagemById(postId); // Renomeado para evitar conflito

  const { comentarioCount, erro: comentarioError } = useComentarioCount(postId);
  const { count: curtidaCount, refresh: refreshCurtidas } = useCurtidaCount(postId);
  const { curtiu, refresh: refreshStatus, setCurtiu } = useCurtidaStatus(postId);
  const { novaCurtida, loading: novaCurtidaLoading } = useNovaCurtida(postId); // Adicionado loading
  const { excluirCurtida, loading: excluirCurtidaLoading } = useExcluirCurtida(postId); // Adicionado loading

  useEffect(() => {
    api.get(`/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(() => setPost(null));
  }, [postId]);

  // Use um loading consolidado para desabilitar o botão de curtir
  const isLikingOrDisliking = novaCurtidaLoading || excluirCurtidaLoading;

  const handleToggleCurtida = async () => {
    if (!isLoggedIn || isLikingOrDisliking) { // Desabilita se não estiver logado ou já estiver processando
      return;
    }

    try {
      let success = false;
      if (curtiu) {
        success = await excluirCurtida(postId);
      } else {
        success = await novaCurtida(postId);
      }

      if (success) {
        setCurtiu(!curtiu); // Atualiza o estado local de curtiu
        refreshCurtidas(); // Atualiza a contagem de curtidas
      }
      // O refreshStatus não é estritamente necessário aqui se setCurtiu já está atualizando o estado
      // Mas pode ser útil para revalidar o status do servidor em casos mais complexos.
      // refreshStatus(); 
    } catch (err) {
      console.error('Erro ao atualizar curtida.', err);
      // O showToast já é tratado dentro dos hooks useNovaCurtida e useExcluirCurtida,
      // então não precisamos de um toast genérico aqui, a menos que haja um erro não tratado pelos hooks.
    }
  };

  if (postLoading) { // Usar o loading específico da postagem
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

        {/* Linha de Ações */}
        <View style={styles.actionsRow}>
          {/* Comentários */}
          <Pressable
            style={styles.actionButton}
            onPress={() => navigation.navigate('Comentarios', { postId })}
          >
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={theme.colors.textoPrincipal}
            />
            <Text style={styles.actionText}>{comentarioCount ?? 0}</Text>
          </Pressable>

          {/* Curtidas */}
          {isLoggedIn && (
            <Pressable
              style={styles.actionButton}
              onPress={handleToggleCurtida}
              disabled={isLikingOrDisliking} // Desabilita o botão enquanto a requisição está em andamento
            >
              {isLikingOrDisliking ? (
                <ActivityIndicator size="small" color={theme.colors.primaria} />
              ) : (
                <Ionicons
                  name={curtiu ? 'heart' : 'heart-outline'}
                  size={20}
                  color={curtiu ? theme.colors.primaria : theme.colors.textoPrincipal}
                />
              )}
              <Text style={styles.actionText}>{curtidaCount ?? 0}</Text>
            </Pressable>
          )}
          {!isLoggedIn && ( // Exibir apenas a contagem se não estiver logado
            <View style={styles.actionButton}>
              <Ionicons
                name="heart-outline"
                size={20}
                color={theme.colors.textoPrincipal}
              />
              <Text style={styles.actionText}>{curtidaCount ?? 0}</Text>
            </View>
          )}
        </View>
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
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    ...theme.fonts.label,
    color: theme.colors.textoPrincipal,
    marginLeft: 6,
  },
  error: {
    ...theme.fonts.body,
    textAlign: 'center',
    color: theme.colors.vermelho,
    marginTop: 40,
  },
});