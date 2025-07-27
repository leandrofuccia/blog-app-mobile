import { useEditarUsuario } from '@/hooks/useEditarUsuario';
import { useFormValidation } from '@/hooks/useFormValidation';
import { sharedStyles } from '@/theme/sharedStyles';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import FormContainer from 'components/FormContainer';
import UserForm from 'components/forms/UserForm';
import Layout from 'components/Layout';
import KeyboardAwareScrollViewWrapper from 'components/shared/KeyboardAwareScrollContainer';

import { useEffect, useState } from 'react';
import { Text } from 'react-native';

type RootStackParamList = {
  EditarUsuario: { credencialId: number; usuarioId: number; onGoBack?: () => void; perfil: number };
};


type Props = NativeStackScreenProps<RootStackParamList, 'EditarUsuario'>;

export default function EditarUsuarioScreen({ route, navigation }: Props) {
  const { usuarioId, credencialId, perfil } = route.params;
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

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

  // Hook de validação
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
      <KeyboardAwareScrollViewWrapper>
        <FormContainer>
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
        </FormContainer>
      </KeyboardAwareScrollViewWrapper>
    </Layout>
  );
}
