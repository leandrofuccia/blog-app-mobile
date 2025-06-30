import EditarPostScreen from '@/screens/EditarPostScreen';
import HomeScreen from '@/screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Postagens' }} />
      <Stack.Screen name="EditarPost" component={EditarPostScreen} options={{ title: 'Editar Postagem' }} />
    </Stack.Navigator>
  );
}