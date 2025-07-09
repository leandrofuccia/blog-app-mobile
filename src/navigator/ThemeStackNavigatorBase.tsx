import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

type Screen = React.ComponentType<any>;

interface StackNavigatorProps {
  screens: { name: string; component: Screen }[];
  initialRouteName: string;
}

const Stack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#6200ee',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  animation: 'slide_from_right',
};

export function ThemeStackNavigatorBase({ screens, initialRouteName }: StackNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={defaultScreenOptions}
    >
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}
