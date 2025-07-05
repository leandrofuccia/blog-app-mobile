import AdminScreen from '@/screens/AdminScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UsuarioScreen from './UsuarioScreen';

const SubDrawer = createDrawerNavigator();

export default function AdminGroupScreen() {
  return (
    <SubDrawer.Navigator
      screenOptions={{ drawerType: 'front' }} // para evitar drawer sobre drawer
    >
      <SubDrawer.Screen
        name="GerenciarPostagens"
        component={AdminScreen}
        options={{ title: 'Gerenciar Postagens' }}
      />
      <SubDrawer.Screen
        name="GerenciarUsuarios"
        component={UsuarioScreen}
        options={{ title: 'Gerenciar Usuários' }}
      />
    </SubDrawer.Navigator>
  );
}