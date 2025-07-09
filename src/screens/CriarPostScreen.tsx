/*import { useAuth } from '@/context/AuthContext';
import { useCriarPostagem } from '@/hooks/useCriarPostagem';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from 'components/Layout';
import { ActivityIndicator, Button, StyleSheet, TextInput, View } from 'react-native';

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

 
  
  console.log ('usuarioId ', usuarioId)
  const handleSubmit = async () => {
    if (usuarioId == null) return;
    const ok = await criarPostagem(usuarioId);
    if (ok) {
      navigation.goBack();
    }   
  };

  return (
    <Layout>
      <View style={styles.container}>
        
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Conteúdo"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          numberOfLines={6}
        />

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 16 }} />
        ) : (
          <Button title="Publicar" onPress={handleSubmit} color="#007AFF" />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    borderRadius: 5, fontSize: 16, marginBottom: 16,
  },
  textarea: { height: 120, textAlignVertical: 'top' },
});

function onGoBack() {
  throw new Error('Function not implemented.');
}

*/

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

