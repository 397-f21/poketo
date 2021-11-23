describe('Test App', () => {
    
    it ('completes a task', () => {
        cy.login();
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=add-task]').click();

        const testTask = "test-task";
        const testPokemon = "Charmander";

        cy.get('input[data-cy="task-input"]')
            .type(testTask);
        cy.get(`[data-cy=${testPokemon}-input]`).click();
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=task-name]').should('contain', testTask);
        cy.get('[data-cy=pokemon-name]').should('contain', testPokemon);
        cy.get('[data-cy=pokemon-level]').should('contain', 'Lv. 1');
        cy.get(`[data-cy=${testTask}]`).click();
        cy.get('[data-cy=pokemon-level]').should('contain', 'Lv. 2');
        cy.get(`[data-cy=delete-${testTask}]`).click();
        cy.logout();
    })

})