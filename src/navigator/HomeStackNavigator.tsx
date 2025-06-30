import HomeScreen from '@/screens/HomeScreen';
import PostDetailScreen from '@/screens/PostDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Postagens' }} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Detalhes' }} />      
    </Stack.Navigator>
  );
}