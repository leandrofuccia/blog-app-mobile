import LayoutTestScreen from '@/screens/LayoutTestScreen';
import PostDetailScreen from '@/screens/PostDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="LayoutTest" component={LayoutTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}