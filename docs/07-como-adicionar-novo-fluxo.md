# Como adicionar um novo fluxo

Um **fluxo** é um conjunto de testes para um mesmo contexto (ex.: login, onboarding, checkout). A estrutura é por **domínio** (app-cliente, log, manager, partners). Cada fluxo tem uma pasta em `test/<dominio>/<fluxo>/` e, se houver dados, em `test-data/<dominio>/<fluxo>/`. Exemplo: fluxo **login** do domínio manager em `test/manager/login/` com `test-data/manager/login/inputs.json` e `messages.json`.

## Checklist

1. **Criar pasta/arquivos de spec** em `test/<dominio>/<fluxo>/` (ex.: `test/manager/meufluxo/login.spec.ts`).
2. **Criar pasta de dados** (se houver inputs): `test-data/<dominio>/<fluxo>/` com `inputs.json`, opcionalmente `messages.json` ou `builder.ts`.
3. **Definir inputs/constantes**: `inputs.json` (ou `inputs.ts`), ou `Constants.ts`; se precisar variar muito, adicionar `builder.ts` usando `lib/data-factory`.
4. **Escrever os specs**: importar `expect` de `@wdio/globals`; usar Page Objects de `pageobjects/<dominio>/` e Screen Objects de `screenobjects/<dominio>/` (e `screenobjects/<dominio>/components/`); usar `lib/Utils`; para dados, importar de test-data ou usar builder.
5. **Configuração**: se o fluxo usar outra baseURL ou outro app, configurar em `configs/` ou via variáveis de ambiente (ver [08 - Ambiente e configuração](08-ambiente-e-configuração.md)).

## Passo a passo

### 1. Criar specs do fluxo

```text
test/manager/meufluxo/
    login.spec.ts
    checkout.spec.ts
```

O config shared usa `../test/**/*.ts`, então qualquer arquivo em `test/<dominio>/<fluxo>/**/*.ts` já é incluído (incluindo fluxos que misturam browser e app no mesmo teste).

### 2. Criar pasta de dados (opcional)

```text
test-data/manager/meufluxo/
    inputs.json
    builder.ts   # opcional
```

### 3. Exemplo de inputs

**test-data/manager/meufluxo/inputs.json**

```json
{
  "login": { "username": "user@test.com", "password": "senha123" },
  "checkout": { "productId": "123" }
}
```

### 4. Exemplo de spec (browser)

**test/manager/meufluxo/login.spec.ts**

```ts
import { expect } from '@wdio/globals'
import LoginPage from '../../../pageobjects/manager/LoginPage'
import SecurePage from '../../../pageobjects/manager/SecurePage'

describe('Meu fluxo - Login', () => {
    it('deve fazer login com sucesso', async () => {
        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
    })
})
```

### 5. Exemplo de spec (app)

**test/manager/meufluxo/login-app.spec.ts**

```ts
import { expect } from '@wdio/globals'
import TabBar from '../../../screenobjects/manager/components/TabBar'
import LoginScreen from '../../../screenobjects/manager/LoginScreen'

describe('Meu fluxo - Login no app', () => {
    it('deve exibir home após login', async () => {
        await TabBar.openLogin()
        await LoginScreen.submitLoginForm({ username: 'user@test.com', password: 'senha123' })
        // ... asserções na home
    })
})
```

### 6. BaseURL ou app diferente

- **Browser:** altere `baseUrl` no `configs/wdio.shared.conf.ts` ou use variáveis de ambiente (ex.: `FRONTEND_URL`) e leia em `lib/env.ts`.
- **App:** altere o path do app em `configs/wdio.android.conf.ts` ou `wdio.ios.conf.ts` (ex.: `apps/meuapp.apk`).

## Nomenclatura

- **Pasta do fluxo:** nome curto e claro (ex.: `login`, `checkout`, `onboarding`).
- **Arquivos de spec:** `.ts`; o nome pode descrever o cenário (ex.: `login.spec.ts`, `checkout.spec.ts`).

## Rodar os testes

```bash
npm run test-android
npm run test-ios
# ou
wdio run ./configs/wdio.android.conf.ts
wdio run ./configs/wdio.ios.conf.ts
```

Para rodar apenas um arquivo, use o parâmetro de spec do WebdriverIO (consulte [09 - Comandos e opções](09-comandos-e-opcoes.md)).
