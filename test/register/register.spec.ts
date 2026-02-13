import allureReporter from '@wdio/allure-reporter'

describe('Register in both browser and mobile app', () => {
    beforeEach(() => {
        allureReporter.addEpic('Autenticação');
        allureReporter.addFeature('Cadastro web e app');
        allureReporter.addStory('Cadastro com usuário válido');
        allureReporter.addSeverity('blocker');
        allureReporter.addDescription('Este teste verifica se o cadastro funciona corretamente no browser e no app.');
        allureReporter.addLabel('layer', 'e2e')
        allureReporter.addTag('register')
    })

    it('Perform register in both browser and mobile app sequentially @register @web @app', async () => {
    })

    it('Perform register in both browser and mobile app simultaneously @register @web @app @critical', async () => {
    })
})
