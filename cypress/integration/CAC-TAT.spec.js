/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })


    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Linhares')
        cy.get('#email').type('email@teste.com')
        cy.get('#open-text-area').type('Olá, tudo bem?')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Linhares')
        cy.get('#email').type('email.teste.com')
        cy.get('#product').select('Cursos')
        cy.get('#open-text-area').type('Olá, tudo bem?', { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong').should('be.visible')
    })

    it('telefone só aceita números', function () {
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Linhares')
        cy.get('#email').type('email@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Olá, tudo bem?')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Thiago').should('have.value', 'Thiago')
            .clear().should('have.value', '')
        cy.get('#lastName')
            .type('Linhares').should('have.value', 'Linhares')
            .clear().should('have.value', '')
        cy.get('#email')
            .type('email@teste.com').should('have.value', 'email@teste.com')
            .clear().should('have.value', '')
        cy.get('#phone')
            .type('9999999').should('have.value', '9999999')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })


    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type=radio][value=feedback]')
            .check()
            .should('be.checked')
    })


    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) { //each é pra cada opção
                cy.wrap($radio).check() //wrap vai pegar cada uma opção e fazer a ação
                cy.wrap($radio).should('be.checked')
            })
    })


    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.be.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.be.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }) //a action simula o dragdrop
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile') //cria um alias pro arquivo
        cy.get('#file-upload')
            .should('not.be.value')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('', function(){
        
    })




})