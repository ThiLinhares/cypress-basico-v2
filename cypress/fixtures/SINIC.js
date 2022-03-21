it('Teste SINIC',  function() {

    cy.visit('https://sociofortaleza.com.br')
    cy.contains('Login').click()

    cy.get('#user_email').type('Thiago')
    cy.get('#user_password').type('Thiago1')

    cy.get('#user_email').invoke('text').then(($text1) => {
        cy.get('#user_password').invoke('text').then(($text2) => { 
          expect($text1).to.equal($text2)
        })
      })