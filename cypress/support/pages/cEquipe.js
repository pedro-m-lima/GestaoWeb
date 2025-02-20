Cypress.Commands.add('pesquisaEquipe', (nomeEquipe, statusEquipe) => {
  cy.get('div[data-testid="input-search-localization"] #localization')
    .clear()
    .type(nomeEquipe)
  if (statusEquipe !== 'ATIVO') {
    cy.get('span[data-testid="input-search-is-active"] input[type="checkbox"]')
      .uncheck({ force: true })
      .should('not.be.checked')
  } else {
    cy.get('data-testid="input-search-is-active" input[type="checkbox"]')
      .check({ force: true })
      .should('be.checked')
  }
  cy.get('[data-testid="button-click-search"]')
    .click()
  cy.wait(500)
})

Cypress.Commands.add('preencheDadosCadastroEquipe', (nomeEquipe = '', statusEquipe = '', obsEquipe = '') => {
  cy.get('#name').type(nomeEquipe)
  cy.get('#status').click()
  cy.contains('div ul li[role="option"]', statusEquipe).click()
  cy.get('div[data-testid="input-form-observation"] #observation')
    .type(obsEquipe)
  cy.get('button[data-testid="button-click-save"]').click()
  cy.wait(500)
})

Cypress.Commands.add('limpaCamposEquipe', (nomeEquipe, obsEquipe) => {
  cy.get('#name')
    .should('have.value', nomeEquipe)
    .clear()
    .should('have.value', '')
  cy.get('div[data-testid="input-form-observation"] #observation')
    .should('have.value', obsEquipe)
    .clear()
    .should('have.value', '')
})

Cypress.Commands.add('excluirEquipe', (nomeEquipe) => {
  cy.get('.MuiDataGrid-main div[data-rowindex="0"] div[data-testid^="button-click-remove"]').click()
  cy.get('div [role="dialog"] p')
    .should('include.text', nomeEquipe)
  cy.get('[data-testid="button-click-excluir"]')
    .click()
  cy.validaToast('success', 'Equipe excluída com sucesso')
})