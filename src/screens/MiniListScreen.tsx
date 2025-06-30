import { usePosts } from '@/hooks/usePosts';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function MiniListScreen() {
  const { posts, loading, error } = usePosts();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de Lista</Text>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && posts.length === 0 && (
        <Text style={styles.empty}>Nenhuma postagem encontrada.</Text>
      )}

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.titulo}</Text>
            <Text>{item.conteudo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  text: { fontWeight: 'bold' },
  error: { color: 'red', marginTop: 10 },
  empty: { color: '#555', marginTop: 10 },
});