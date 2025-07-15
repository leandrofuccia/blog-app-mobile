import ComentariosScreen from '@/screens/ComentariosScreen';
import HomeScreen from '@/screens/HomeScreen';
import NovoComentarioScreen from '@/screens/NovoComentarioScreen';
import PostDetailScreen from '@/screens/PostDetailScreen';
import { theme } from '@/theme/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.primaria,   // Cor do texto
            headerTitleStyle: theme.fonts.headerTitle,
          }}
        >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Postagens' }} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{ title: 'Detalhes' }} />
      <Stack.Screen name="Comentarios" component={ComentariosScreen} options={{ title: 'Comentários' }} />
      <Stack.Screen name="NovoComentario"  component={NovoComentarioScreen} options={{ title: 'Adicionar Comentário' }}/>       
    </Stack.Navigator>
  );
}

