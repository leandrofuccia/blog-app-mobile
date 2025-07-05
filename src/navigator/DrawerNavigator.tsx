/*import { useAuth } from '@/context/AuthContext';
import { useUsuarioByCredencial } from '@/hooks/useUsuarioByCredencial';
import AdminScreen from '@/screens/AdminScreen';
import LoginScreen from '@/screens/LoginScreen';
import ProfessoresScreen from '@/screens/ProfessoresScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import MainStackNavigator from './MainStackNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { username, credencialId, isLoggedIn } = useAuth();
  const { isProfessor } = useUsuarioByCredencial(credencialId);

  return (
    <Drawer.Navigator
      initialRouteName="Início"
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
      }}
      drawerContent={(props: any) => {
        return (
          <DrawerContentScrollView {...props}>
            <View style={{ padding: 16 }}>
              <Text style={{ fontWeight: 'bold' }}>
                {username ? `Olá, ${username}` : 'Bem-vindo(a)'}
              </Text>
            </View>

            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Início"
        component={MainStackNavigator}
      />

      {isLoggedIn && isProfessor && (
        <>
          <Drawer.Screen
            name="AdminPostagens"
            component={AdminScreen}
            options={{
              drawerLabel: '🗂️ Gerenciar Postagens',
              drawerGroup: 'Menu Administrativo',
            }}
          />
          <Drawer.Screen
            name="AdminUsuarios"
            component={ProfessoresScreen}
            options={{
              drawerLabel: '👥 Gerenciar Usuários',
              drawerGroup: 'Menu Administrativo',
            }}
          />
        </>
      )}

      <Drawer.Screen
        name={isLoggedIn ? 'Sair' : 'Login'}
        component={LoginScreen}
        options={{
          drawerLabel: isLoggedIn ? 'Logout' : 'Login',
        }}
      />
    </Drawer.Navigator>
  );
}

*/


import { useAuth } from '@/context/AuthContext';
import { useUsuarioByCredencial } from '@/hooks/useUsuarioByCredencial';
import LoginScreen from '@/screens/LoginScreen';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import AdminStackNavigator from './AdminStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import UsuarioStackNavigator from './UsuarioStackNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { username, credencialId, isLoggedIn } = useAuth();
  const { isProfessor } = useUsuarioByCredencial(credencialId);

  return (
    <Drawer.Navigator
      initialRouteName="Início"
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
      }}
      drawerContent={(props: { state: { routes: any[]; index: any; }; descriptors: { [x: string]: { options: {
        drawerLabel: any; drawerIcon: any; 
      }; }; }; navigation: { navigate: (arg0: any) => any; }; }) => {
        // Separar os itens
        const inicioRoutes = props.state.routes.filter(
          (route: { name: string; }) => route.name === 'Início'
        );

        const adminRoutes = props.state.routes.filter(
          (route: { name: string; }) =>
            route.name === 'AdminPostagens' || route.name === 'AdminProfessores' || route.name === 'AdminAlunos'
        );

        const outrosRoutes = props.state.routes.filter(
          (route: { name: string; }) =>
            route.name !== 'Início' &&
            route.name !== 'AdminPostagens' &&
            route.name !== 'AdminProfessores' &&
            route.name !== 'AdminAlunos'
        );

        return (
          <DrawerContentScrollView {...props}>
            <View style={{ padding: 16 }}>
              <Text style={{ fontWeight: 'bold' }}>
                {username ? `Olá, ${username}` : 'Bem-vindo(a)'}
              </Text>
            </View>

            {/* Início */}
            {inicioRoutes.map((route: { key: string | number; name: any; }, index: any) => (
              <DrawerItem
                key={route.key}
                label={props.descriptors[route.key].options.drawerLabel ?? route.name}
                icon={props.descriptors[route.key].options.drawerIcon}
                focused={
                  props.state.index ===
                  props.state.routes.findIndex((r: { key: any; }) => r.key === route.key)
                }
                onPress={() => props.navigation.navigate(route.name)}
              />
            ))}

            {/* Só renderiza o título se houver itens administrativos */}
            {adminRoutes.length > 0 && (
              <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                <Text style={{ fontWeight: 'bold', color: '#999' }}>
                  Menu Administrativo
                </Text>
              </View>
            )}

            {/* Itens Administrativos */}
            {adminRoutes.map((route: { key: string | number; name: any; }) => (
              <DrawerItem
                key={route.key}
                label={props.descriptors[route.key].options.drawerLabel ?? route.name}
                icon={props.descriptors[route.key].options.drawerIcon}
                focused={
                  props.state.index ===
                  props.state.routes.findIndex((r: { key: any; }) => r.key === route.key)
                }
                onPress={() => props.navigation.navigate(route.name)}
              />
            ))}

            {/* Outros itens (por exemplo, Logout) */}
            {outrosRoutes.map((route: { key: string | number; name: any; }) => (
              <DrawerItem
                key={route.key}
                label={props.descriptors[route.key].options.drawerLabel ?? route.name}
                icon={props.descriptors[route.key].options.drawerIcon}
                focused={
                  props.state.index ===
                  props.state.routes.findIndex((r) => r.key === route.key)
                }
                onPress={() => props.navigation.navigate(route.name)}
              />
            ))}
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Início"
        component={MainStackNavigator}
      />

      {isLoggedIn && isProfessor && (
        <>
          <Drawer.Screen
            name="AdminPostagens"
            component={AdminStackNavigator}            
            options={{
              title: 'Gerenciar Postagens',
              drawerLabel: '🗂️ Gerenciar Postagens',

            }}
          />
          <Drawer.Screen
            name="AdminProfessores"
            component={UsuarioStackNavigator}
            initialParams={{ perfil: 2 }}
            options={{
              title: 'Gerenciar Professores',
              drawerLabel: '👥 Gerenciar Professores',
            }}
          />
          <Drawer.Screen
            name="AdminAlunos"
            component={UsuarioStackNavigator}
            initialParams={{ perfil: 1 }}
            options={{
              title: 'Gerenciar Alunos',
              drawerLabel: '👥 Gerenciar Alunos',
            }}
          />
        </>
      )}

      <Drawer.Screen
        name={isLoggedIn ? 'Sair' : 'Login'}
        component={LoginScreen}
        options={{
          drawerLabel: isLoggedIn ? 'Logout' : 'Login',
        }}
      />
    </Drawer.Navigator>
  );
}
