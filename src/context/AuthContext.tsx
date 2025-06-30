import { useUsuarioByCredencial } from '@/hooks/useUsuarioByCredencial';
import api from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as base64Decode } from 'base-64';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type DecodedToken = {
  username: string;
  credencialId: number;
  exp: number;
};


type AuthContextType = {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
  credencialId: number | null;
  usuarioId: number | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeToken(token: string): DecodedToken {
  const payload = token.split('.')[1];
  if (!payload) throw new Error('Token inválido.');

  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    base64Decode(base64)
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [credencialId, setCredencialId] = useState<number | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  const isLoggedIn = !!token;

  const { usuario } = useUsuarioByCredencial(credencialId); // ✅ hook no escopo do componente

  useEffect(() => {
    if (usuario?.id) {
      setUsuarioId(usuario.id);
    }
  }, [usuario]);

  useEffect(() => {
    AsyncStorage.getItem('token').then((savedToken) => {
      if (savedToken) {
        setToken(savedToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        try {
          const decoded = decodeToken(savedToken);
          setUsername(decoded.username);
          setCredencialId(decoded.credencialId);
        } catch (err) {
          console.error('Erro ao decodificar token salvo:', err);
        }
      }
    });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/credencial/signin', {
        username: email,
        password,
      });

      const receivedToken = response.data.token;

      await AsyncStorage.setItem('token', receivedToken);
      setToken(receivedToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;

      const decoded = decodeToken(receivedToken);
      setUsername(decoded.username);
      setCredencialId(decoded.credencialId);

      return true;
    } catch (err) {
      console.error('Erro no login:', err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setCredencialId(null);
    AsyncStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, username, credencialId, usuarioId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve estar dentro de AuthProvider');
  return ctx;
}