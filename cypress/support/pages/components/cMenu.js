Cypress.Commands.add('selecionaMenu', (menu, submenuHref, submenu)=>{
  cy.contains('li div p[class^="MuiTypography-root"]', menu, {timeout:5000})
          .should('be.visible')
          .click()
      cy.get(`a[href="/${submenuHref}"]`)
          .should('have.text', submenu)
          .click()
})