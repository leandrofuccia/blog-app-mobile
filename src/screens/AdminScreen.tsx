
/*import { useAuth } from '@/context/AuthContext';
import { useExcluirPostagem } from '@/hooks/useExcluirPostagem';
import { usePosts } from '@/hooks/usePosts';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Layout from 'components/Layout';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function AdminScreen() {
  const { isLoggedIn } = useAuth();
  const { posts, loading, error, refetch } = usePosts();
  
  const navigation = useNavigation();
  const { excluirPostagem, postIdExcluindo  } = useExcluirPostagem();
  const route = useRoute();
  const [refreshFlag, setRefreshFlag] = useState(false);



  const handleEdit = (postId: number) => {
        navigation.navigate('EditarPost', {
        postId,
        onGoBack: () => refetch()
      });
  };

  const handleAdd = () => {
      navigation.navigate('CriarPost', {
      onGoBack: () => setRefreshFlag(true)

    });
  };

 useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );




  const handleDelete = (postId: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta postagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            console.log(`Excluindo post ${postId}`);
            const sucesso = await excluirPostagem(postId);
            if (sucesso) {
              refetch(); // Atualiza a lista após exclusão
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <View style={styles.center}>
          <Text style={styles.locked}>Acesso restrito aos professores.</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Gerenciar Postagens</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.postTitle}>{item.titulo}</Text>
                  <Text style={styles.postAuthor}>Autor: {item.usuario.nome}</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.iconButton}>
                    <MaterialIcons name="edit" size={24} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.iconButton}
                    disabled={postIdExcluindo === item.id}
                  >
                    {postIdExcluindo === item.id ? (
                      <ActivityIndicator size={20} color="#FF3B30" />
                    ) : (
                      <MaterialIcons name="delete" size={24} color="#FF3B30" />
                    )}
                  </TouchableOpacity>

                </View>
              </View>
            )}
          />
        )}
      </View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => handleAdd()}
          >
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  postItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  postTitle: { fontSize: 16, fontWeight: 'bold' },
  postAuthor: { fontSize: 14, color: '#555' },
  actions: { flexDirection: 'row' },
  iconButton: { marginLeft: 10 },
  error: { color: 'red', textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  locked: { fontSize: 16, color: 'red' },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

*/

import { useAuth } from '@/context/AuthContext';
import { useExcluirPostagem } from '@/hooks/useExcluirPostagem';
import { useInfinitePosts } from '@/hooks/useInfinitePosts';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Layout from 'components/Layout';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta postagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const sucesso = await excluirPostagem(postId);
            if (sucesso) {
              refresh();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [])
  );

  if (!isLoggedIn) {
    return (
      <Layout>
        <View style={styles.center}>
          <Text style={styles.locked}>Acesso restrito aos professores.</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Gerenciar Postagens</Text>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.postTitle}>{item.titulo}</Text>
                <Text style={styles.postAuthor}>Autor: {item.usuario.nome}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.iconButton}>
                  <MaterialIcons name="edit" size={24} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.iconButton}
                  disabled={postIdExcluindo === item.id}
                >
                  {postIdExcluindo === item.id ? (
                    <ActivityIndicator size={20} color="#FF3B30" />
                  ) : (
                    <MaterialIcons name="delete" size={24} color="#FF3B30" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
          onEndReached={hasMore ? () => fetchPosts() : null}
          onEndReachedThreshold={0.5}
          onRefresh={refresh}
          refreshing={loading}
          ListFooterComponent={
            loading ? (
            <View style={{ paddingVertical: 16 }}>
              <ActivityIndicator size="small" color="#999" />
            </View>
          ) : !hasMore ? (
            <View style={{ paddingVertical: 16, alignItems: 'center' }}>
              <Text style={{ color: '#999' }}>🎉 Você chegou ao fim da lista</Text>
            </View>
          ) : null
        }
        
        />
      </View>

      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  postItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  postTitle: { fontSize: 16, fontWeight: 'bold' },
  postAuthor: { fontSize: 14, color: '#555' },
  actions: { flexDirection: 'row' },
  iconButton: { marginLeft: 10 },
  error: { color: 'red', textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  locked: { fontSize: 16, color: 'red' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});