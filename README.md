# QA – Automação de testes com WebdriverIO

Repositório **padrão para automação de testes QA** com **WebdriverIO** (browser + app nativo via Appium) e **TypeScript**. E2E em browser (Chrome) e app nativo (Android/iOS) com suporte a multiremote no mesmo teste.

**Documentação detalhada:** pasta [docs/](docs/) — um arquivo por seção (estrutura, fixtures, test-data, como adicionar teste/fluxo, ambiente). Índice em [docs/README.md](docs/README.md).

**Agentes / LLMs:** [AGENTS.md](AGENTS.md) — convenções, comandos e referências às docs para trabalho automatizado.

<br>
<div align="center">
  <img src="https://webdriver.io/img/webdriverio.png" alt="WebdriverIO" width="200" />
</div>
<br>

> [!IMPORTANT]
> Este boilerplate usa o [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app). Coloque os binários (APK/IPA) na pasta `./apps` conforme [docs/08-ambiente-e-configuração.md](docs/08-ambiente-e-configuração.md).

> [!NOTE]
> Multiremote não executa todos os testes em paralelo; serve para coordenar browser e dispositivo no mesmo teste (ex.: integração browser + app).

---

## Stack

- **WebdriverIO** 9.x, **Appium** 3.x, **Chromedriver**, **Mocha**
- **TypeScript** (strict mode)
- Page Objects (web) e Screen Objects (app)
- Configs: [configs/wdio.shared.conf.ts](configs/wdio.shared.conf.ts), [wdio.android.conf.ts](configs/wdio.android.conf.ts), [wdio.ios.conf.ts](configs/wdio.ios.conf.ts)

---

## Comandos

Execute na raiz do projeto:

| Comando | Descrição |
|---------|-----------|
| `npm run test-android` | Roda testes no Android (emulador/dispositivo) + browser |
| `npm run test-ios` | Roda testes no iOS (simulador/dispositivo) + browser |
| `npm run test-android-headless` | Android com browser em modo headless |
| `npm run test-ios-headless` | iOS com browser em modo headless |
| `npm run build` | Verificação TypeScript (`tsc --noEmit`) |

### Rodar só um fluxo

```bash
wdio run ./configs/wdio.android.conf.ts --spec test/<dominio>/<fluxo>/**/*.ts
wdio run ./configs/wdio.ios.conf.ts --spec test/<dominio>/<fluxo>/**/*.ts
```

Substitua `<dominio>` e `<fluxo>` pelo domínio e nome do fluxo (ex.: `manager`, `login`). Ver [docs/09-comandos-e-opcoes.md](docs/09-comandos-e-opcoes.md).

---

## Estrutura do projeto

