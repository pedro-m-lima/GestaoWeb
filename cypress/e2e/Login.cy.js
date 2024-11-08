Cypress.on('uncaught:exception', (err, runnable) => {
  // Impede que falhas não tratadas de exceções falhem o teste
  return false;
});


describe('Login', () => {
  
  beforeEach(()=>{
    cy.visit('/')
    // Interceptar a requisição POST da API antes de preencher o formulário
    //cy.intercept('POST', 'https://usuario.api.dev.mercosistem.app/login').as('loginRequest');  

  })

  it('Tentar realizar login sem informar dados de acesso', ()=> {

    cy.get('button[data-testeid="button-click-login"]')
      .click()
    cy.wait(500)
    cy.contains('#email-helper-text', 'Email é obrigatório')
    cy.contains('#password-helper-text', 'Este campo é obrigatório')

  });


  it('Tentar realizar login informando senha inválida', ()=> {

    cy.logar('devgesta@mercosistem.com.br', '1234')
    cy.wait(500)
    cy.validaToast('error', 'Usuário ou senha inválidos')

  });

  it('Realiar login com sucesso', () => {
    cy.logar('devgestao@mercosistem.com.br', '123456')
    //Validar usuário logado
    cy.get('[data-testid="PersonIcon"]').click()
    cy.get('p.MuiTypography-root.MuiTypography-body1')
      .contains('API')
    cy.get('p.MuiTypography-root.MuiTypography-body2')    
      .contains('Admin')
    cy.get('li[role="menuitem"]')
      .contains('Sair')
      .click()
    cy.contains('h4', 'Seja bem vindo')
      .should('be.visible')
  })

});