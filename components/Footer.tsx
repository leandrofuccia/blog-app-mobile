import { StyleSheet, View } from 'react-native';

export default function Footer() {
  return <View style={styles.footer} />;
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});