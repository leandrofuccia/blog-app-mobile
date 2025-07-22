module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-reanimated|expo(nent)?|@expo(nent)?/.*|@unimodules/.*|sentry-expo|native-base|react-native-vector-icons)',
  ],
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // --- Adicione/Modifique esta seção para resolver seus aliases de importação ---
  moduleNameMapper: {
    // Mapeia 'components/' para a pasta 'components' na raiz do projeto.
    // Use '<rootDir>' para se referir à raiz do seu projeto (onde o jest.config.js está).
    '^components/(.*)$': '<rootDir>/components/$1', // Isso mapeia 'components/NomeDoArquivo' para 'raiz/components/NomeDoArquivo'

    // Se você também usa `@/` como um alias para `src/`, adicione isso:
    '^@/(.*)$': '<rootDir>/src/$1', // Isso mapeia '@/pasta/arquivo' para 'raiz/src/pasta/arquivo'

    // Se o seu 'theme' está em '@/theme/theme', este mapeamento já funciona com o acima.
    // Caso contrário, você pode precisar de um mapeamento específico para o tema se ele não for resolvido por outros aliases.
    '^@/theme/theme$': '<rootDir>/theme/theme.ts', // Exemplo se o tema está na raiz/theme
  },
  // --- Fim da seção moduleNameMapper ---
};