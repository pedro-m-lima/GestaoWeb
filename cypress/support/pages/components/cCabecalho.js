//Validar cabeçalhos
Cypress.Commands.add('validaCabecalhoTela',(menu, submenu)=>{
  cy.contains('h4', menu, {timeout: 7000}).should('be.visible')
  cy.contains('h4', submenu).should('be.visible')
})