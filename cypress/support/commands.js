//Login
Cypress.Commands.add('logar', (usuarioLogin, senhaLogin) => {
    cy.get('#email').type(usuarioLogin)
    cy.get('#password').type(senhaLogin)
    cy.get('button[data-testeid="button-click-login"]').click()
      
  })

Cypress.Commands.add('validaToast', (tipoToast, mensagemToast)=>{
  // Verificar se a mensagem de erro está visível
  cy.get(`[data-type="${tipoToast}"]`)
    .should('be.visible')
    .and('contain', `${mensagemToast}`)
})

//Validar cabeçalhos
Cypress.Commands.add('validaCabecalhoTela',(menu, submenu)=>{
  cy.contains('h4', menu, {timeout: 7000}).should('be.visible')
  cy.contains('h4', submenu).should('be.visible')
})

Cypress.Commands.add('pesquisaEquipe', (nomeEquipe, statusEquipe)=>{
  cy.get('div[data-testid="input-search-localization"] #localization')
    .clear()
    .type(nomeEquipe)
  cy.get('div[data-testid="input-search-localization"] #localization')
    .clear()
    .type(nomeEquipe)
  if(statusEquipe !== 'ATIVO'){
      cy.get('span[data-testid="input-search-is-active"] input[type="checkbox"]')
      .uncheck({force: true})
      .should('not.be.checked')
  }else{
      cy.get('data-testid="input-search-is-active" input[type="checkbox"]')
      .check({force: true})
      .should('be.checked')
  }
  cy.get('[data-testid="button-click-search"]')
      .click()
  cy.wait(500)
})

Cypress.Commands.add('selecionaMenu', (menu, submenuHref, submenu)=>{
  cy.contains('li div p[class^="MuiTypography-root"]', menu, {timeout:5000})
          .should('be.visible')
          .click()
      cy.get(`a[href="/${submenuHref}"]`)
          .should('have.text', submenu)
          .click()
})

Cypress.Commands.add('preencherDadosCadastroEquipe',(nomeEquipe, statusEquipe, obsEquipe)=>{
  cy.get('#name').type(nomeEquipe)
      cy.get('#status').click()
      cy.contains('div ul li[role="option"]', statusEquipe).click()
      cy.get('div[data-testid="input-form-observation"] #observation')
          .type(obsEquipe)
      cy.get('button[data-testid="button-click-save"]').click()
      cy.wait(500)
})