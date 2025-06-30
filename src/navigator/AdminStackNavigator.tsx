import AdminScreen from '@/screens/AdminScreen';
import CriarPostScreen from '@/screens/CriarPostScreen';
import EditarPostScreen from '@/screens/EditarPostScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AdminStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ title: 'Administração' }} />
      <Stack.Screen name="EditarPost" component={EditarPostScreen} options={{ title: 'Editar Postagem' }} />
      <Stack.Screen name="CriarPost"  component={CriarPostScreen}   options={{ title: 'Nova Postagem' }} />
    </Stack.Navigator>
  );
}
