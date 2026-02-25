# Lib (utilitários compartilhados)

A pasta `lib/` concentra código usado por vários testes, Page Objects, Screen Objects e pela configuração: ambiente, geração de dados e acesso às sessões WebdriverIO (browser/mobile).

## Arquivos

### `lib/env.ts`

**Função:** centralizar a leitura de variáveis de ambiente (baseURL, URLs de frontend/backend, etc.).

**Uso:** quando os testes ou o config precisarem de URLs configuráveis (ex.: `FRONTEND_URL`, `BACKEND_URL`), use `lib/env.ts`. Em projetos que usam `getBaseUrl('api' | 'ui')`, o config pode chamar essas funções para definir baseURL. CI ou `.env` podem sobrescrever sem alterar o código.

---

### `lib/data-factory.ts`

**Função:** gerar dados para testes (strings, emails, números) e permitir variar inputs.

**API:**

- `randomString(length = 10): string` — string alfanumérica aleatória.
- `randomEmail(domain = 'teste.qa'): string` — email no formato `qa-<8 chars>@<domain>`.
- `randomNumber(min: number, max: number): number` — inteiro entre min e max (inclusive).

**Uso:** em specs ou em builders em `test-data/<dominio>/<fluxo>/builder.ts` quando precisar de dados únicos (ex.: cadastro, formulário).

**Exemplo (no spec):**

```ts
import { randomEmail } from '../lib/data-factory'

it('cadastro com email único', async () => {
  const email = randomEmail()
  // preencher campo e-mail com email
})
```

---

### `lib/Utils.ts`

**Função:** helpers para multiremote (browser + mobile) e para seletores no app nativo.

**API principal:**

- **getDeviceFromCapabilities(key: string): WebdriverIO.Browser**  
  Retorna a sessão correspondente a `key` (ex.: `'browser'` ou `'mobile'`). Usado por Page Objects, Screen Objects e specs para acessar a instância correta.

- **getElementByTestIDApp(selector, mobile)**: retorna elemento por test ID (resource-id no Android, accessibility id no iOS).
- **getElementsByTestIDApp(selector, mobile)**: mesma ideia para múltiplos elementos.
- **getElementByAccessibilityLabelApp(selector, mobile)**: elemento por content-desc (Android) ou accessibility label (iOS).
- **getElementByTextApp(selector, mobile)**: elemento por texto.

A função **reLaunchApp(emulator)** está em `fixtures/` (não em `lib/Utils`); importe de `fixtures` quando precisar reiniciar o app.

**Uso:** importar de `lib/Utils` (ou `lib/Utils` via path do tsconfig). O config shared importa `getDeviceFromCapabilities` de `lib/Utils` no hook `before` (ex.: para `updateSettings` no Android).

**Exemplo:**

```ts
import { getDeviceFromCapabilities } from 'lib/Utils'
import { reLaunchApp } from 'fixtures'

const browser = getDeviceFromCapabilities('browser')
const mobile = getDeviceFromCapabilities('mobile')
await browser.url('/login')
await reLaunchApp(mobile)
```

## Quando adicionar algo em lib

- **Comportamento usado em vários fluxos ou no config**: coloque em `lib/` (ex.: novo helper de env, outro utilitário de dados).
- **Comportamento só de um fluxo**: prefira `test-data/<dominio>/<fluxo>/builder.ts` ou helpers locais ao spec.
