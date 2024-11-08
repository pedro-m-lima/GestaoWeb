describe('Lista de preço', ()=>{

    beforeEach(()=>{
        cy.visit('/')
        cy.logar('devgestao@mercosistem.com.br', '123456')
    })

    it('Cadastrar Lista de Preço situação Ativa', ()=>{
        const dadosListaPreco = {
            descricaoListaPreco: "LISTA DE PREÇO AUT INCLUSAO",
            FatorMultiListaPreco: "11.5555",
            statusListaPreco: "ATIVO"
        }
        //Arrange
        cy.selecionaMenu('Cadastros', 'priceLists', 'Listas de Preço')
        cy.validaCabecalhoTela('Listas de Preço', 'Consulta');

        cy.contains('.MuiButtonBase-root', 'Novo Cadastro')
            .click()
        cy.wait(500)
        cy.validaCabecalhoTela('Listas de Preço', 'Novo Cadastro');

        //act
        cy.get('[data-testid="input-form-description"] #description')
            .type(dadosListaPreco.descricaoListaPreco);
        cy.get('[data-testid="input-products-gross-weight"] #factor')
            .should('have.value', '1,0000')
            .clear()
            .type(dadosListaPreco.FatorMultiListaPreco)
        cy.get('[data-testid="input-form-status"] #status')
            .click()
        cy.contains('div ul li[role="option"]', dadosListaPreco.statusListaPreco).click()

        cy.get('button[data-testid="button-click-save"]').click()
        cy.wait(500)
        cy.validaToast('success', 'Lista de Preço salva com sucesso')
        cy.validaCabecalhoTela('Listas de Preço', 'Consulta');

    })

})