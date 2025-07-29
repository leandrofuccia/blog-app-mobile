import AdminScreen from '@/screens/AdminScreen';
import CriarPostScreen from '@/screens/CriarPostScreen';
import EditarPostScreen from '@/screens/EditarPostScreen';
import { theme } from '@/theme/theme';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.primaria,  
        headerTitleStyle: theme.fonts.headerTitle,
      }}
    >
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{ title: 'Gerenciar Postagens' }}
      />
      <Stack.Screen
        name="CriarPost"
        component={CriarPostScreen}
        options={{ title: 'Nova Postagem' }}
      />
      <Stack.Screen
        name="EditarPost"
        component={EditarPostScreen}
        options={{ title: 'Editar Postagem' }}
      />
    </Stack.Navigator>
  );
}
