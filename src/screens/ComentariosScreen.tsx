import { useAuth } from '@/context/AuthContext';
import { useInfiniteComentarioByPostagem } from '@/hooks/useInfiniteComentarioByPostagem';
import { sharedStyles } from '@/theme/sharedStyles';
import { theme } from '@/theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ComentarioCard } from 'components/ComentarioCard';
import Layout from 'components/Layout';
import Fab from 'components/ui/Fab';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';


type RootStackParamList = {
  Comentarios: { postId: number };
  NovoComentario: { postId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Comentarios'>;

export default function ComentariosScreen({ route }: Props) {
  const { postId } = route.params;
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();

  const {
    comentarios,
    fetchComentarios,
    refresh,
    loading,
    hasMore,
    error,
  } = useInfiniteComentarioByPostagem(10, postId);

  const handleAdd = () => {
    navigation.navigate('NovoComentario', {
      postId,
      onGoBack: () => refresh(),
    });
  };

  useEffect(() => {
    fetchComentarios(true);
  }, [postId]);

  return (
    <Layout>
      <View style={styles.container}>
        {error && <Text style={styles.error}>{error}</Text>}

        <FlatList
          data={comentarios}
          keyExtractor={(item, index) => (item?.id != null ? item.id.toString() : `temp-${index}`)}
          renderItem={({ item }) => (
            <ComentarioCard item={item} /> // Use o novo componente ComentarioCard
          )}
         contentContainerStyle={styles.flatListContentContainer} 
          ListEmptyComponent={
            !loading ? (
              <Text style={styles.noComments}>Nenhum comentário ainda.</Text>
            ) : null
          }
          onEndReached={() => {
            if (hasMore && !loading) fetchComentarios();
          }}
          onEndReachedThreshold={0.2}
          refreshing={loading}
          onRefresh={refresh}
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

        {isLoggedIn && (
          <Fab onPress={handleAdd}>
            <MaterialIcons name="add" size={26} color="#fff" />
          </Fab>
        )}
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
  title: {
    ...theme.fonts.headerTitle,
    color: theme.colors.textoPrincipal,
    marginBottom: 16,
  },
  error: {
    ...theme.fonts.body,
    textAlign: 'center',
    color: theme.colors.vermelho,
    marginBottom: 12,
  },
  noComments: {
    ...theme.fonts.body,
    textAlign: 'center',
    color: theme.colors.textoSecundario,
    marginVertical: 16,
  },
  addCommentButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primaria,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  addCommentText: {
    ...theme.fonts.button,
    color: '#fff',
    marginLeft: 8,
  },
  flatListContentContainer: {
    paddingBottom: 80, 
  },
});