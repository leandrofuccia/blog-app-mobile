import { theme } from '@/theme/theme';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type FormFields = 'nome' | 'username' | 'password' | 'confirmPassword';

interface UserFormProps {
  nome: string;
  setNome: (nome: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  loading: boolean;
  onSubmit: () => Promise<void>;
  errors: Record<string, string>;
  handleBlur: (field: FormFields) => void;
  handleChange: (field: FormFields) => void;
}

export default function UserForm({
  nome,
  setNome,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  onSubmit,
  errors,
  handleBlur,
  handleChange,
}: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor={theme.colors.textoSecundario}
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          handleChange('nome');
        }}
        onBlur={() => handleBlur('nome')}
      />
      {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.textoSecundario}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          handleChange('username');
        }}
        onBlur={() => handleBlur('username')}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      {/* Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor={theme.colors.textoSecundario}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handleChange('password');
          }}
          onBlur={() => handleBlur('password')}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color={theme.colors.primaria}
          />
        </TouchableOpacity>
      </View>
      {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}

      {/* Confirmar Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar Senha"
          placeholderTextColor={theme.colors.textoSecundario}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            handleChange('confirmPassword');
          }}
          onBlur={() => handleBlur('confirmPassword')}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={22}
            color={theme.colors.primaria}
          />
        </TouchableOpacity>
      </View>
      {errors.confirmSenha ? <Text style={styles.errorText}>{errors.confirmSenha}</Text> : null}

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primaria}
          style={{ marginTop: 16 }}
        />
      ) : (
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.neutroBorda,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: theme.colors.neutroInput,
    color: theme.colors.textoPrincipal,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.neutroBorda,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.neutroInput,
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: theme.colors.textoPrincipal,
  },
  button: {
    backgroundColor: theme.colors.destaque,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    ...theme.fonts.button,
    color: '#fff',
  },
  errorText: {
    ...theme.fonts.label,
    color: theme.colors.vermelho,
    marginBottom: 4,
  },
});
