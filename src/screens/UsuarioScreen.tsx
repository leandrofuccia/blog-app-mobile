
import { useExcluirUsuario } from '@/hooks/useExcluirUsuario';
import { useUsuariosInfinite } from '@/hooks/useUsuariosInfinite';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from 'components/Layout';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function UsuarioScreen() {
  const navigation = useNavigation();
  const { usuarios, fetchusuarios, refresh, loading, hasMore } = useUsuariosInfinite(10);
  const route = useRoute();
  const { perfil } = route.params as { perfil: number };
  const { excluirUsuario, usuarioIdExcluindo } = useExcluirUsuario();

  useEffect(() => {
    fetchusuarios(); // Carrega inicial
  }, []);

  const handleEditar = (credencialId: number, usuarioId: number) => {
    navigation.navigate('EditarUsuario', { credencialId, usuarioId });
  };

  /*const handleExcluir = (id: number) => {
    var mensagem = `Deseja excluir este ${perfil === 2 ? 'professor' : 'aluno'}`;
    Alert.alert('Confirmar exclusão', mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/usuario/${id}`);
            refresh();
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir o ' + mensagem);
          }
        },
      },
    ]);
  };*/

  const handleExcluir = (credencialId: number, usuarioId: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir o usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const sucesso = await excluirUsuario(credencialId, usuarioId);
            if (sucesso) {
              refresh();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleCadastrar = () => {
    navigation.navigate('CriarUsuario');
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>
          {perfil === 2 ? 'Professores' : 'Alunos'}
        </Text>

        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => hasMore && fetchusuarios()}
          onEndReachedThreshold={0.5}
          onRefresh={refresh}
          refreshing={loading}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEditar(item.credencialId!, item.id)}>
                  <MaterialIcons name="edit" size={24} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluir(item.credencialId!, item.id)} style={{ marginLeft: 12 }}>
                  <MaterialIcons name="delete" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={
            loading ? (
              <View style={styles.footer}><ActivityIndicator size="small" color="#999" /></View>
            ) : !hasMore ? (
              <View style={styles.footer}><Text style={styles.fim}>🎉 Todos os {perfil === 2 ? 'professores' : 'alunos'} carregados</Text></View>
            ) : null
          }
        />

        <TouchableOpacity style={styles.fab} onPress={handleCadastrar}>
          <MaterialIcons name="person-add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  nome: { fontSize: 16, fontWeight: 'bold' },
  actions: { flexDirection: 'row' },
  footer: { paddingVertical: 16, alignItems: 'center' },
  fim: { color: '#999' },
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
  },
});