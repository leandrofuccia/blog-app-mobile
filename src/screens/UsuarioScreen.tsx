
import { useExcluirUsuario } from '@/hooks/useExcluirUsuario';
import { useUsuariosInfinite } from '@/hooks/useUsuariosInfinite';
import { theme } from '@/theme/theme';
import { showConfirmToast, showToast } from '@/utils/showToast';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from 'components/Layout';
import Card from 'components/ui/Card';
import Fab from 'components/ui/Fab';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function UsuarioScreen() {
  const navigation = useNavigation();
  const { usuarios, fetchusuarios, refresh, loading, hasMore } = useUsuariosInfinite(10);
  const route = useRoute();
  const { perfil } = route.params as { perfil: number };
  const { excluirUsuario, usuarioIdExcluindo } = useExcluirUsuario();

  useEffect(() => {
    fetchusuarios();
  }, []);

  /*const handleEditar = (credencialId: number, usuarioId: number) => {
    navigation.navigate('EditarUsuario', { credencialId, usuarioId });
  };*/

  const handleEditar = (credencialId: number, usuarioId: number) => {
    navigation.navigate('EditarUsuario', {
      credencialId,
      usuarioId,
      onGoBack: () => refresh(),
    });
  };


  const handleExcluir = (credencialId: number, usuarioId: number) => {
    showConfirmToast({
      text1: 'Confirmar exclusão',
      text2: 'Tem certeza que deseja excluir o usuário?',
      onCancel: () => {
        Toast.hide();
      },
      onConfirm: async () => {
        await excluirUsuario(credencialId, usuarioId);
        refresh();
        Toast.hide();
        showToast({
        type: 'success',
          text1: 'Usuário excluído com sucesso!',
        });
      },
    });
  };

  /*const handleCadastrar = () => {
    navigation.navigate('CriarUsuario');
  };*/

  const handleCadastrar = () => {
    navigation.navigate('CriarUsuario', {
      onGoBack: () => refresh(),
    });
  };

  return (
    <Layout>
      {/* View container normal */}
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
            <Card>
              <Text style={styles.nome}>{item.nome}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleEditar(item.credencialId!, item.id)}
                >
                  <MaterialIcons
                    name="edit"
                    size={22}
                    color={theme.colors.primaria}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleExcluir(item.credencialId!, item.id)}
                >
                  <MaterialIcons
                    name="delete"
                    size={22}
                    color={theme.colors.vermelho}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          )}
          ListFooterComponent={
            loading ? (
              <View style={styles.footer}>
                <ActivityIndicator
                  size="small"
                  color={theme.colors.textoSecundario}
                />
              </View>
            ) : !hasMore ? (
              <View style={styles.footer}>
                <Text style={styles.fim}>
                  🎉 Todos os {perfil === 2 ? 'professores' : 'alunos'} carregados
                </Text>
              </View>
            ) : null
          }
        />

        {/* FAB flutuante */}
        <Fab onPress={handleCadastrar}>
          <MaterialIcons name="person-add" size={26} color="#fff" />
        </Fab>
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
  title: {
    ...theme.fonts.headerTitle,
    color: theme.colors.primaria,
    textAlign: 'center',
    marginBottom: 16,
  },
  nome: {
    ...theme.fonts.body,
    color: theme.colors.textoPrincipal,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 6,
    marginLeft: 8,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  fim: {
    ...theme.fonts.label,
    color: theme.colors.textoSecundario,
  },
});
