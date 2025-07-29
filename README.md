# Documentação do Tech-challenge – Fase 4

Atualmente, muitos professores da rede pública enfrentam limitações para divulgar suas aulas e compartilhar conteúdos com alunos de forma acessível e tecnológica. Para contribuir com essa transformação, esta etapa do projeto apresenta uma **interface mobile** desenvolvida com **React Native e Expo**, integrada ao backend da aplicação de blogging dinâmico.

A aplicação possui dois perfis de uso — **Professor** e **Aluno**. Ambos podem visualizar postagens públicas, enquanto a criação, edição e exclusão de postagens são funcionalidades restritas ao perfil de professor.

---

## Arquitetura da Camada Mobile (React Native + Expo)

### 1. **Componentização**

- Utilização de componentes reutilizáveis: `Layout`, `UserForm`, `FormContainer`, `PostItem`, `CustomToast`, `ConfirmToast`.
- Estilos centralizados com `sharedStyles.ts` e `theme.ts` para cores e tipografia semânticas.

### 2. **Gerenciamento de Estado**

- Autenticação via **Context API** (`AuthContext`) com persistência de token via `AsyncStorage`.
- Hooks personalizados: `usePosts`, `useInfinitePosts`, `useFormValidation`, `useCriarUsuario`, `useCriarPostagem`.

### 3. **Comunicação com Backend**

- Consumo de API com **Axios**, incluindo headers automáticos com token JWT.
- Adaptação automática do IP local ou tunnel Expo, com suporte a emuladores e dispositivos físicos.

### 4. **Roteamento e Navegação**

- Implementado com **React Navigation** (`Drawer`, `Stack`) com controle de rotas por tipo de perfil.
- Drawer personalizado que exibe menus exclusivos para professores.

### 5. **Validação de Dados**

- Validações personalizadas via hook `useFormValidation`: campos obrigatórios, e-mail válido, consistência de senha.

### 6. **Estilização e Temas**

- Sistema de temas com cores nomeadas (`primaria`, `destaque`, `neutroFundo`, etc.) e fontes semânticas.
- Compatível com teclado móvel via `KeyboardAwareScrollView`.

### 7. **Feedback Visual**

- Feedback em tempo real com `react-native-toast-message` customizado.
- Toasts para sucesso, erro, alerta e confirmação.

### 8. **Performance**

- Scroll infinito com `FlatList` e paginação sob demanda.
- Evita renderizações desnecessárias com controle de estado eficiente.

### 9. **Automação e Deploy**

- Empacotamento via Docker com execução de Expo CLI em `tunnel` mode.
- Script `set-local-ip.js` para atualizar `.env`, `docker-compose.yml`, e URL da API.

---

## Setup Inicial

Este guia orienta o usuário a instalar e executar a aplicação mobile utilizando Docker, Android Studio ou dispositivo físico Android.

### 1. Requisitos

