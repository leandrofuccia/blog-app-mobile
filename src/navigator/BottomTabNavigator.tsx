/*import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: { height: 60 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          
        }}
        
      />
      
    </Tab.Navigator>
  );
}
  */


import { theme } from '@/theme/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';

const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.destaque,
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          height: 60,
          backgroundColor: theme.colors.neutroFundo,
          borderTopColor: theme.colors.neutroBorda,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon:  ({ color, size }: { color: string; size: number })  => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

