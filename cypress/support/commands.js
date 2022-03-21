Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('Linhares')
        cy.get('#email').type('email@teste.com')
        cy.get('#open-text-area').type('Olá, tudo bem?')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
})