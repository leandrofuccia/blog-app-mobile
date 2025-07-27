import { useAuth } from '@/context/AuthContext';
import { useCriarPostagem } from '@/hooks/useCriarPostagem';
import { sharedStyles } from '@/theme/sharedStyles';
import { theme } from '@/theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import FormContainer from 'components/FormContainer';
import Layout from 'components/Layout';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function CriarPostScreen() {
  const navigation = useNavigation();
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
      <FormContainer>
        <View>
          <Text style={sharedStyles.header}>Criar Postagem</Text>

          <TextInput
            style={sharedStyles.input}
            placeholder="Título"
            placeholderTextColor={theme.colors.textoSecundario}
            value={titulo}
            onChangeText={setTitulo}
            returnKeyType="next"
          />

          <TextInput
            style={[sharedStyles.input, sharedStyles.textarea, { minHeight: 120 }]}
            placeholder="Conteúdo"
            placeholderTextColor={theme.colors.textoSecundario}
            value={conteudo}
            onChangeText={setConteudo}
            multiline
            textAlignVertical="top"
          />

          {loading ? (
            <ActivityIndicator
              size="large"
              color={theme.colors.primaria}
              style={{ marginTop: 16 }}
            />
          ) : (
            <Pressable style={[sharedStyles.button, { marginTop: 16 }]} onPress={handleSubmit}>
              <Text style={sharedStyles.buttonText}>Publicar</Text>
            </Pressable>
          )}
        </View>
      </FormContainer>
    </Layout>
  );
}

