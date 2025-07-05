/*import { useCriarUsuario } from '@/hooks/useCriarUsuario';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from 'components/Layout';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CriarUsuarioScreen() {
  const navigation = useNavigation();
  
  const {
    username,
    password,
    nome,
    setUsername,
    setPassword,
    setNome,
    loading,
    criarUsuario,
  } = useCriarUsuario();
  
  const route = useRoute();
  const { onGoBack } = route.params || {};
  const { perfil } = route.params as { perfil: number };

  const [showPassword, setShowPassword] = useState(false); 
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nomeError, setNomeError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [confirmPasswordError, setConfirmPasswordErro] = useState('');


  
  console.log ('perfil ', perfil)
  const handleSubmit = async () => {

  let hasError = false;

  setEmailError('');
  setNomeError('');
  setPasswordError('');
  setConfirmPasswordErro('');

  if (!nome.trim()) {
    setNomeError('O nome é obrigatório.');
    hasError = true;
  } else if (nome.length > 40) {
    setNomeError('O nome não pode ter mais que 40 caracteres.');
    hasError = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!username.trim()) {
    setEmailError('O e-mail é obrigatório.');
    hasError = true;
  } else if (!emailRegex.test(username)) {
    setEmailError('E-mail inválido.');
    hasError = true;
  }

  if (!password) {
    setSenhaError('A senha é obrigatória.');
    hasError = true;
  } else if (password.length < 4 || password.length > 20) {
    setSenhaError('A senha deve ter entre 4 e 20 caracteres.');
    hasError = true;
  }

  if (!confirmPassword) {
    setPasswordError('Confirme a senha.');
    hasError = true;
  } else if (password !== confirmPassword) {
    setPasswordError('As senhas não coincidem.');
    hasError = true;
  }

  if (hasError || perfil == null) return;


  const ok = await criarUsuario(perfil);
    if (ok) {
      navigation.goBack();
    }   
  };

  return (
    <Layout>
      <View style={styles.container}>
        
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => {
          setNome(text);
          if (nomeError) setNomeError('');
        }}
          
        />
        {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (emailError) setEmailError('');
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            value={password}
            onChangeText={(text) =>{
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#007bff"
            />
          </TouchableOpacity>
          {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={(text) =>{
                setConfirmPassword(text);
                if (confirmPasswordError) setConfirmPasswordErro('');
              }
            }
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

    
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 16 }} />
        ) : (
          <Button title="Salvar" onPress={handleSubmit} color="#007AFF" />
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
  toggleButton: {paddingHorizontal: 10, },
  toggleButtonText: { color: '#007bff', },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },


});

function onGoBack() {
  throw new Error('Function not implemented.');
}
*/

import { useCriarUsuario } from '@/hooks/useCriarUsuario';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from 'components/Layout';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CriarUsuarioScreen() {
  const navigation = useNavigation();

  const {
    username,
    password,
    nome,
    setUsername,
    setPassword,
    setNome,
    loading,
    criarUsuario,
  } = useCriarUsuario();

  const route = useRoute();
  const { perfil } = route.params as { perfil: number };

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  // Custom hook de validação
  const { errors, validateAll, handleBlur, handleChange } = useFormValidation({
    nome,
    username,
    password,
    confirmPassword,
  });

  const handleSubmit = async () => {
    if (!validateAll() || perfil == null) return;

    const ok = await criarUsuario(perfil);
    if (ok) {
      navigation.goBack();
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        {/* Nome */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => {
            setNome(text);
            handleChange('nome');
          }}
          onBlur={() => handleBlur('nome')}
        />
        {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            handleChange('username');
          }}
          onBlur={() => handleBlur('username')}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        {/* Senha */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              handleChange('password');
            }}
            onBlur={() => handleBlur('password')}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>
        {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}

        {/* Confirmar Senha */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              handleChange('confirmPassword');
            }}
            onBlur={() => handleBlur('confirmPassword')}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>
        {errors.confirmSenha ? <Text style={styles.errorText}>{errors.confirmSenha}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 16 }} />
        ) : (
          <Button title="Salvar" onPress={handleSubmit} color="#007AFF" />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
});
