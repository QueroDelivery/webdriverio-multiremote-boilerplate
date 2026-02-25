# Visão geral

Este repositório é o padrão de automação de testes QA com **WebdriverIO** (E2E em browser e app nativo via Appium). Um único runner, estrutura de pastas definida, Page Objects / Screen Objects e suporte a multiremote (browser + dispositivo móvel no mesmo teste).

## Objetivos

- **WebdriverIO + Appium**: testes em browser (Chrome) e em app nativo (Android/iOS) com Mocha como framework de teste.
- **Multiremote**: capacidade de rodar no mesmo teste sessões de browser e de app (ex.: login no browser e no app em paralelo).
- **Estrutura clara (por domínio)**: specs em `test/<dominio>/<fluxo>/` (ex.: `test/manager/login/`), Page Objects em `pageobjects/<dominio>/`, Screen Objects em `screenobjects/<dominio>/` (e `screenobjects/<dominio>/components/`), helpers em `lib/`.
- **Fixtures reutilizáveis**: funções como `loginFixture` em `fixtures/` para fluxos comuns (ex.: login no app).
- **Dados e ambiente**: `test-data/` para constantes e inputs por fluxo; `lib/env.ts` e `lib/data-factory.ts` para baseURL e geração de dados.

## Fluxo de uso

1. **Configuração**: variáveis de ambiente (opcional) em `.env`; configs em `configs/wdio.*.conf.ts` (shared, android, ios, sauce).
2. **Testes**: specs em `test/<dominio>/<fluxo>/` (ex.: `test/manager/login/`) usam `describe`/`it` (Mocha), importam `expect` de `@wdio/globals`, Page Objects / Screen Objects e `lib/Utils` (ex.: `getDeviceFromCapabilities`) para acessar browser ou mobile.
3. **Execução**: `npm run test-android`, `npm run test-ios`, ou `wdio run ./configs/wdio.android.conf.ts` (e variantes headless).

## Documentação por seção

- [02 - Estrutura de diretórios](02-estrutura-de-diretórios.md)
- [03 - Fixtures](03-fixtures.md)
- [04 - Test data (inputs e builders)](04-test-data.md)
- [05 - Lib (env, data-factory, Utils)](05-lib.md)
- [06 - Como adicionar um novo teste](06-como-adicionar-novo-teste.md)
- [07 - Como adicionar um novo fluxo](07-como-adicionar-novo-fluxo.md)
- [08 - Ambiente e configuração](08-ambiente-e-configuração.md)
- [09 - Comandos e opções](09-comandos-e-opcoes.md)
