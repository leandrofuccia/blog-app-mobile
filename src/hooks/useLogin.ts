import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export function useLogin() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('E-mail ou senha inválidos');
      }
      return success;
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    handleLogin,
  };
}