describe('Completing task at level 21 evolves Pokemon', () => {
    
    it ('completes a task', () => {
        cy.login();
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=add-task]').click();

        const testTask = "test-task";
        const testStartPokemon = "Charmander";
        const testEndPokemon = "Charmeleon";

        cy.get('input[data-cy="task-input"]')
            .type(testTask);
        cy.get(`[data-cy=${testStartPokemon}-input]`).click();
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=task-name]').should('contain', testTask);
        cy.get('[data-cy=pokemon-name]').should('contain', testStartPokemon);
        cy.get('[data-cy=pokemon-level]').should('contain', 'Lv. 1');
        cy.get('[data-cy=pokemon-level]').inoke('attr', 'pokemon-level', 'Lv. 21');
        cy.get('[data-cy=pokemon-level]').should('contain', 'Lv. 21');
        cy.get('[data-cy=pokemon-name]').should('contain', testEndPokemon);
        cy.get(`[data-cy=${testEndPokemon}-${testTask}-del-button]`).click();
        cy.logout();
    })

})