FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Cria ARG e ENV para a URL
ARG EXPO_PUBLIC_API_URL
ENV EXPO_PUBLIC_API_URL=${EXPO_PUBLIC_API_URL}

# Expo precisa saber do env
ENV NODE_ENV=development

# Expor portas do Expo
EXPOSE 19000 19001 19002

RUN npm install -g expo-cli

CMD ["npx", "expo", "start", "--tunnel", "--clear"]
