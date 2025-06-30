
import Layout from 'components/Layout';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LayoutTestScreen() {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Teste de Layout com Footer</Text>
        {[...Array(20)].map((_, index) => (
          <View key={index} style={styles.box}>
            <Text>Item {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  box: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 6,
    marginBottom: 10,
  },
});