| Diretório | Papel |
|-----------|--------|
| **test/** | Specs por domínio e fluxo (ex.: `test/manager/login/*.spec.ts`); domínios: app-cliente, log, manager, partners |
| **test-data/** | Constantes em `e2e/Constants.ts`; dados por domínio e fluxo em `<dominio>/<fluxo>/inputs.json`, `messages.json` (opcional `builder.ts`) |
| **pageobjects/** | Page Objects por domínio (ex.: `pageobjects/manager/LoginPage.ts`) |
| **screenobjects/** | Screen Objects por domínio + `components/` (ex.: `screenobjects/manager/LoginScreen.ts`) |
| **fixtures/** | Funções reutilizáveis (ex.: `loginFixture`, `reLaunchApp`) |
| **lib/** | `env.ts`, `data-factory.ts`, `Utils.ts` (getDeviceFromCapabilities, seletores app) |
| **configs/** | Configurações WebdriverIO (shared, android, ios, sauce) |
| **docs/** | Documentação (estrutura, fixtures, test-data, novo teste, novo fluxo, ambiente, comandos) |

Ver [docs/02-estrutura-de-diretórios.md](docs/02-estrutura-de-diretórios.md).

---

## Agentes QA (WebdriverIO)

O projeto usa agentes de QA para manter convenções, adicionar testes/fluxos/dados/fixtures ou revisar código.

| Agente | Quando usar |
|--------|-------------|
| **agt-qa-webdriverio-context** | Dúvidas sobre estrutura, comandos ou documentação (não edita código). |
| **agt-qa-webdriverio-maintain** | Editar specs ou refatorar alinhado às convenções. |
| **agt-qa-webdriverio-add-test** | Adicionar um novo teste (browser, app ou E2E). |
| **agt-qa-webdriverio-add-flow** | Adicionar um novo fluxo (pastas, specs, test-data). |
| **agt-qa-webdriverio-add-fixture** | Adicionar ou estender fixture em `fixtures/index.ts`. |
| **agt-qa-webdriverio-add-data** | Adicionar ou estender test-data (inputs.json, builder.ts). |
| **agt-qa-webdriverio-code-reviewer** | Revisar código QA e gerar resumo de melhorias. |

Skills em [.cursor/skills/qa/](.cursor/skills/qa/). Ver [AGENTS.md](AGENTS.md).

---

## Checklist: novo fluxo

1. Criar pasta em `test/<dominio>/<fluxo>/` (ex.: `test/manager/login/`).
2. Se houver dados: criar `test-data/<dominio>/<fluxo>/` com `inputs.json` (e opcional `messages.json`, `builder.ts`).
3. Escrever specs: importar `expect` de `@wdio/globals`, usar `lib/Utils` e Page/Screen Objects.
4. Se outro baseURL ou app: configurar em [configs/](configs/) ou [docs/08-ambiente-e-configuração.md](docs/08-ambiente-e-configuração.md).

Ver [docs/07-como-adicionar-novo-fluxo.md](docs/07-como-adicionar-novo-fluxo.md).

---

## Checklist: novo teste

- Arquivo em `test/<dominio>/<fluxo>/` com extensão `.ts` (ex.: `test/manager/login/login.spec.ts`).
- Importar `expect` de `@wdio/globals`; usar `getDeviceFromCapabilities('browser')` ou `getDeviceFromCapabilities('mobile')` de `lib/Utils` (ou Page/Screen Objects).
- Dados em `test-data` quando houver inputs reutilizáveis.
- Nome descritivo e Arrange-Act-Assert.

Ver [docs/06-como-adicionar-novo-teste.md](docs/06-como-adicionar-novo-teste.md).

---

## Instalação

1. Clone o repositório e instale as dependências:

```sh
git clone <url-do-repositorio>
cd webdriverio-multiremote-boilerplate
npm install
```

2. Configure o ambiente: copie [.env.example](.env.example) para `.env` e ajuste (device names, URLs). Não commite `.env`.

3. Coloque os binários do app (APK para Android, IPA para iOS) na pasta `./apps`. Downloads em [WebdriverIO native demo app – Releases](https://github.com/webdriverio/native-demo-app/releases).

4. Ajuste os configs em [configs/](configs/) para o seu emulador/dispositivo (ver [docs/08-ambiente-e-configuração.md](docs/08-ambiente-e-configuração.md)).

> [!TIP]
> Use o [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) para configurar Appium e emuladores/simuladores.

---

## O que é multiremote

O multiremote do WebdriverIO permite rodar browser e app no mesmo teste e acessá-los por nome (ex.: `browser`, `mobile`). Use `getDeviceFromCapabilities('browser')` e `getDeviceFromCapabilities('mobile')` de [lib/Utils.ts](lib/Utils.ts):

```typescript
import { getDeviceFromCapabilities } from '../lib/Utils'

const browser = getDeviceFromCapabilities('browser')
const mobile = getDeviceFromCapabilities('mobile')
// browser.url(...), mobile.$('~selector'), etc.
```

---

## Versionamento (semantic-release)

O **semantic-release** roda no GitHub Actions após o job de build e testes em cada push na branch **main**. Ele analisa os commits (conventional commits), calcula a próxima versão, atualiza `package.json` e gera o `CHANGELOG.md`, fazendo commit e tag no repositório.

**Conventional commits** (use no título do commit):

| Prefixo | Efeito na versão | Exemplo |
|--------|-------------------|--------|
| `feat:` | Minor (1.0.0 → 1.1.0) | `feat: add login flow tests` |
| `fix:` | Patch (1.0.0 → 1.0.1) | `fix: correct baseURL in env` |
| `docs:`, `chore:`, `refactor:`, `test:` | Sem bump | `docs: update README` |
| `BREAKING CHANGE:` no corpo ou `!` no escopo | Major (1.0.0 → 2.0.0) | `feat!: change fixture API` |

Configuração em [.releaserc.json](.releaserc.json); workflow em [.github/workflows/ci.yml](.github/workflows/ci.yml). O pacote **não** é publicado no npm (`npmPublish: false`); apenas a versão local e o changelog são atualizados.

---

## Documentação completa

- **Estrutura e convenções:** [docs/02-estrutura-de-diretórios.md](docs/02-estrutura-de-diretórios.md)
- **Fixtures:** [docs/03-fixtures.md](docs/03-fixtures.md)
- **Test data:** [docs/04-test-data.md](docs/04-test-data.md)
- **Lib:** [docs/05-lib.md](docs/05-lib.md)
- **Novo teste:** [docs/06-como-adicionar-novo-teste.md](docs/06-como-adicionar-novo-teste.md)
- **Novo fluxo:** [docs/07-como-adicionar-novo-fluxo.md](docs/07-como-adicionar-novo-fluxo.md)
- **Ambiente e configuração:** [docs/08-ambiente-e-configuração.md](docs/08-ambiente-e-configuração.md)
- **Comandos e opções:** [docs/09-comandos-e-opcoes.md](docs/09-comandos-e-opcoes.md)

Índice: [docs/README.md](docs/README.md).
