import { useAuth } from '@/context/AuthContext';
import { showToast } from '@/utils/showToast';
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
      if (!email.trim() || !password.trim()) {
        showToast({
            type: 'alert',
            text1: 'Campos obrigatórios',
            text2: 'E-mail e senha são obrigatórios.',
            duration: 7000,
        });
        return false;
      }  

      const success = await login(email, password);
      return success;
    } catch (err: any) {
      if (err.status === 401 || err.status === 404) {
        //setError(err.message); // Mensagem da API
        showToast({
          type: 'error',
          text1: err.message,
        });
      } else {
        //setError('Erro inesperado. Tente novamente.');
        showToast({
          type: 'error',
          text1: 'Erro inesperado',
          text2: 'Tente novamente mais tarde.',
        });
      }
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
