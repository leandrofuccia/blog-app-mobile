/*import { useAuth } from '@/context/AuthContext';
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

*/

import { useAuth } from '@/context/AuthContext';
import { useLogin } from '@/hooks/useLogin';
import Layout from 'components/Layout';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // <- ícone "eye" ou "eye-off"

export default function LoginScreen({ navigation }: any) {
  const { isLoggedIn, logout } = useAuth();
  const {
    email, password,
    setEmail, setPassword,
    loading, error,
    handleLogin,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

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
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutButtonText}>Sair</Text>
            </TouchableOpacity>
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
              placeholderTextColor="#888"
            />

            {/* Campo com ícone de olho */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                style={styles.passwordInput}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#007C91"
                />
              </TouchableOpacity>
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onLoginPress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#EAF8F1',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007C91',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#007C91',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007C91',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  eyeIcon: {
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#007C91',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    fontSize: 14,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 12,
  },
});
