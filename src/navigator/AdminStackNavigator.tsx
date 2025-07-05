/*import AdminScreen from '@/screens/AdminScreen';
import CriarPostScreen from '@/screens/CriarPostScreen';
import EditarPostScreen from '@/screens/EditarPostScreen';
import ProfessoresScreen from '@/screens/ProfessoresScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ title: 'Administração' }} />
      <Stack.Screen name="EditarPost" component={EditarPostScreen} options={{ title: 'Editar Postagem' }} />
      <Stack.Screen name="CriarPost"  component={CriarPostScreen}   options={{ title: 'Nova Postagem' }} />
      <Stack.Screen
  name="Professores"
  component={ProfessoresScreen}
  options={{ title: 'Listar Professores' }}
/>

    </Stack.Navigator>
  );
}
*/

/*import AdminMenuScreen from '@/screens/AdminMenuScreen';
import AdminScreen from '@/screens/AdminScreen';
import CriarPostScreen from '@/screens/CriarPostScreen';
import EditarPostScreen from '@/screens/EditarPostScreen';
import ProfessoresScreen from '@/screens/ProfessoresScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminMenu"
        component={AdminMenuScreen}
        options={{ title: 'Menu Administrativo' }}
      />
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{ title: 'Gerenciar Postagens' }}
      />
      <Stack.Screen
        name="EditarPost"
        component={EditarPostScreen}
        options={{ title: 'Editar Postagem' }}
      />
      <Stack.Screen
        name="CriarPost"
        component={CriarPostScreen}
        options={{ title: 'Nova Postagem' }}
      />
      <Stack.Screen
        name="Professores"
        component={ProfessoresScreen}
        options={{ title: 'Gerenciar Usuários' }}
      />
    </Stack.Navigator>
  );
}*/


import AdminScreen from '@/screens/AdminScreen';
import CriarPostScreen from '@/screens/CriarPostScreen';
import EditarPostScreen from '@/screens/EditarPostScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator>
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