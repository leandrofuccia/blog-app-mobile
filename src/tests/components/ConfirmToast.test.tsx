// src/tests/components/ConfirmToast.test.tsx



import ConfirmToast, { ConfirmToastProps } from 'components/ConfirmToast';
import { Text, TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer'; // <-- IMPORTANTE: Importe 'act' aqui


// --- Mocks Necessários ---

// Mock para 'react-native' para garantir que os componentes nativos funcionem
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return Object.setPrototypeOf(
    {
      View: RN.View,
      Text: RN.Text,
      TouchableOpacity: RN.TouchableOpacity,
      StyleSheet: RN.StyleSheet, // Adicione StyleSheet se houver problemas com ele
    },
    RN
  );
});

// Mock para 'react-native-vector-icons/Ionicons'
jest.mock('react-native-vector-icons/Ionicons', () => {
  const React = require('react');
  const MockIcon = (props: any) => React.createElement('Icon', props);
  return MockIcon;
});

// Mock para o seu objeto de tema
jest.mock('@/theme/theme', () => ({
  theme: {
    colors: {
      amarelo: '#FFD700',
      neutroInput: '#F0F0F0',
      textoPrincipal: '#333333',
      textoSecundario: '#666666',
      vermelho: '#FF0000',
      // Certifique-se de que todas as cores usadas no componente estão aqui
      primaria: '#10B981',
      secundaria: '#34D399',
      destaque: '#0E7490',
      neutroFundo: '#F0FDF4',
      neutroBorda: '#E5E7EB',
      itemAtivoFundo: '#D1FAE5',
      sucesso: '#28a745',
      info: '#17a2b8',
    },
    fonts: {
      headerTitle: {
        fontWeight: '600',
        fontSize: 18,
      },
      label: {
        fontWeight: '500',
        fontSize: 14,
      },
      body: {
        fontWeight: '400',
        fontSize: 16,
      },
      button: {
        fontWeight: '600',
        fontSize: 16,
      },
      regular: {
        fontWeight: '400',
        fontSize: 15,
      },
      toastTitle: {
        fontSize: 16,
        fontWeight: '600',
      },
      toastText: {
        fontSize: 14,
        fontWeight: '400',
      },
    },
  },
}));


// --- Testes para o componente ConfirmToast ---

describe('ConfirmToast', () => {
  const defaultProps: ConfirmToastProps = {
    text1: 'Você tem certeza?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste 1: Renderização básica com apenas text1
  it('Deve renderizar corretamente com apenas text1', () => {
    let tree: renderer.ReactTestRenderer; // Declare a variável fora do act
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });
    expect(tree!.toJSON()).toMatchSnapshot(); // Use ! para afirmar que tree não é undefined
  });

  // Teste 2: Renderização com text1 e text2
  it('Deve renderizar corretamente com apenas text1 e text2', () => {
    const propsWithText2 = {
      ...defaultProps,
      text2: 'Esta ação não poderá ser desfeita.',
    };
    let tree: renderer.ReactTestRenderer;
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...propsWithText2} />);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

  // Teste 3: Verifica se o text1 é exibido corretamente
  it('Deve exibir text1 corretamente', () => {
    const testText1 = 'Confirmação de teste';
    let tree: renderer.ReactTestRenderer;
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...defaultProps} text1={testText1} />);
    });
    const textComponent = tree!.root.findAllByType(Text).find(node => node.props.children === testText1);
    expect(textComponent).toBeDefined();
    expect(textComponent!.props.children).toBe(testText1);
  });

  // Teste 4: Verifica se o text2 é exibido corretamente quando fornecido
  it('deve exibir o texto2 corretamente quando fornecido', () => {
    const testText2 = 'Detalhes adicionais aqui.';
    const propsWithText2 = { ...defaultProps, text2: testText2 };
    let tree: renderer.ReactTestRenderer;
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...propsWithText2} />);
    });
    const textComponent = tree!.root.findAllByType(Text).find(node => node.props.children === testText2);
    expect(textComponent).toBeDefined();
    expect(textComponent!.props.children).toBe(testText2);
  });

  // Teste 5: Verifica se o text2 NÃO é exibido quando não fornecido
  it('não deve exibir text2 quando não fornecido', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });
    const textComponents = tree!.root.findAllByType(Text);
    const hasText2 = textComponents.some(node => node.props.children === defaultProps.text2);
    expect(hasText2).toBeFalsy();
  });

  // Teste 6: Chama a função onConfirm quando o botão "Excluir" é pressionado
  it('deve chamar o onConfirm quando o botão de confirmação é pressionado', () => {
    const { onConfirm } = defaultProps;
    let tree: renderer.ReactTestRenderer;
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });

    // Simule o pressionamento do botão dentro de act() também
    act(() => {
      const confirmButton = tree!.root.find(
        node => node.props.accessibilityLabel === 'Confirmar exclusão' && node.type === TouchableOpacity
      );
      confirmButton.props.onPress();
    });

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  // Teste 7: Chama a função onCancel quando o botão "Cancelar" é pressionado
  it('deve chamar o onCancel quando o botão cancelar é pressionado', () => {
    const { onCancel } = defaultProps;
    let tree: renderer.ReactTestRenderer;
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });

    // Simule o pressionamento do botão dentro de act() também
    act(() => {
      const cancelButton = tree!.root.find(
        node => node.props.accessibilityLabel === 'Cancelar exclusão' && node.type === TouchableOpacity
      );
      cancelButton.props.onPress();
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  // Teste 8: Verifica as propriedades de acessibilidade do contêiner principal
  it('deve conter propriedades de acessibilidade corretas no contêiner', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });
    const container = tree!.root.findByProps({ accessibilityRole: 'alert' });

    expect(container.props.accessibilityRole).toBe('alert');
    expect(container.props.accessibilityLabel).toBe('Confirmação de ação');
  });

  // Teste 9: Verifica o texto dos botões
  it('deve exibir textos de botões corretos', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => { // <-- Envolva a criação do renderer em act()
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });

    const cancelButtonText = tree!.root.find(
      node => node.props.accessibilityLabel === 'Cancelar exclusão'
    ).findByType(Text);
    expect(cancelButtonText.props.children).toBe('Cancelar');

    const confirmButtonText = tree!.root.find(
      node => node.props.accessibilityLabel === 'Confirmar exclusão'
    ).findByType(Text);
    expect(confirmButtonText.props.children).toBe('Excluir');
  });
});