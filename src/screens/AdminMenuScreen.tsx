import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Layout from 'components/Layout';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminMenuScreen() {
  const navigation = useNavigation();

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Menu Administrativo</Text>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('AdminScreen')}>
          <MaterialIcons name="article" size={24} color="#007AFF" />
          <Text style={styles.itemText}>Gerenciar Postagens</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Professores')}>
          <MaterialIcons name="group" size={24} color="#007AFF" />
          <Text style={styles.itemText}>Gerenciar Usuários</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});