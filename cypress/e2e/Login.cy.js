Cypress.on('uncaught:exception', (err, runnable) => {
  // Impede que falhas não tratadas de exceções falhem o teste
  return false;
});

const credenciais = {
  emailValido: 'devgestao@mercosistem.com.br',
  senhaValida: '123456',
  senhaInvalida: '1234'
};

describe('Login', () => {

  it('Tentar realizar login sem informar dados de acesso', ()=> {
    cy.logar()
    cy.contains('#email-helper-text', 'Email é obrigatório').should('be.visible')
    cy.contains('#password-helper-text', 'Este campo é obrigatório').should('be.visible')
  });


  it('Tentar realizar login informando senha inválida', ()=> {
    cy.logar(credenciais.emailValido, credenciais.senhaInvalida)
    cy.validaToast('error', 'Usuário ou senha inválidos')

  });

  it('Realiar login com sucesso', () => {
    cy.logar(credenciais.emailValido, credenciais.senhaValida)
    cy.validaUsuarioLogado('API', 'Admin')
  })

});