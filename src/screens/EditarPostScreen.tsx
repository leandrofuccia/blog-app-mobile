import { useAuth } from '@/context/AuthContext';
import { useEditarPostagem } from '@/hooks/useEditarPostagem';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from 'components/Layout';
import { useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, TextInput, View } from 'react-native';

type RootStackParamList = {
  EditarPost: { postId: number; onGoBack?: () => void };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditarPost'>;

export default function EditarPostScreen({ route, navigation }: Props) {
  const { postId } = route.params;
  const { credencialId } = useAuth();

  const {
    titulo,
    conteudo,
    setTitulo,
    setConteudo,
    loading,
    carregarPostagem,
    atualizarPostagem,
  } = useEditarPostagem(postId);

  useEffect(() => {
    carregarPostagem();
  }, [postId]);

  const handleSubmit = async () => {
    const ok = await atualizarPostagem();
    if (ok) {
    route.params.onGoBack?.(); 
    navigation.goBack();
  }

  };

  return (
    <Layout>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.container}>
          
          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Título"
          />

          <TextInput
            style={[styles.input, styles.textarea]}
            value={conteudo}
            onChangeText={setConteudo}
            placeholder="Conteúdo"
            multiline
            numberOfLines={6}
          />

          <Button title="Atualizar" onPress={handleSubmit} color="#007AFF" />
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 10, borderRadius: 5,
    fontSize: 16, marginBottom: 16,
  },
  textarea: { height: 120, textAlignVertical: 'top' },
});