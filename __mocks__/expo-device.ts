// __mocks__/expo-device.ts

// Mock para simular um dispositivo ou emulador para os testes.
// Ajuste 'isDevice' para 'false' se você quiser testar o caminho do emulador Android.
export const isDevice = false; // Define como false para testar o isAndroidEmulator()
export const brand = 'mock_brand';
export const model = 'mock_model';
export const osName = 'mock_os';
export const osVersion = 'mock_version';
export const deviceName = 'mock_device';

// Adicione outras propriedades se seu código as utilizar, para evitar 'undefined'.
// Ex: export const manufacturer = 'mock_manufacturer';