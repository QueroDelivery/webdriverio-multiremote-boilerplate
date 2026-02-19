# Test data (inputs e constantes)

Os dados de entrada e constantes dos testes ficam em `test-data/`, organizados por **domínio** e fluxo . Isso permite **alterar inputs** em um só lugar e **gerar dados variados** com `lib/data-factory` e builders opcionais.

## Estrutura atual

```
test-data/
├── Constants.ts    # Constantes globais (BUNDLE_ID, PACKAGE_NAME)
└── <dominio>/          # ex.: manager/
    └── <fluxo>/        # ex.: login/
        ├── inputs.json # Dados de login (browser e app)
        └── messages.json  # Mensagens de asserção (ex.: loginSuccessMessage)
```

- **Constants.ts**: em `test-data/`; identificadores do app (bundle ID para iOS, package name para Android), usados pelo config e por `fixtures/reLaunchApp`.
- Por domínio e fluxo: `test-data/<dominio>/<fluxo>/` com `inputs.json`, `messages.json` (opcional) ou `builder.ts`. Exemplo: `test-data/manager/login/` e specs em `test/manager/login/`.

## Estrutura sugerida para novos fluxos

```
test-data/
├── Constants.ts        # constantes globais do app
└── <dominio>/          # ex.: manager, partners
    └── <fluxo>/
        ├── inputs.json # ou inputs.ts
        ├── messages.json  # opcional (mensagens de UI/asserção)
        └── builder.ts  # opcional (geração de dados)
```

- **inputs.json / inputs.ts**: entradas estáticas (um objeto ou vários cenários).
- **builder.ts** (opcional): função que monta um objeto padrão e aceita overrides; pode usar `lib/data-factory` para gerar valores.

## Inserir novos inputs (estáticos)

1. Crie ou edite a pasta do fluxo: `test-data/<dominio>/<fluxo>/` (ou `test-data/<dominio>/api/<fluxo>/`, `test-data/<dominio>/ui/<fluxo>/` se o projeto separar por tipo).
2. Adicione ou altere `inputs.json` (ou `inputs.ts`) e importe nos specs quando fizer sentido (ex.: de `test/manager/login/spec.ts` use `import inputs from '../../../test-data/manager/login/inputs.json'`).

## Gerar dados diferentes (builder + data-factory)

Quando precisar **variar** dados (ex.: email único por execução), use um **builder** que chama `lib/data-factory`:

```ts
// test-data/manager/meufluxo/builder.ts
import { randomEmail } from '../../../lib/data-factory';

export interface FormInput {
  nome: string;
  email: string;
  // ...
}

export function createFormInput(overrides?: Partial<FormInput>): FormInput {
  return {
    nome: 'Maria Silva',
    email: randomEmail(),
    ...overrides,
  };
}
```

## Quando usar o quê

- **Só constantes ou inputs estáticos**: use `test-data/e2e/Constants.ts` (ou raiz) ou `test-data/<dominio>/<fluxo>/inputs.json` e importe no spec (path relativo: ex. `../../../test-data/manager/login/inputs.json` a partir de `test/manager/login/spec.ts`).
- **Precisa variar alguns campos**: crie `builder.ts` usando `randomEmail()`, `randomString()`, etc. de `lib/data-factory` e use o builder no spec.
