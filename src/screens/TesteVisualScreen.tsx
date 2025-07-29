import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TesteCriarUsuarioScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [focusField, setFocusField] = useState<string | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Criar Conta</Text>

      <TextInput
        style={[
          styles.input,
          focusField === 'nome' && styles.inputFocused,
        ]}
        placeholder="Nome"
        placeholderTextColor={styles.placeholderColor.color}
        value={nome}
        onChangeText={setNome}
        onFocus={() => setFocusField('nome')}
        onBlur={() => setFocusField(null)}
      />

      <TextInput
        style={[
          styles.input,
          focusField === 'email' && styles.inputFocused,
        ]}
        placeholder="Email"
        placeholderTextColor={styles.placeholderColor.color}
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusField('email')}
        onBlur={() => setFocusField(null)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View
        style={[
          styles.passwordContainer,
          focusField === 'senha' && styles.inputFocused,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor={styles.placeholderColor.color}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          onFocus={() => setFocusField('senha')}
          onBlur={() => setFocusField(null)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color={styles.iconColor.color}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.passwordContainer,
          focusField === 'confirm' && styles.inputFocused,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar Senha"
          placeholderTextColor={styles.placeholderColor.color}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          onFocus={() => setFocusField('confirm')}
          onBlur={() => setFocusField(null)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color={styles.iconColor.color}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={styles.button.backgroundColor} />
      ) : (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#047857',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    color: '#1F2937',
  },
  inputFocused: {
    borderColor: '#10B981',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#047857',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#0E7490',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderColor: {
    color: '#4B5563',
  },
  iconColor: {
    color: '#0E7490',
  },
});
