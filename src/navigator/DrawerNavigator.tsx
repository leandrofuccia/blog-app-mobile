
import { useAuth } from '@/context/AuthContext';
import { useUsuarioByCredencial } from '@/hooks/useUsuarioByCredencial';
import LoginScreen from '@/screens/LoginScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import AdminStackNavigator from './AdminStackNavigator';
import MainStackNavigator from './MainStackNavigator';



const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
 const { username } = useAuth();
 const { credencialId } = useAuth();
 const { isProfessor } = useUsuarioByCredencial(credencialId);
    
  const { isLoggedIn } = useAuth();
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => (
        <DrawerContentScrollView {...props}>
          <View style={{ padding: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>
              {username ? `Olá, ${username}` : 'Bem-vindo(a)'}
            </Text>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="Início" component={MainStackNavigator} />
      {isLoggedIn && isProfessor &&(
        <Drawer.Screen name="Admin" component={AdminStackNavigator} options={{ title: 'Menu Administrativo' }} />
      )}
      <Drawer.Screen
        name={isLoggedIn ? 'Sair' : 'Login'}
        component={LoginScreen}
        options={{ title: isLoggedIn ? 'Logout' : 'Login' }}
      />
    </Drawer.Navigator>

  );
}