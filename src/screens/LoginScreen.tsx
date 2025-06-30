import { useAuth } from '@/context/AuthContext';
import { useLogin } from '@/hooks/useLogin';
import Layout from 'components/Layout';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const { isLoggedIn, logout } = useAuth();
  const {
    email, password,
    setEmail, setPassword,
    loading, error,
    handleLogin,
  } = useLogin();

  const onLoginPress = async () => {
    const ok = await handleLogin();
    if (ok) {
      Alert.alert('Bem-vindo!', 'Login realizado com sucesso');
      navigation.goBack();
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        {isLoggedIn ? (
          <>
            <Text style={styles.title}>Você já está logado.</Text>
            <Button title="Sair" onPress={logout} color="#FF3B30" />
          </>
        ) : (
          <>
            <Text style={styles.title}>Login de Professor</Text>

            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            {error && <Text style={styles.error}>{error}</Text>}

            <Button
              title={loading ? 'Entrando...' : 'Entrar'}
              onPress={onLoginPress}
              disabled={loading}
              color="#007AFF"
            />
          </>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 10, borderRadius: 5,
    marginBottom: 12, fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});