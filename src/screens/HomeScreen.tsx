import { useInfinitePosts } from '@/hooks/useInfinitePosts';
import { theme } from '@/theme/theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Layout from 'components/Layout';
import PostItem from 'components/PostItem';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  type RootStackParamList = {
    Tabs: undefined;
    PostDetail: { postId: number };
  };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { posts, loading, error, fetchPosts, hasMore, refresh } = useInfinitePosts(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh(); 
    }, [])
  );

  const filteredPosts = posts.filter((post) => {
    const titulo = post.titulo?.toLowerCase() || '';
    const conteudo = post.conteudo?.toLowerCase() || '';
    const autor = post.usuario.nome?.toLowerCase() || '';
    const termo = search.toLowerCase();
    return titulo.includes(termo) || conteudo.includes(termo) || autor.includes(termo);
  });

  return (
    <Layout>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar postagens..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={theme.colors.textoSecundario}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        {filteredPosts.length === 0 && !error && !loading ? (
          <Text style={styles.emptyText}>Nenhuma postagem encontrada.</Text>
        ) : (
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.id })}>
                <PostItem
                  titulo={item.titulo}
                  autor={item.usuario.nome}
                  conteudo={item.conteudo.length > 50 ? item.conteudo.slice(0, 50) + '...' : item.conteudo}
                  showActions={false} 
                />
              </TouchableOpacity>
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
                  <Text style={styles.footerText}>🎉 Você chegou ao fim da lista</Text>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.neutroFundo,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.neutroBorda,
    backgroundColor: theme.colors.neutroInput,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    color: theme.colors.textoPrincipal,
    ...theme.fonts.body,
  },
  errorText: {
    color: theme.colors.vermelho,
    textAlign: 'center',
    marginTop: 20,
    ...theme.fonts.body,
  },
  emptyText: {
    color: theme.colors.textoSecundario,
    textAlign: 'center',
    marginTop: 20,
    ...theme.fonts.body,
  },
  footerText: {
    color: theme.colors.textoSecundario,
    ...theme.fonts.label,
  },
});
