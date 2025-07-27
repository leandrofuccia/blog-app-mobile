import { useState } from 'react';

interface Fields {
  nome: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export function useFormValidation(fields: Fields) {
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({
    nome: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const validateNome = () => {
    if (!fields.nome.trim()) return 'O nome é obrigatório.';
    if (fields.nome.length > 40) return 'O nome não pode ter mais que 40 caracteres.';
    return '';
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.username.trim()) return 'O e-mail é obrigatório.';
    if (!emailRegex.test(fields.username)) return 'E-mail inválido.';
    return '';
  };

  const validateSenha = () => {
    if (!fields.password) return 'A senha é obrigatória.';
    if (fields.password.length < 4 || fields.password.length > 20)
      return 'A senha deve ter entre 4 e 20 caracteres.';
    return '';
  };

  const validateConfirmSenha = () => {
    if (!fields.confirmPassword) return 'Confirme a senha.';
    if (fields.password !== fields.confirmPassword) return 'As senhas não coincidem.';
    return '';
  };

  const validateAll = () => {
    const nomeErr = validateNome();
    const emailErr = validateEmail();
    const senhaErr = validateSenha();
    const confirmErr = validateConfirmSenha();

    setErrors({
      nome: nomeErr,
      username: emailErr,
      password: senhaErr,
      confirmPassword: confirmErr,
    });

    return !(nomeErr || emailErr || senhaErr || confirmErr);
  };

  const handleBlur = (field: keyof Fields) => {
    let error = '';
    if (field === 'nome') error = validateNome();
    if (field === 'username') error = validateEmail();
    if (field === 'password') error = validateSenha();
    if (field === 'confirmPassword') error = validateConfirmSenha();

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof Fields) => {
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  return {
    errors,
    validateAll,
    handleBlur,
    handleChange,
  };
}
