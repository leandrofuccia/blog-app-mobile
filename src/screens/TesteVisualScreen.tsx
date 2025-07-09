/*import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TesteVisualScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🌟 Tela de Teste Visual</Text>

     
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#9CA3AF"
          value={nome}
          onChangeText={setNome}
        />
      </View>

  
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

     
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite a senha"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color={colors.destaque}
            />
          </TouchableOpacity>
        </View>
      </View>

     
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirmar Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirme a senha"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={confirmSenha}
            onChangeText={setConfirmSenha}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color={colors.destaque}
            />
          </TouchableOpacity>
        </View>
      </View>

    
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
//esquema 1
/*const colors = {
  primaria: '#3B82F6',     // Azul Royal
  secundaria: '#60A5FA',   // Azul Claro
  destaque: '#F97316',     // Laranja Coral
  neutroFundo: '#F9FAFB',
  neutroInput: '#FFFFFF',
  neutroBorda: '#E5E7EB',
  textoPrincipal: '#111827',
  textoSecundario: '#374151',
};*/

//esquema 2
/*const colors = {
  primaria: '#8B5CF6',     // Azul Royal
  secundaria: '#A78BFA',   // Azul Claro
  destaque: '#84CC16',     // Laranja Coral
  neutroFundo: '#F3F4F6',
  neutroInput: '#FFFFFF',
  neutroBorda: '#E5E7EB',
  textoPrincipal: '#1F2937',
  textoSecundario: '#374151',
};*/

//esquema 3
/*const colors = {
  primaria: '#374151',     // Azul Royal
  secundaria: '#6B7280',   // Azul Claro
  destaque: '#14B8A6',     // Laranja Coral
  neutroFundo: '#FFFFFF',
  neutroInput: '#F9FAFB',
  neutroBorda: '#E5E7EB',
  textoPrincipal: '#111827',
  textoSecundario: '#374151',
};

*/
//Esquema 4 – Verde Esmeralda + Azul Petróleo
/*const colors = {
  primaria: '#10B981',     
  secundaria: '#34D399',   
  destaque: '#0E7490',     
  neutroFundo: '#F0FDF4',
  neutroInput: '#FFFFFF',
  neutroBorda: '#E5E7EB',
  textoPrincipal: '#111827',
  textoSecundario: '#1F2937',
};*/

//Esquema 5 – Laranja Solar + Grafite
/*const colors = {
  primaria: '#F97316',     
  secundaria: '#FDBA74',   
  destaque: '#374151',     
  neutroFundo: '#FFF7ED',
  neutroInput: '#FFFFFF',
  neutroBorda: '#E5E7EB',
  textoPrincipal: '#111827',
  textoSecundario: '#1F2937',
};*/


//Esquema 6 – Azul Denim + Rosa Pastel
/*const colors = {
  primaria: '#2563EB',     
  secundaria: '#60A5FA',   
  destaque: '#F472B6',     
  neutroFundo: '#F9FAFB',
  neutroInput: '#FFFFFF',
  neutroBorda: '#E5E7EB',
  textoPrincipal: '#1E293B',
  textoSecundario: '#1F2937',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutroFundo,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primaria,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: colors.textoSecundario,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.neutroInput,
    borderWidth: 2,
    borderColor: colors.primaria,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textoPrincipal,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutroInput,
    borderWidth: 2,
    borderColor: colors.secundaria,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textoPrincipal,
  },
  button: {
    backgroundColor: colors.destaque,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
*/


/*import React, { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TesteCriarUsuarioScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor={styles.placeholderColor.color}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={styles.placeholderColor.color}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor={styles.placeholderColor.color}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color={styles.iconColor.color}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar Senha"
          placeholderTextColor={styles.placeholderColor.color}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
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
    backgroundColor: '#F0FDF4', // Neutro Fundo
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#10B981', // Primária
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
  borderWidth: 1.5,
  borderColor: '#047857', // Verde escuro
  padding: 12,
  borderRadius: 6,
  fontSize: 16,
  marginBottom: 8,
  backgroundColor: '#FFFFFF', // Fundo branco para contraste
},
  passwordContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1.5,
  borderColor: '#047857', // Mesma borda
  borderRadius: 6,
  paddingHorizontal: 10,
  marginBottom: 8,
  backgroundColor: '#FFFFFF',
},
  passwordInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1F2937',
  },
  button: {
  backgroundColor: '#0E7490', // Botão azul petróleo
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
    color: '#4B5563', // Texto Secundário
  },
  iconColor: {
    color: '#0E7490', // Destaque
  },
});

*/

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

      {/* Nome */}
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

      {/* Email */}
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

      {/* Senha */}
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

      {/* Confirmar Senha */}
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

      {/* Botão */}
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