- **Docker** Versão 20.10.7 ou superior [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** Versão recomendada: 2.0.0 ou superior [Instalar Docker Compose](https://docs.docker.com/compose/install/)
- **Android Studio** [Instalar Android Studio](https://developer.android.com/studio)
- **Expo Go App** [Baixar no dispositivo](https://expo.dev/client)
- **Backend ativo** [Configurar e iniciar backend](https://github.com/leandrofuccia/blog-app)

---

### 2. Configuração do Emulador (Android Studio)

1. Abrir o Android Studio
2. Acessar **Device Manager** → **Create Device**
3. Escolher modelo: `Pixel` com tela de 5 polegadas
4. Selecionar **API Level 36.0** (imagem recomendada)
5. Instalar e iniciar o dispositivo virtual

---

### 3. Criar rede Docker compartilhada

```bash
docker network create app-network
```

---

### 4. Baixar imagem da aplicação no Docker Hub

```bash
docker pull leandrofuccia/blog-app-mobile:latest
```

---

### 5. Executar aplicação no emulador

```bash
docker run -it leandrofuccia/blog-app-mobile:latest
```

Na primeira execução, responda `yes` à seguinte pergunta:

```
The package @expo/ngrok@^4.1.0 is required to use tunnels, would you like to install it globally?
```

Após iniciar, copie a URL gerada pelo Expo CLI, por exemplo:

```
Metro waiting on exp://optivrq-anonymous-8081.exp.direct
```

Abra o app **Expo Go** no emulador Android e selecione **Enter URL manually** para colar o endereço.

---

### 6. Executar aplicação em dispositivo físico Android

1. Descubra o IP local da máquina:

   - Execute `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
   - Pegue o IP da interface Wi-Fi, por exemplo: `192.168.0.140`
2. Execute o container com a URL local:

```bash
docker run -it -e EXPO_PUBLIC_API_URL="http://192.168.0.140:3002" leandrofuccia/blog-app-mobile:latest
```

Novamente, responda `yes` para instalar o ngrok:

```
The package @expo/ngrok@^4.1.0 is required to use tunnels, would you like to install it globally?
```

3. Aguarde a inicialização e escaneie o **QR Code** usando o **Expo Go** no dispositivo Android.

---

## Guia de Uso da Aplicação Mobile

Este guia tem como objetivo orientar o uso da aplicação mobile de blogging dinâmico, acessível via Expo Go após a conclusão do Setup Inicial.

### **1. Tela Inicial / Lista de Postagens**

**Objetivo:** Exibir publicamente todas as postagens disponíveis.

#### **Passos do Usuário:**

1. Ao abrir o aplicativo, a tela inicial mostra a **Lista de Postagens**.
2. Cada item apresenta:
   - Título da postagem
   - Parte do conteúdo
   - Nome do autor
3. No topo da tela, existe um campo de **busca** para filtrar postagens por título ou conteúdo.
4. A lista possui **scroll infinito**: novos itens são carregados conforme o usuário rola a tela.

### **2. Menu Lateral**

**Objetivo:** Navegar entre seções e acessar funcionalidades específicas.

#### **Itens Disponíveis:**

- **Início**: Retorna à lista de postagens públicas.
- **Login**: Acesso à tela de autenticação.
- Quando logado como **professor ou administrador**, o menu inclui:
  - **Gerenciar Postagens**
  - **Gerenciar Professores**
  - **Gerenciar Alunos**
  - **Logout**: Encerrar sessão

### **3. Tela de Login**

**Objetivo:** Autenticar o usuário com permissões específicas.

#### **Passos do Usuário:**

1. Acessar o menu lateral e tocar em **Login**.
2. Preencher os campos:
   - **E-mail**
   - **Senha**
3. Tocar em **Entrar**.
4. Se as credenciais forem válidas, o usuário é redirecionado à tela inicial com funções extras liberadas conforme o perfil.
5. **Importante:** Usuários não se registram via aplicativo. O administrador do sistema (usuário default `admin@dominio.com`, senha `123456`) ou outro professor cadastra os demais usuários.

### **4. Gerenciamento de Usuários** (Professores/Admins)

**Objetivo:** Criar, editar ou remover usuários da plataforma.

#### **Passos do Usuário:**

1. Acessar o menu lateral e tocar em **Gerenciar Professores** ou **Gerenciar Alunos**.
2. A tela exibe a lista de usuários do perfil selecionado.
3. Para **incluir um novo usuário**:
   - Tocar no botão **+** flutuante no canto inferior direito.
   - Preencher os campos:
     - Nome
     - E-mail
     - Senha
     - Confirmar Senha
   - Tocar em **Salvar**
4. Para **editar**, tocar no ícone de **lápis** em cada item.
5. Para **excluir**, tocar no ícone de **lixeira**.
6. Toda exclusão exige **confirmação visual** via toast personalizado.

### **5. Gerenciamento de Postagens** (Professores/Admins)

**Objetivo:** Publicar, editar ou remover postagens.

#### **Passos do Usuário:**

1. Acessar o menu lateral → **Gerenciar Postagens**.
2. Visualizar todas as postagens existentes.
3. Para **criar uma nova postagem**:
   - Tocar no botão **+** flutuante.
   - Preencher:
     - Título
     - Conteúdo
   - Tocar em **Publicar**
4. Para **editar**, tocar no ícone de **lápis**.
5. Para **excluir**, tocar no ícone de **lixeira**.
6. Exclusões também exigem **confirmação antes de executar**.

### **6. Detalhes da Postagem**

**Objetivo:** Exibir conteúdo completo de uma postagem e permitir interação.

#### **Passos do Usuário:**

1. Na lista de postagens, tocar sobre qualquer item para abrir os **detalhes**.
2. A tela exibe:

   - Título
   - Conteúdo completo
   - Autor
   - Data de criação
3. Na parte inferior, são exibidos dois ícones com contadores:

   - 💬 **Comentários**: Exibe a quantidade total e lista os comentários.
   - 💚 **Curtidas**: Usuários podem curtir a postagem; o ícone muda de cor ao ser marcado.
4. Para **adicionar um comentário**:

   - Tocar no botão **+** em comentários.
   - Preencher o campo **Conteúdo**
   - Tocar em **Salvar Comentário**
5. Comentários também podem ser **curtidos** individualmente (com ícone 💚 ao lado de cada comentário).

### **7. Logout**

**Objetivo:** Encerrar a sessão de um usuário logado.

#### **Passos do Usuário:**

1. Acessar o menu lateral.
2. Tocar na opção **Logout**.
3. O aplicativo redireciona para uma tela com botão **Sair**, finalizando a sessão.

### Tabela de Permissões por Perfil

| Funcionalidade                                    | Aluno | Professor |
| ------------------------------------------------- | :---: | :-------: |
| Visualizar postagens                              |  ✅  |    ✅    |
| Buscar por conteúdo                              |  ✅  |    ✅    |
| Curtir e comentar postagens (somente autenticado) |  ✅  |    ✅    |
| Criar postagens                                   |  ❌  |    ✅    |
| Editar postagens                                  |  ❌  |    ✅    |
| Excluir postagens                                 |  ❌  |    ✅    |
| Gerenciar perfis/usuários                        |  ❌  |    ✅    |

---

## Desafios da Equipe nessa fase

Durante o desenvolvimento do nosso aplicativo mobile utilizando **React Native** e **Expo Go**, enfrentamos diversas dificuldades técnicas que exigiram soluções específicas e bastante criatividade.

Ao criarmos um dispositivo virtual no Android Virtual Device (AVD) Manager, notamos que algumas configurações apresentavam telas exageradamente grandes e fora de escala para o nosso monitor, o que dificultava os testes. Após várias tentativas e ajustes, conseguimos encontrar uma configuração mais equilibrada — um modelo que se adaptava bem ao nosso ambiente local e permitia o uso eficiente do emulador.

A implementação do menu lateral utilizando o **DrawerNavigator** exigiu que aprofundássemos nosso entendimento sobre a estrutura de navegação do React Navigation. Tivemos que explorar o funcionamento do `Drawer`, o aninhamento de rotas e a personalização visual do conteúdo para criar uma experiência fluida e consistente para o usuário.

Nos deparamos com dificuldades ao integrar os containers Docker do back-end com o aplicativo mobile. Inicialmente, o app não conseguia acessar a API, até que percebemos que era essencial que ambos — o container e o back-end — estivessem conectados à **mesma rede Docker** para garantir a comunicação correta.

Ao testarmos o aplicativo em dispositivos Android físicos, enfrentamos problemas semelhantes de conexão. Descobrimos que o celular precisava estar na **mesma rede Wi-Fi** que o backend, com o **IP local da máquina corretamente configurado**, para que o app pudesse se comunicar com a API sem impedimentos.

Esses desafios exigiram de nós persistência, testes constantes e muita pesquisa. Cada obstáculo superado contribuiu de forma significativa para nosso crescimento técnico e para o domínio prático do desenvolvimento mobile com **integração a containers Docker**.
