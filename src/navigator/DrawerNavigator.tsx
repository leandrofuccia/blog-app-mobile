import { useAuth } from '@/context/AuthContext';
import { useUsuarioByCredencial } from '@/hooks/useUsuarioByCredencial';
import LoginScreen from '@/screens/LoginScreen';
import TesteVisualScreen from '@/screens/TesteVisualScreen';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import { Text, View } from 'react-native';


import { theme } from '@/theme/theme';
import AdminStackNavigator from './AdminStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import UsuarioStackNavigator from './UsuarioStackNavigator';



const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { username, credencialId, isLoggedIn, nome } = useAuth();
  const { isProfessor } = useUsuarioByCredencial(credencialId);

  return (
    <Drawer.Navigator
      initialRouteName="Início"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primaria,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      drawerContent={(props: { state: { routes: any; index: any; }; descriptors: { [x: string]: { options: {
        drawerLabel: any; drawerIcon: any; 
}; }; }; navigation: { navigate: (arg0: any) => any; }; }) => {
        const { routes, index } = props.state;

        const isFocused = (routeKey: string) =>
          index === routes.findIndex((r: { key: string; }) => r.key === routeKey);

        const makeDrawerItem = (route: any) => (
          <DrawerItem
            key={route.key}
            label={props.descriptors[route.key].options.drawerLabel ?? route.name}
            icon={props.descriptors[route.key].options.drawerIcon}
            focused={isFocused(route.key)}
            onPress={() => props.navigation.navigate(route.name)}
            labelStyle={{
              fontSize: 15,
              color: isFocused(route.key)
                ? theme.colors.destaque
                : theme.colors.textoSecundario,
            }}
            style={{
              backgroundColor: isFocused(route.key)
                ? theme.colors.itemAtivoFundo
                : 'transparent',
              borderRadius: 8,
              marginHorizontal: 8,
            }}
          />
        );

        const inicioRoutes = routes.filter((r: { name: string; }) => r.name === 'Início');
        const adminRoutes = routes.filter((r: { name: string; }) =>
          ['AdminPostagens', 'AdminProfessores', 'AdminAlunos'].includes(r.name)
        );
        const outrosRoutes = routes.filter(
          (r: { name: string; }) =>
            !['Início', 'AdminPostagens', 'AdminProfessores', 'AdminAlunos'].includes(
              r.name
            )
        );

        return (
          <DrawerContentScrollView
            {...props}
            style={{ backgroundColor: theme.colors.neutroFundo }}
          >
            <View style={{ padding: 16 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: theme.colors.textoPrincipal,
                  fontSize: 16,
                }}
              >
                {nome ? `Olá, ${nome}` : 'Bem-vindo(a)'}
              </Text>
            </View>

            {/* Início */}
            {inicioRoutes.map(makeDrawerItem)}

            {/* Título do menu administrativo */}
            {adminRoutes.length > 0 && (
              <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: theme.colors.textoSecundario,
                    fontSize: 14,
                  }}
                >
                  Menu Administrativo
                </Text>
              </View>
            )}

            {/* Itens administrativos */}
            {adminRoutes.map(makeDrawerItem)}

            {/* Outros itens */}
            {outrosRoutes.map(makeDrawerItem)}
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Início" component={MainStackNavigator} />

      {isLoggedIn && isProfessor && (
        <>
          <Drawer.Screen
            name="AdminPostagens"
            component={AdminStackNavigator}
            options={{
              title: 'Gerenciar Postagens',
              drawerLabel: '📂 Gerenciar Postagens',
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

      <Drawer.Screen
        name="TesteVisual"
        component={TesteVisualScreen}
        options={{
          drawerLabel: 'Teste Visual',
        }}
      />
    </Drawer.Navigator>
  );
}
