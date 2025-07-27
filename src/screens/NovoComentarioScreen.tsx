import { useAuth } from '@/context/AuthContext';
import { useNovoComentario } from '@/hooks/useNovoComentario';
import { theme } from '@/theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormContainer from 'components/FormContainer';
import Layout from 'components/Layout';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

type RouteParams = {
  postId: number;
};

export default function NovoComentarioScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params as RouteParams;

  const { username, credencialId, nome } = useAuth(); // se tiver auth
  const [nomeAutor, setNomeAutor] = useState(nome ? nome : '');
  const {
      conteudo,
      setConteudo,
      loading,
      novoComentario,
    } = useNovoComentario();
 
    const { onGoBack } = route.params || {};
 
    const handleSubmit = async () => {
      if (postId == null) return;
      const ok = await novoComentario(postId);
      if (ok) {
        route.params.onGoBack?.();
        navigation.goBack();
      }
    };
  

  return (
    <Layout>
      <FormContainer>
      <View style={styles.container}>
        <Text style={styles.label}>Nome do autor</Text>
        <TextInput
          style={[
            styles.input,
            username && styles.inputDisabled,
          ]}
          placeholder="Seu nome"
          value={nomeAutor}
          onChangeText={setNomeAutor}
          editable={!username} // desativa se estiver logado
        />

        <Text style={styles.label}>Conteúdo</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Digite seu comentário..."
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          numberOfLines={4}
        />

        <Pressable
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar Comentário</Text>
          )}
        </Pressable>
      </View>
      </FormContainer>
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
    marginBottom: 20,
  },
  label: {
    ...theme.fonts.label,
    color: theme.colors.textoSecundario,
    marginBottom: 6,
  },
  input: {
    backgroundColor: theme.colors.neutroInput,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.neutroBorda,
    color: theme.colors.textoPrincipal,
    marginBottom: 16,
  },
  inputDisabled: {
    backgroundColor: theme.colors.neutroBorda,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: theme.colors.primaria,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    ...theme.fonts.button,
    color: '#fff',
  },
});

