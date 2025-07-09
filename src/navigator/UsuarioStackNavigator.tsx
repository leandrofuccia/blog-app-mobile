
import CriarUsuarioScreen from '@/screens/CriarUsuarioScreen';
import EditarUsuarioScreen from '@/screens/EditarUsuarioScreen';
import UsuarioScreen from '@/screens/UsuarioScreen';
import { theme } from '@/theme/theme';
import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function UsuarioStackNavigator() {
  const route = useRoute();  
  const { perfil } = route.params as { perfil: number };  
  const tipoUsuario = perfil === 2 ? 'Professor(a)' : 'Aluno(a)';
  return (
    <Stack.Navigator
        screenOptions={{
        headerTintColor: theme.colors.primaria,   // Cor do texto
        headerTitleStyle: theme.fonts.headerTitle,
        }}
       >
      <Stack.Screen
        name="UsuarioScreen"
        component={UsuarioScreen}
        initialParams={{ perfil: perfil }}
        options={{ title: 'Gerenciar ' + tipoUsuario }}
      />
      <Stack.Screen
        name="CriarUsuario"
        component={CriarUsuarioScreen}
        initialParams={{ perfil: perfil }}
        options={{ title: 'Novo(a) ' + tipoUsuario }}
      />
      <Stack.Screen
        name="EditarUsuario"
        component={EditarUsuarioScreen}
        initialParams={{ perfil: perfil }}
        options={{ title: 'Editar ' + tipoUsuario }}
      />
    </Stack.Navigator>
  );
}



