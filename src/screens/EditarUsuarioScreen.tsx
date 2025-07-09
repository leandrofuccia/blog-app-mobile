/*import { useEditarUsuario } from '@/hooks/useEditarUsuario';
import { useFormValidation } from '@/hooks/useFormValidation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  EditarUsuario: { credencialId: number; usuarioId: number; onGoBack?: () => void };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditarUsuario'>;

export default function EditarUsuarioScreen({ route, navigation }: Props) {
  const { usuarioId } = route.params;
  const { credencialId } = route.params;;
  const { perfil } = route.params as { perfil: number };
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log(' tela ', usuarioId)
  console.log(' tela credencialId', credencialId)

  const {
    nome,
    username,
    password,
    perfilid,
    setNome,
    setUserName,
    setPassword,
    setPerfilid,
    loading,
    carregarUsuario,
    atualizarUsuario,
  } = useEditarUsuario(credencialId!, usuarioId);

  useEffect(() => {
    carregarUsuario();
  }, [usuarioId]);

   // Custom hook de validação
    const { errors, validateAll, handleBlur, handleChange } = useFormValidation({
      nome,
      username,
      password,
     confirmPassword,
    });
  
  const handleSubmit = async () => {
    const ok = await atualizarUsuario();
    if (ok) {
    route.params.onGoBack?.(); 
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
            setUserName(text);
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

import { useEditarUsuario } from '@/hooks/useEditarUsuario';
import { useFormValidation } from '@/hooks/useFormValidation';
import { sharedStyles } from '@/theme/sharedStyles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import UserForm from 'components/forms/UserForm';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

type RootStackParamList = {
  EditarUsuario: { credencialId: number; usuarioId: number; onGoBack?: () => void };
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditarUsuario'>;

export default function EditarUsuarioScreen({ route, navigation }: Props) {
  const { usuarioId } = route.params;
  const { credencialId } = route.params;;
  const { perfil } = route.params as { perfil: number };
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  console.log(' tela ', usuarioId)
  console.log(' tela credencialId', credencialId)

  const {
    nome,
    username,
    password,
    perfilid,
    setNome,
    setUserName,
    setPassword,
    setPerfilid,
    loading,
    carregarUsuario,
    atualizarUsuario,
  } = useEditarUsuario(credencialId!, usuarioId);

  useEffect(() => {
    carregarUsuario();
  }, [usuarioId]);

   // Custom hook de validação
    const { errors, validateAll, handleBlur, handleChange } = useFormValidation({
      nome,
      username,
      password,
     confirmPassword,
    });
  
  const handleSubmit = async () => {
    const ok = await atualizarUsuario();
    if (ok) {
    route.params.onGoBack?.(); 
    navigation.goBack();
  }

  };

  return (
      <Layout>
        <View style={sharedStyles.container}>
          <Text style={sharedStyles.header}>Editar Usuário</Text>
          <UserForm
            nome={nome}
            setNome={setNome}
            username={username}
            setUsername={setUserName}
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
  
  