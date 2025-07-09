/*import AdminScreen from '@/screens/AdminScreen';
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

*/

import AdminScreen from '@/screens/AdminScreen';
import { theme } from '@/theme/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UsuarioScreen from './UsuarioScreen';

const SubDrawer = createDrawerNavigator();

export default function AdminGroupScreen() {
  return (
    <SubDrawer.Navigator
      screenOptions={{
        drawerType: 'front',
        headerStyle: {
          backgroundColor: theme.colors.neutroFundo, // fundo claro
        },
        headerTintColor: theme.colors.primaria,      // texto verde
        headerTitleStyle: theme.fonts.headerTitle,   // fonte padronizada
        drawerActiveTintColor: theme.colors.primaria,
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}
    >
      <SubDrawer.Screen
        name="GerenciarPostagens"
        component={AdminScreen}
        options={{
          title: 'Gerenciar Postagens',
          drawerLabel: '📝 Gerenciar Postagens',
        }}
      />
      <SubDrawer.Screen
        name="GerenciarUsuarios"
        component={UsuarioScreen}
        options={{
          title: 'Gerenciar Usuários',
          drawerLabel: '👥 Gerenciar Usuários',
        }}
      />
    </SubDrawer.Navigator>
  );
}
