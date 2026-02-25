# Como adicionar um novo teste

Sempre que criar um novo teste, siga o padrão: usar Mocha (`describe`/`it`), importar `expect` de `@wdio/globals`, usar `lib/Utils` para acessar browser/mobile e, quando fizer sentido, dados de `test-data` ou fixtures.

## Teste no browser (web)

1. **Onde:** em `test/<dominio>/<fluxo>/` (ex.: `test/manager/login/login.spec.ts`). O config shared usa `../test/**/*.ts`. Domínios: app-cliente, log, manager, partners.
2. **Import:** `expect` de `@wdio/globals`; Page Objects de `pageobjects/<dominio>/` ou `getDeviceFromCapabilities('browser')` de `lib/Utils`.
3. **Dados:** importe de `test-data/<dominio>/<fluxo>/` quando houver (ex.: `../../../test-data/manager/login/inputs.json`); senão defina no próprio spec.
4. **Acesso ao browser:** use `getDeviceFromCapabilities('browser')` ou a Page Object que já o utiliza (ex.: `LoginPage`, `SecurePage`).

### Exemplo mínimo (browser)

```ts
// test/manager/login/login.spec.ts
import { expect } from '@wdio/globals'
import LoginPage from '../../../pageobjects/manager/LoginPage'
import SecurePage from '../../../pageobjects/manager/SecurePage'

describe('Login no browser', () => {
    it('deve fazer login e exibir mensagem de sucesso', async () => {
        await LoginPage.open()
        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining('You logged into a secure area!'))
    })
})
```

---

## Teste no app (mobile)

1. **Onde:** em `test/<dominio>/<fluxo>/` (ex.: `test/manager/login/login-app.spec.ts`).
2. **Import:** `expect` de `@wdio/globals`; Screen Objects ou `getDeviceFromCapabilities('mobile')` e helpers de `lib/Utils`.
3. **Acesso ao app:** use `getDeviceFromCapabilities('mobile')` ou as Screen Objects (ex.: `TabBar`, `LoginScreen`, `NativeAlert`).

### Exemplo mínimo (app)

```ts
// test/manager/login/login-app.spec.ts
import { expect } from '@wdio/globals'
import TabBar from '../../../screenobjects/manager/components/TabBar'
import LoginScreen from '../../../screenobjects/manager/LoginScreen'
import NativeAlert from '../../../screenobjects/manager/components/NativeAlert'

describe('Login no app', () => {
    it('deve exibir alerta de sucesso após login', async () => {
        await TabBar.waitForTabBarShown()
        await TabBar.openLogin()
        await LoginScreen.waitForIsShown(true)
        await LoginScreen.tapOnLoginContainerButton()
        await LoginScreen.submitLoginForm({ username: 'test@webdriver.io', password: 'Test1234!' })
        await NativeAlert.waitForIsShown()
        await expect(await NativeAlert.text()).toContain('Success')
    })
})
```

---

## Teste E2E (browser + app no mesmo teste)

1. **Onde:** em `test/<dominio>/<fluxo>/` (ex.: `test/manager/login/login.spec.ts` — o fluxo login pode fazer browser e app no mesmo arquivo).
2. **Import:** `expect` de `@wdio/globals`; `getDeviceFromCapabilities` de `lib/Utils`; `reLaunchApp` de `fixtures`; Page Objects e Screen Objects conforme necessário.
3. **Fluxo:** pode rodar passos no browser e no app em sequência ou em paralelo (`Promise.all`).

### Exemplo (browser e app)

```ts
// test/manager/login/login.spec.ts (exemplo simplificado)
import { expect } from '@wdio/globals'
import { getDeviceFromCapabilities } from 'lib/Utils'
import { reLaunchApp } from 'fixtures'
import LoginPage from '../../../pageobjects/manager/LoginPage'
import SecurePage from '../../../pageobjects/manager/SecurePage'
import TabBar from '../../../screenobjects/manager/components/TabBar'
import LoginScreen from '../../../screenobjects/manager/LoginScreen'
// ...

describe('E2E browser e app', () => {
    it('login no browser e no app em paralelo', async () => {
        const emulator = getDeviceFromCapabilities('mobile')
        const browser = getDeviceFromCapabilities('browser')
        await Promise.all([
            browser.reloadSession(),
            reLaunchApp(emulator),
        ])
        // ... login no browser e no app
    })
})
```

---

## Allure

Para relatórios mais elaborados, use o Allure Reporter: importe `allureReporter` de `@wdio/allure-reporter`, defina `addEpic`, `addFeature` e `addStory` (por exemplo em `beforeEach`) e envolva blocos lógicos em `allureReporter.step('nome do passo', async () => { ... })`. Ver [10-allure-reporter.md](10-allure-reporter.md).

---

## Checklist rápido

- [ ] Arquivo em `test/<dominio>/<fluxo>/` com extensão `.ts` (ex.: `test/manager/login/meuteste.spec.ts`; o config usa `../test/**/*.ts`).
- [ ] Import de `expect` de `@wdio/globals`.
- [ ] Uso de `getDeviceFromCapabilities('browser')` ou `getDeviceFromCapabilities('mobile')` quando precisar da sessão diretamente; caso contrário, use Page Objects / Screen Objects.
- [ ] Dados em `test-data` quando houver inputs reutilizáveis; builder quando precisar variar.
- [ ] Nome do teste descritivo (cenário + resultado esperado).
- [ ] Arrange-Act-Assert quando ajudar na leitura.
- [ ] (Recomendado) Allure: epic/feature/story e `allureReporter.step()` para passos lógicos — ver [10-allure-reporter.md](10-allure-reporter.md).
