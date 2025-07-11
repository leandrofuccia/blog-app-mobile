# Usa Node oficial
FROM node:23-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências
RUN npm install

# Copia todo o restante do código-fonte
COPY . .

# Expõe portas do Expo
EXPOSE 19000 19001 19002

# Garante que o Expo CLI esteja instalado globalmente
RUN npm install -g expo-cli

# Comando padrão que inicia o Expo
CMD ["npx", "expo", "start", "--tunnel", "--clear"]
