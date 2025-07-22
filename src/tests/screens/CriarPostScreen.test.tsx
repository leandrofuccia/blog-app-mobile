// src/tests/screens/CriarPostScreen.test.tsx
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import CriarPostScreen from '@/screens/CriarPostScreen';


// Mocks controláveis (funções espiãs)
const mockGoBack = jest.fn();
const mockCriarPostagem = jest.fn().mockResolvedValue(true);
const mockSetTitulo = jest.fn();
const mockSetConteudo = jest.fn();

// Mocks padrão para hooks e módulos
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    credencialId: 1,
    usuarioId: 123,
  }),
}));

jest.mock('@/hooks/useCriarPostagem', () => ({
  useCriarPostagem: () => ({
    titulo: '',
    conteudo: '',
    setTitulo: mockSetTitulo,
    setConteudo: mockSetConteudo,
    loading: false,
    criarPostagem: mockCriarPostagem,
  }),
}));

jest.mock('@/theme/sharedStyles', () => ({
  sharedStyles: {
    container: {},
    header: {},
    input: {},
    textarea: {},
    button: {},
    buttonText: {},
  },
}));

jest.mock('@/theme/theme', () => ({
  theme: {
    colors: {
      textoSecundario: '#aaa',
      primaria: '#000',
    },
  },
}));


describe('CriarPostScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar os inputs e botão', () => {
    const { getByPlaceholderText, getByText } = render(<CriarPostScreen />);

    expect(getByPlaceholderText('Título')).toBeTruthy();
    expect(getByPlaceholderText('Conteúdo')).toBeTruthy();
    expect(getByText('Publicar')).toBeTruthy();
  });

  it('chama criarPostagem e goBack se sucesso', async () => {
    const { getByText } = render(<CriarPostScreen />);
    fireEvent.press(getByText('Publicar'));

    await waitFor(() => {
      expect(mockCriarPostagem).toHaveBeenCalledWith(123);
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  
});
