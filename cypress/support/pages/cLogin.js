//Login
Cypress.Commands.add('logar', (usuarioLogin='', senhaLogin='') => {
  cy.visit('/')
  if(usuarioLogin){
    cy.get('#email').type(usuarioLogin)
  }
  if(senhaLogin){
    cy.get('#password').type(senhaLogin)
  }
  cy.get('button[data-testeid="button-click-login"]')
    .should('be.visible')
    .click()

  cy.wait(500)

})

Cypress.Commands.add('validaToast', (tipoToast, mensagemToast) => {
  // Verificar se a mensagem de erro está visível
  cy.get(`[data-type="${tipoToast}"]`).should('be.visible').and('contain', `${mensagemToast}`)
})

Cypress.Commands.add('validaUsuarioLogado', (nomeUser, sobrenomeUser) => {
  cy.get('[data-testid="PersonIcon"]').click()
  cy.get('p.MuiTypography-root.MuiTypography-body1').contains(nomeUser)
  cy.get('p.MuiTypography-root.MuiTypography-body2').contains(sobrenomeUser)
  cy.get('li[role="menuitem"]').contains('Sair').click()
  cy.contains('h4', 'Seja bem vindo').should('be.visible')
})