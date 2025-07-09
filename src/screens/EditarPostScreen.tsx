import { useAuth } from '@/context/AuthContext';
import { useEditarPostagem } from '@/hooks/useEditarPostagem';
import { sharedStyles } from '@/theme/sharedStyles';
import { theme } from '@/theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from 'components/Layout';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

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
        <ActivityIndicator
          size="large"
          color={theme.colors.primaria}
          style={{ marginTop: 20 }}
        />
      ) : (
        <View style={sharedStyles.container}>
          <Text style={sharedStyles.header}>Editar Postagem</Text>

          <TextInput
            style={sharedStyles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Título"
            placeholderTextColor={theme.colors.textoSecundario}
          />

          <TextInput
            style={[sharedStyles.input, sharedStyles.textarea]}
            value={conteudo}
            onChangeText={setConteudo}
            placeholder="Conteúdo"
            placeholderTextColor={theme.colors.textoSecundario}
            multiline
            numberOfLines={6}
          />

          <Pressable style={sharedStyles.button} onPress={handleSubmit}>
            <Text style={sharedStyles.buttonText}>Atualizar</Text>
          </Pressable>
        </View>
      )}
    </Layout>
  );
}

