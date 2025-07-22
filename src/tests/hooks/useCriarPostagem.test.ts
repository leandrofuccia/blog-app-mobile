// src/tests/hooks/useCriarPostagem.test.ts
import { act, renderHook } from '@testing-library/react-hooks'; // Importe waitFor também
import { useCriarPostagem } from '../../hooks/useCriarPostagem';
import api from '../../services/api';
import { showToast } from '../../utils/showToast';

// Mock do módulo api (axios)
jest.mock('../../services/api'); // Caminho direto se api.ts está no root de services
const mockedApi = api as jest.Mocked<typeof api>;

// Mock da função showToast
jest.mock('../../utils/showToast', () => ({ // Caminho direto se utils está no root
  showToast: jest.fn(),
}));
const mockedShowToast = showToast as jest.MockedFunction<typeof showToast>;

describe('useCriarPostagem', () => {
  beforeEach(() => {
    mockedApi.post.mockClear();
    mockedShowToast.mockClear();
    jest.useFakeTimers(); // Habilita a simulação de timers
  });

  afterEach(async () => {
    // Garante que todos os timers pendentes sejam executados e acts concluídos
    await act(async () => {
      jest.runAllTimers(); // Garante que todas as timers (incluindo timeouts e intervals) sejam executadas
    });
    jest.useRealTimers(); // Volta a usar os timers reais
  });

  it('deve inicializar com título e conteúdo vazios e carregar como falso', () => {
    const { result } = renderHook(() => useCriarPostagem());
    expect(result.current.titulo).toBe('');
    expect(result.current.conteudo).toBe('');
    expect(result.current.loading).toBe(false);
  });

  // --- Testes de validação (onde loading não deve ser true) ---
  it('deve mostrar uma notificação e retornar falso se o título estiver vazio', async () => {
    const { result } = renderHook(() => useCriarPostagem());
    act(() => {
      result.current.setConteudo('Conteúdo válido');
    });
    let successResult: boolean | undefined;
    await act(async () => {
      successResult = await result.current.criarPostagem(1);
    });
    expect(successResult).toBe(false);
    expect(mockedShowToast).toHaveBeenCalledTimes(1);
    expect(mockedShowToast).toHaveBeenCalledWith({
      type: 'alert',
      text1: 'Campos obrigatórios',
      text2: 'Título e conteúdo são obrigatórios.',
      duration: 7000,
    });
    expect(mockedApi.post).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

  it('deve mostrar uma notificação e retornar falso se o conteúdo estiver vazio', async () => {
    const { result } = renderHook(() => useCriarPostagem());
    act(() => {
      result.current.setTitulo('Título válido');
    });
    let successResult: boolean | undefined;
    await act(async () => {
      successResult = await result.current.criarPostagem(1);
    });
    expect(successResult).toBe(false);
    expect(mockedShowToast).toHaveBeenCalledTimes(1);
    expect(mockedShowToast).toHaveBeenCalledWith({
      type: 'alert',
      text1: 'Campos obrigatórios',
      text2: 'Título e conteúdo são obrigatórios.',
      duration: 7000,
    });
    expect(mockedApi.post).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

  // --- Testes onde loading deve ser true durante a operação assíncrona ---

  it('deve criar uma postagem, mostrar uma notificação de sucesso e retornar verdadeiro em caso de sucesso', async () => {
    const userId = 1;
    const postData = {
      titulo: 'Novo Título',
      conteudo: 'Novo Conteúdo',
      usuarioid: userId,
    };

    mockedApi.post.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useCriarPostagem());

    act(() => {
      result.current.setTitulo(postData.titulo);
      result.current.setConteudo(postData.conteudo);
    });

    let success: boolean = false;

    await act(async () => {
      success = await result.current.criarPostagem(userId);
    });

    expect(success).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/posts', postData);
    expect(mockedShowToast).toHaveBeenCalledTimes(1);
    expect(mockedShowToast).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Postagem criada!',
      text2: 'Sua postagem foi publicada com sucesso.',
    });
  });

  it('deve mostrar uma notificação de erro e retornar falso em caso de erro de API', async () => {
    const userId = 1;
    const postData = {
      titulo: 'Novo Título',
      conteudo: 'Novo Conteúdo',
      usuarioid: userId,
    };

    mockedApi.post.mockRejectedValueOnce(new Error('Erro da API'));

    const { result } = renderHook(() => useCriarPostagem());

    act(() => {
      result.current.setTitulo(postData.titulo);
      result.current.setConteudo(postData.conteudo);
    });

    let success: boolean = true;

    await act(async () => {
      success = await result.current.criarPostagem(userId);
    });

    expect(success).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith('/posts', postData);
    expect(mockedShowToast).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Erro ao criar postagem',
      text2: 'Tente novamente mais tarde.',
    });
  });


  it('deve cortar o título e o conteúdo antes da validação e envio para a API', async () => {
    const userId = 1;
    const tituloOriginal = '   Título Trimado   ';
    const conteudoOriginal = '\nConteúdo Trimado\t';
    const postData = {
      titulo: 'Título Trimado',
      conteudo: 'Conteúdo Trimado',
      usuarioid: userId,
    };

    mockedApi.post.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() => useCriarPostagem());

    act(() => {
      result.current.setTitulo(tituloOriginal);
      result.current.setConteudo(conteudoOriginal);
    });

    let success: boolean = false;

    await act(async () => {
      success = await result.current.criarPostagem(userId);
    });

    expect(success).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(mockedApi.post).toHaveBeenCalledWith('/posts', postData);
  });

  

});



