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
  
  