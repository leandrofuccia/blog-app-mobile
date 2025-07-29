import ConfirmToast, { ConfirmToastProps } from 'components/ConfirmToast';
import { Text, TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return Object.setPrototypeOf(
    {
      View: RN.View,
      Text: RN.Text,
      TouchableOpacity: RN.TouchableOpacity,
      StyleSheet: RN.StyleSheet,
    },
    RN
  );
});

jest.mock('react-native-vector-icons/Ionicons', () => {
  const React = require('react');
  const MockIcon = (props: any) => React.createElement('Icon', props);
  return MockIcon;
});

jest.mock('@/theme/theme', () => ({
  theme: {
    colors: {
      amarelo: '#FFD700',
      neutroInput: '#F0F0F0',
      textoPrincipal: '#333333',
      textoSecundario: '#666666',
      vermelho: '#FF0000',
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

describe('ConfirmToast', () => {
  const defaultProps: ConfirmToastProps = {
    text1: 'Você tem certeza?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve renderizar corretamente com apenas text1', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => { 
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

  it('Deve renderizar corretamente com apenas text1 e text2', () => {
    const propsWithText2 = {
      ...defaultProps,
      text2: 'Esta ação não poderá ser desfeita.',
    };
    let tree: renderer.ReactTestRenderer;
    act(() => { 
      tree = renderer.create(<ConfirmToast {...propsWithText2} />);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

  it('Deve exibir text1 corretamente', () => {
    const testText1 = 'Confirmação de teste';
    let tree: renderer.ReactTestRenderer;
    act(() => { 
      tree = renderer.create(<ConfirmToast {...defaultProps} text1={testText1} />);
    });
    const textComponent = tree!.root.findAllByType(Text).find(node => node.props.children === testText1);
    expect(textComponent).toBeDefined();
    expect(textComponent!.props.children).toBe(testText1);
  });

  it('deve exibir o texto2 corretamente quando fornecido', () => {
    const testText2 = 'Detalhes adicionais aqui.';
    const propsWithText2 = { ...defaultProps, text2: testText2 };
    let tree: renderer.ReactTestRenderer;
    act(() => {
      tree = renderer.create(<ConfirmToast {...propsWithText2} />);
    });
    const textComponent = tree!.root.findAllByType(Text).find(node => node.props.children === testText2);
    expect(textComponent).toBeDefined();
    expect(textComponent!.props.children).toBe(testText2);
  });

  it('não deve exibir text2 quando não fornecido', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => { 
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });
    const textComponents = tree!.root.findAllByType(Text);
    const hasText2 = textComponents.some(node => node.props.children === defaultProps.text2);
    expect(hasText2).toBeFalsy();
  });

  it('deve chamar o onConfirm quando o botão de confirmação é pressionado', () => {
    const { onConfirm } = defaultProps;
    let tree: renderer.ReactTestRenderer;
    act(() => {
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });

    act(() => {
      const confirmButton = tree!.root.find(
        node => node.props.accessibilityLabel === 'Confirmar exclusão' && node.type === TouchableOpacity
      );
      confirmButton.props.onPress();
    });

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('deve chamar o onCancel quando o botão cancelar é pressionado', () => {
    const { onCancel } = defaultProps;
    let tree: renderer.ReactTestRenderer;
    act(() => { 
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });

    act(() => {
      const cancelButton = tree!.root.find(
        node => node.props.accessibilityLabel === 'Cancelar exclusão' && node.type === TouchableOpacity
      );
      cancelButton.props.onPress();
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('deve conter propriedades de acessibilidade corretas no contêiner', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => { 
      tree = renderer.create(<ConfirmToast {...defaultProps} />);
    });
    const container = tree!.root.findByProps({ accessibilityRole: 'alert' });

    expect(container.props.accessibilityRole).toBe('alert');
    expect(container.props.accessibilityLabel).toBe('Confirmação de ação');
  });

  it('deve exibir textos de botões corretos', () => {
    let tree: renderer.ReactTestRenderer;
    act(() => { 
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