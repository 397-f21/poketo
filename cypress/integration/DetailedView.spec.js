describe('Detailed Task View displays correct information', () => {
    
    it ('login', () => {
        cy.login();
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=add-task]').click();
    })

    it ('check if task created matches task detailed view', () => {
        cy.login();
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=add-task]').click();

        const testTask = "test task";
        const testPokemon = "Charmander";

        cy.get('input[data-cy="task-input"]')
            .type(testTask);
        cy.get(`[data-cy=${testPokemon}-input]`).click();
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=task-name]').should('contain', testTask);
        cy.get('[data-cy=pokemon-name]').should('contain', testPokemon);
        cy.get('[data-cy=pokemon-level]').should('contain', 'Lv. 0');

        const taskCyName = testTask.replace(' ', '-');

        cy.get(`[data-cy=${testPokemon}-${taskCyName}-card]`).click();
        cy.get('[data-cy=display-task-nm]').should('contain', testTask);
        cy.get('[data-cy=display-pokemon-nm]').should('contain', testPokemon);
        cy.get('[data-cy=display-pokemon-lv]').should('contain', 'Level 0');
        cy.logout();
    })

})