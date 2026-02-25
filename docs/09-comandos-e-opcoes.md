# Comandos e opções

Comandos para rodar os testes WebdriverIO (Android, iOS, headless) e opções de execução.

## Comandos (npm scripts)

Execute na raiz do projeto:

| Comando | Descrição |
|---------|-----------|
| `npm run test-android` | Roda testes no Android (emulador/dispositivo) + browser (Chrome) conforme `wdio.android.conf.ts` |
| `npm run test-ios` | Roda testes no iOS (simulador/dispositivo) + browser conforme `wdio.ios.conf.ts` |
| `npm run test-android-headless` | Roda testes Android com browser em modo headless |
| `npm run test-ios-headless` | Roda testes iOS com browser em modo headless |
| `npm run test-ci-local` | Roda testes com config de CI local (`wdio.ci-local.conf.ts`) |
| `npm run build` | Verifica TypeScript (`tsc --noEmit`) |

### Rodar com o CLI do WebdriverIO

```bash
# Android
wdio run ./configs/wdio.android.conf.ts

# iOS
wdio run ./configs/wdio.ios.conf.ts

# Android headless (browser sem janela)
wdio run ./configs/wdio.android.conf.ts --headless
```

### Rodar um arquivo ou suite específica

O WebdriverIO permite filtrar specs por path ou por nome de suite/teste. Consulte a documentação oficial para as opções exatas (ex.: `--spec`, `--mochaOpts.grep`).

Exemplo (sintaxe pode variar conforme versão):

```bash
wdio run ./configs/wdio.android.conf.ts --spec test/manager/login/login.spec.ts
```

### Rodar só um fluxo

Para executar apenas os testes de um fluxo (pasta em `test/<dominio>/<fluxo>/`):

```bash
# Android — só o fluxo "login" do domínio "manager"
wdio run ./configs/wdio.android.conf.ts --spec test/manager/login/**/*.ts

# iOS — só o fluxo "login" do domínio "manager"
wdio run ./configs/wdio.ios.conf.ts --spec test/manager/login/**/*.ts
```

Substitua `manager` e `login` pelo domínio e nome do fluxo (ex.: `test/partners/checkout/**/*.ts`).

---

## Opções de execução

### `--headless` (browser sem janela)

Os scripts `test-android-headless` e `test-ios-headless` passam `--headless` para a execução; o browser Chrome roda em modo headless (sem abrir janela). Útil em CI ou quando não for necessário ver a interface do browser.

### Configuração de specs

O caminho dos arquivos de teste é definido em `configs/wdio.shared.conf.ts` na propriedade `specs` (ex.: `../test/**/*.ts`). Todos os arquivos em `test/<dominio>/<fluxo>/**/*.ts` são incluídos automaticamente.

---

## Resumo rápido

| Objetivo | Comando |
|----------|---------|
| Rodar testes no Android | `npm run test-android` ou `wdio run ./configs/wdio.android.conf.ts` |
| Rodar testes no iOS | `npm run test-ios` ou `wdio run ./configs/wdio.ios.conf.ts` |
| Rodar só um fluxo | `wdio run ./configs/wdio.android.conf.ts --spec test/<dominio>/<fluxo>/**/*.ts` |
| Rodar Android com browser headless | `npm run test-android-headless` |
| Verificar tipos TypeScript | `npm run build` |
