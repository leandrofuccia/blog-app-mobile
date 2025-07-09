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

/*import { useCriarUsuario } from '@/hooks/useCriarUsuario';
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

*/


/*import { useCriarUsuario } from '@/hooks/useCriarUsuario';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from 'components/Layout';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
        <Text style={styles.header}>Criar Usuário</Text>

       
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={(text) => {
            setNome(text);
            handleChange('nome');
          }}
          onBlur={() => handleBlur('nome')}
        />
        {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}

        
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
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

      
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="#999"
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
              color={stylesColors.destaque}
            />
          </TouchableOpacity>
        </View>
        {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}

        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirmar Senha"
            placeholderTextColor="#999"
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
              color={stylesColors.destaque}
            />
          </TouchableOpacity>
        </View>
        {errors.confirmSenha ? <Text style={styles.errorText}>{errors.confirmSenha}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color={stylesColors.primaria} style={{ marginTop: 16 }} />
        ) : (
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Salvar</Text>
          </Pressable>
        )}
      </View>
    </Layout>
  );
}

const stylesColors = {
  primaria: '#1e40af', // Azul vibrante
  secundaria: '#f59e0b', // Laranja contraste
  neutroFundo: '#f9fafb', // Cinza bem claro
  neutroBorda: '#d1d5db', // Cinza médio
  destaque: '#10b981', // Verde ação
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: stylesColors.neutroFundo,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: stylesColors.primaria,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: stylesColors.neutroBorda,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    color: '#111',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: stylesColors.neutroBorda,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#111',
  },
  button: {
    backgroundColor: stylesColors.primaria,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    marginBottom: 4,
  } ,
});

*/

import { useCriarUsuario } from '@/hooks/useCriarUsuario';
import { useFormValidation } from '@/hooks/useFormValidation';
import { sharedStyles } from '@/theme/sharedStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import UserForm from 'components/forms/UserForm';

import Layout from 'components/Layout';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

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

  const [confirmPassword, setConfirmPassword] = useState('');

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
      <View style={sharedStyles.container}>
        <Text style={sharedStyles.header}>Criar Usuário</Text>
        <UserForm
          nome={nome}
          setNome={setNome}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          loading={loading}
          onSubmit={handleSubmit}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </View>
    </Layout>
  );
}


