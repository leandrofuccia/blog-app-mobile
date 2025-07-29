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
          backgroundColor: theme.colors.neutroFundo,
        },
        headerTintColor: theme.colors.primaria,      
        headerTitleStyle: theme.fonts.headerTitle,
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
