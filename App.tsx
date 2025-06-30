/*import AppNavigator from "@/navigator/AppNavigator";

export default function App() {
  return <AppNavigator />;
}*/

// App.tsx
import { AuthProvider } from '@/context/AuthContext';
import DrawerNavigator from '@/navigator/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
     <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}