Cypress.on('uncaught:exception', (err, runnable) => {
        // Impede que falhas não tratadas de exceções falhem o teste
        return false;
  });
  
describe('Cadastro de equipe',()=>{

    beforeEach(()=>{
        cy.visit('/')
        cy.logar('devgestao@mercosistem.com.br', '123456')
    })

    it('Cadastrar equipe situação Ativa', ()=>{
        //Arrange
        const dadosEquipe = {
            nomeEquipe: 'EQUIPE AUT INCLUI ATIVA',
            statusEquipe: 'ATIVO',
            obsEquipe: 'OBSERVACAO EQUIPE AUTOMACAO'
        }
        
        cy.selecionaMenu('Cadastros', 'teams', 'Equipes')
        cy.validaCabecalhoTela('Equipes', 'Consulta'); 

        //Act
        cy.get('button[data-testid="button-click-new-register"]')
            .click()
        cy.wait(500)
        cy.validaCabecalhoTela('Equipes', 'Novo Cadastro');
        cy.get('#name').type(dadosEquipe.nomeEquipe)
        cy.get('#status').click()
        cy.contains('div ul li[role="option"]', dadosEquipe.statusEquipe).click()
        cy.get('div[data-testid="input-form-observation"] #observation')
            .type(dadosEquipe.obsEquipe)
        cy.get('button[data-testid="button-click-save"]')
            .click()
        cy.wait(500)
        cy.validaToast('success', 'Equipe salva com sucesso')
        cy.validaCabecalhoTela('Equipes', 'Consulta');

        /////Assert
        cy.pesquisaEquipe(dadosEquipe.nomeEquipe)
        cy.get('.MuiDataGrid-main div[data-rowindex="0"]')
            .should('include.text', dadosEquipe.nomeEquipe)

        //Arrange
        cy.excluirEquipe(dadosEquipe.nomeEquipe)
    })

    it('Cadastrar equipe situação Inativa', ()=>{
        //Arrange
        const dadosEquipe = {
            nomeEquipe: 'EQUIPE AUT INCLUI INATIVA',
            statusEquipe: 'INATIVO',
            obsEquipe: 'OBSERVACAO EQUIPE AUTOMACAO'
        }
        cy.selecionaMenu('Cadastros', 'teams', 'Equipes')
        cy.validaCabecalhoTela('Equipes', 'Consulta')

        //Act
        cy.get('button[data-testid="button-click-new-register"]')
            .click()
        cy.wait(500)
        cy.validaCabecalhoTela('Equipes', 'Novo Cadastro');
        cy.get('#name').type(dadosEquipe.nomeEquipe)
        cy.get('#status').click()
        cy.contains('div ul li[role="option"]', dadosEquipe.statusEquipe).click()
        cy.get('div[data-testid="input-form-observation"] #observation')
            .type(dadosEquipe.obsEquipe)
        cy.get('button[data-testid="button-click-save"]')
            .click()
        cy.wait(500)
        cy.validaToast('success', 'Equipe salva com sucesso')
        cy.validaCabecalhoTela('Equipes', 'Consulta');

        //Assert
        cy.pesquisaEquipe(dadosEquipe.nomeEquipe, dadosEquipe.statusEquipe)
        
        cy.get('[data-testid="button-click-search"]')
            .click()
        cy.wait(500)
        cy.get('.MuiDataGrid-main div[data-rowindex="0"]')
            .should('include.text', dadosEquipe.nomeEquipe)

        //Arrange
        cy.excluirEquipe(dadosEquipe.nomeEquipe)

    })

    it('Alterar cadastro de Equipe', ()=>{
        //Arrange
        const dadosEquipe = {
            nomeEquipe: 'TESTE EQUIPE AUT ALTERACAO',
            statusEquipe: 'ATIVO',
            obsEquipe: 'OBSERVACAO EQUIPE AUTOMACAO ALTERAÇÃO',
            nomeEquipeAlterada: 'TESTE EQUIPE AUT ALTERADA',
            obsEquipeAlterada: 'OBSERVACAO EQUIPE AUTOMACAO ALTERADA',
            statusEquipeAlterada: 'ATIVO'
        }
        cy.selecionaMenu('Cadastros', 'teams', 'Equipes')
        cy.validaCabecalhoTela('Equipes', 'Consulta'); 
        cy.get('button[data-testid="button-click-new-register"]')
            .click();
        cy.wait(500);
        cy.validaCabecalhoTela('Equipes', 'Novo Cadastro');
        cy.preencherDadosCadastroEquipe(dadosEquipe.nomeEquipe, dadosEquipe.statusEquipe, dadosEquipe.obsEquipe);
        cy.validaToast('success', 'Equipe salva com sucesso');
        cy.validaCabecalhoTela('Equipes', 'Consulta');
        cy.pesquisaEquipe(dadosEquipe.nomeEquipe)
        cy.get('.MuiDataGrid-main div[data-rowindex="0"]')
            .should('include.text', dadosEquipe.nomeEquipe)
        
        //Act
        cy.get('.MuiDataGrid-main div[data-rowindex="0"] div[data-testid^="button-click-edit"]').click()
        cy.validaCabecalhoTela('Equipes', 'Consulta');
        cy.get('#name')
            .should('have.value', dadosEquipe.nomeEquipe)  
            .clear()
            .should('have.value', '') 
            .type(dadosEquipe.nomeEquipeAlterada)
        cy.get('#status').click()
        cy.contains('div ul li[role="option"]', dadosEquipe.statusEquipeAlterada).click()
        cy.get('div[data-testid="input-form-observation"] #observation')
            .type(dadosEquipe.obsEquipeAlterada)
        cy.get('button[data-testid="button-click-save"]').click()
        cy.wait(500)
        cy.validaToast('success', 'Equipe salva com sucesso')
        cy.validaCabecalhoTela('Equipes', 'Consulta');

        //Assert
        cy.pesquisaEquipe(dadosEquipe.nomeEquipeAlterada)
        cy.get('.MuiDataGrid-main div[data-rowindex="0"]')
            .should('include.text', dadosEquipe.nomeEquipeAlterada)

        //arrange
        cy.excluirEquipe(dadosEquipe.nomeEquipeAlterada)
    })

    it('Excluir cadastro de Equipe', ()=>{
        //Arrange
        const dadosEquipe = {
            nomeEquipe: 'TESTE EQUIPE AUT EXCLUSÃO',
            statusEquipe: 'ATIVO',
            obsEquipe: 'OBSERVACAO EQUIPE AUTOMACAO EXCLUSÃO',
        }

        cy.selecionaMenu('Cadastros', 'teams', 'Equipes')
        cy.validaCabecalhoTela('Equipes', 'Consulta'); 
        
        cy.get('button[data-testid="button-click-new-register"]')
            .click();
        cy.wait(500);
        cy.validaCabecalhoTela('Equipes', 'Novo Cadastro');
        cy.preencherDadosCadastroEquipe(dadosEquipe.nomeEquipe, dadosEquipe.statusEquipe, dadosEquipe.obsEquipe);
        cy.validaToast('success', 'Equipe salva com sucesso');
        cy.validaCabecalhoTela('Equipes', 'Consulta');
        
        cy.pesquisaEquipe(dadosEquipe.nomeEquipe)
        cy.get('.MuiDataGrid-main div[data-rowindex="0"]')
            .should('include.text', dadosEquipe.nomeEquipe)

        //Act
        cy.excluirEquipe(dadosEquipe.nomeEquipe)
        
        //Assert
        cy.pesquisaEquipe(dadosEquipe.nomeEquipe)
        cy.get('.MuiDataGrid-main .MuiDataGrid-overlay')
            .should('have.text', 'Sem Resultados.')
        //*/

    })
    
})

Cypress.Commands.add('excluirEquipe', (nomeEquipe)=>{
    cy.get('.MuiDataGrid-main div[data-rowindex="0"] div[data-testid^="button-click-remove"]').click()
        cy.get('div [role="dialog"] p')
            .should('include.text', nomeEquipe)
        cy.get('[data-testid="button-click-excluir"]')
            .click()
        cy.validaToast('success', 'Equipe excluída com sucesso')
})