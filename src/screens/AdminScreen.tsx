import { useAuth } from '@/context/AuthContext';
import { useExcluirPostagem } from '@/hooks/useExcluirPostagem';
import { useInfinitePosts } from '@/hooks/useInfinitePosts';
import { sharedStyles } from '@/theme/sharedStyles';
import { theme } from '@/theme/theme';
import { showConfirmToast, showToast } from '@/utils/showToast';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Layout from 'components/Layout';
import PostItem from 'components/PostItem';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { adminStyles } from './AdminScreen.styles';

export default function AdminScreen() {
  const { isLoggedIn } = useAuth();
  const navigation = useNavigation();
  const { excluirPostagem, postIdExcluindo } = useExcluirPostagem();
  const { posts, fetchPosts, refresh, loading, hasMore } = useInfinitePosts(10);

  const handleEdit = (postId: number) => {
    navigation.navigate('EditarPost', {
      postId,
      onGoBack: () => refresh(),
    });
  };

  const handleAdd = () => {
    navigation.navigate('CriarPost');
  };

  const handleDelete = (postId: number) => {
    showConfirmToast({
      text1: 'Confirmar exclusão',
      text2: 'Tem certeza que deseja excluir esta postagem?',
      onCancel: () => {
        Toast.hide();
     },
      onConfirm: async () => {
        await excluirPostagem(postId);
        refresh();
        Toast.hide();
        showToast({
          type: 'success',
          text1: 'Postagem excluída com sucesso!',
        });
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  if (!isLoggedIn) {
    return (
      <Layout>
        <View style={sharedStyles.center}>
          <Text style={adminStyles.locked}>Acesso restrito aos professores.</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={sharedStyles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostItem
              titulo={item.titulo}
              autor={item.usuario.nome}
              conteudo={item.conteudo.length > 50 ? item.conteudo.slice(0, 50) + '...' : item.conteudo}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
              loadingDelete={postIdExcluindo === item.id}
            />
          )}
          onEndReached={hasMore ? () => fetchPosts() : null}
          onEndReachedThreshold={0.5}
          onRefresh={refresh}
          refreshing={loading}
          ListFooterComponent={
            loading ? (
              <View style={{ paddingVertical: 16 }}>
                <ActivityIndicator size="small" color={theme.colors.secundaria} />
              </View>
            ) : !hasMore ? (
              <View style={{ paddingVertical: 16, alignItems: 'center' }}>
                <Text style={sharedStyles.footerText}>🎉 Você chegou ao fim da lista</Text>
              </View>
            ) : null
          }
        />
      </View>

      <TouchableOpacity style={adminStyles.fab} onPress={handleAdd}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </Layout>
  );
}

