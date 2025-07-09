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


