# Estrutura de diretórios

Cada diretório tem um papel definido. O projeto usa WebdriverIO com Appium para E2E em browser e app nativo.

## Árvore

```
projeto/
├── docs/                 # Documentação (esta pasta)
├── configs/              # Configurações WebdriverIO
│   ├── wdio.shared.conf.ts   # Config base (specs, mocha, baseURL, hooks)
│   ├── wdio.android.conf.ts  # Android + browser (multiremote)
│   ├── wdio.ios.conf.ts      # iOS + browser (multiremote)
│   ├── wdio.ci-local.conf.ts # CI local (opcional)
│   └── wdio.sauce.conf.ts    # Sauce Labs (opcional)
├── test/                 # Specs (arquivos de teste) — por domínio e fluxo
│   └── <dominio>/        # ex.: manager/, partners/
│       └── <fluxo>/      # ex.: login/ com login.spec.ts
├── pageobjects/          # Page Objects para web — por domínio
│   └── <dominio>/        # ex.: manager/LoginPage.ts
├── screenobjects/        # Screen Objects para app nativo — por domínio
│   └── <dominio>/        # ex.: manager/LoginScreen.ts
│       └── components/   # ex.: TabBar.ts, NativeAlert.ts
├── fixtures/             # Funções reutilizáveis (ex.: reLaunchApp)
├── lib/                  # Utilitários compartilhados (env, data-factory, Utils)
├── test-data/            # Dados e constantes — por domínio e fluxo
│   ├── Constants.ts      # Constantes compartilhadas (Constants.ts)
│   └── <dominio>/        # ex.: manager/
│       └── <fluxo>/      # ex.: login/ com inputs.json, messages.json
├── apps/                 # Binários do app (APK, IPA ou placeholder)
├── .env.example          # Exemplo de variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md
```

## Diretórios

### `configs/`

- **Papel**: configurações do WebdriverIO (runner, specs, capabilities, Mocha, hooks).
- **Arquivos**:
  - `wdio.shared.conf.ts`: config base; define specs (`../test/**/*.ts`), baseURL (the-internet.herokuapp.com), framework Mocha, hooks (ex.: `before` para `updateSettings` no Android).
  - `wdio.android.conf.ts`: multiremote com capabilities `browser` (Chrome) e `mobile` (Appium Android); usa `wdio.shared.conf`.
  - `wdio.ios.conf.ts`: multiremote para iOS + browser.
  - `wdio.ci-local.conf.ts`: execução em CI local (script `test-ci-local`).
  - `wdio.sauce.conf.ts`: execução na nuvem (Sauce Labs), se usado.

### `test/`

- **Papel**: arquivos de teste (specs).
- **Estrutura**: specs organizados por **domínio** e fluxo em `test/<dominio>/<fluxo>/**/*.ts` (ex.: `test/manager/login/login.spec.ts`). Domínios: app-cliente, log, manager, partners. O config shared usa o padrão `../test/**/*.ts`, incluindo todos os fluxos.
- **Convenção**: use `describe`/`it` (Mocha); importe `expect` de `@wdio/globals`; use `getDeviceFromCapabilities('browser')` ou `getDeviceFromCapabilities('mobile')` (de `lib/Utils`) para acessar a sessão correta.

### `pageobjects/`

- **Papel**: Page Object Model para páginas web (browser), organizados por domínio.
- **Estrutura**: `pageobjects/<dominio>/` (ex.: `pageobjects/manager/LoginPage.ts`, `Page.ts` base). Acessam o browser via `getDeviceFromCapabilities('browser')` e usam seletores WebdriverIO (`$`, `$$`).

### `screenobjects/`

- **Papel**: Screen Object Model para telas do app nativo (mobile), organizados por domínio.
- **Estrutura**: `screenobjects/<dominio>/` com telas (ex.: `LoginScreen.ts`, `HomeScreen.ts`) e `screenobjects/<dominio>/components/` (ex.: `TabBar.ts`, `NativeAlert.ts`). Usam seletores nativos (accessibility id, resource-id, etc.) via `lib/Utils` (ex.: `getElementByTestIDApp`).

### `fixtures/`

- **Papel**: funções reutilizáveis entre testes.
- **Arquivo principal**: `index.ts` — exporta `reLaunchApp(emulator)` (encerra e reabre o app no dispositivo/emulador, usando constantes de `test-data/Constants.ts` ou raiz). Outras funções (ex.: fluxo de login no app) podem ser adicionadas aqui.

### `lib/`

- **Papel**: código compartilhado entre testes e config.
- **Arquivos**:
  - `env.ts`: leitura de `BASE_URL`, `FRONTEND_URL`, `BACKEND_URL`, etc.; usado quando o config ou os testes precisam de URLs.
  - `data-factory.ts`: `randomString()`, `randomEmail()`, `randomNumber()` para gerar dados.
  - `Utils.ts`: `getDeviceFromCapabilities(key)` (acesso a browser/mobile no multiremote), helpers de seletores para app (`getElementByTestIDApp`, `getElementByAccessibilityLabelApp`, etc.). A função `reLaunchApp(emulator)` fica em `fixtures/`.

### `test-data/`

- **Papel**: dados de entrada e constantes, organizados por domínio e fluxo.
- **Estrutura**: constantes compartilhadas em `test-data/Constants.ts` com `BUNDLE_ID`, `PACKAGE_NAME` (usados pelo config e por `fixtures/reLaunchApp`); por domínio e fluxo, ex.: `test-data/manager/login/inputs.json`, `messages.json`.

### `apps/`

- **Papel**: binários do app (APK para Android, IPA para iOS) ou placeholder. Os configs Android/iOS referenciam o caminho do app (ex.: `apps/android.wdio.native.app.v1.0.8.apk`).

### Raiz do projeto

- **configs/wdio.\*.conf.ts**: configuração do WebdriverIO; o shared é importado pelos demais.
- **.env.example**: lista de variáveis (ANDROID_DEVICE_NAME, IOS_DEVICE_NAME, FRONTEND_URL, etc.); copiar para `.env` e não commitar.
- **package.json**: scripts `test-android`, `test-ios`, `test-android-headless`, `test-ios-headless`, `test-ci-local`, `build`.

## Localizar o fluxo

- **Onde estão os specs?** → `test/<dominio>/<fluxo>/` (ex.: `test/manager/login/`).
- **Onde estão os dados/constantes?** → `test-data/Constants.ts` e `test-data/<dominio>/<fluxo>/` (ex.: `test-data/manager/login/`).
- **Rodar Android**: `npm run test-android` ou `wdio run ./configs/wdio.android.conf.ts`.
- **Rodar iOS**: `npm run test-ios` ou `wdio run ./configs/wdio.ios.conf.ts`.
