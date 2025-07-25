import { useAuth } from '@/context/AuthContext';
import { useCriarPostagem } from '@/hooks/useCriarPostagem';
import { sharedStyles } from '@/theme/sharedStyles';
import { theme } from '@/theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from 'components/Layout';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View
} from 'react-native';

export default function CriarPostScreen() {
  const navigation = useNavigation();
  const { credencialId } = useAuth();
  const { usuarioId } = useAuth();

  const {
    titulo,
    conteudo,
    setTitulo,
    setConteudo,
    loading,
    criarPostagem,
  } = useCriarPostagem();

  const route = useRoute();
  const { onGoBack } = route.params || {};

  const handleSubmit = async () => {
    if (usuarioId == null) return;
    const ok = await criarPostagem(usuarioId);
    if (ok) {
      navigation.goBack();
    }
  };

  return (
    <Layout>
      <View style={sharedStyles.container}>
        <Text style={sharedStyles.header}>Criar Postagem</Text>

        <TextInput
          style={sharedStyles.input}
          placeholder="Título"
          placeholderTextColor={theme.colors.textoSecundario}
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={[sharedStyles.input, sharedStyles.textarea]}
          placeholder="Conteúdo"
          placeholderTextColor={theme.colors.textoSecundario}
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          numberOfLines={6}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.primaria}
            style={{ marginTop: 16 }}
          />
        ) : (
          <Pressable style={sharedStyles.button} onPress={handleSubmit}>
            <Text style={sharedStyles.buttonText}>Publicar</Text>
          </Pressable>
        )}
      </View>
    </Layout>
  );
}

