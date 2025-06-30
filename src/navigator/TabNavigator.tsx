import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
//import ExploreScreen from '../screens/ExploreScreen';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';

//import MiniListScreen from '../screens/MiniListScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: { name: string };
      }): BottomTabNavigationOptions => ({
        tabBarIcon: ({
          color,
          size,
        }: {
          color: string;
          size: number;
        }) => {
          const iconName = route.name === 'Home' ? 'home-outline' : 'search-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
    <Tab.Screen name="Home" component={HomeScreen} />
    

    </Tab.Navigator>
  );
}