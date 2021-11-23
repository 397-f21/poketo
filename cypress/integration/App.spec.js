describe('Test App', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('loads with sign in button', () => {
        cy.visit('/');
        cy.get('[data-cy=sign-in]').should('contain', 'Sign In');
    });

    it('bypasses sign in and shows sign out button', () => {
        cy.login();
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=sign-out]').should('contain', 'Sign Out');
    });

    it('creates a task', () => {
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
    });

    afterEach(() => {
        cy.logout();
    });
});

describe('Test task delete button', () => {

    const testTask = "test task";
    const testPokemon = "Charmander";

    it('launches', () => {
        cy.visit('/');
    });

    it('loads with sign in button', () => {
        cy.visit('/');
        cy.get('[data-cy=sign-in]').should('contain', 'Sign In');
    });

    it('bypasses sign in and shows sign out button', () => {
        cy.login();
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=sign-out]').should('contain', 'Sign Out');
    });

    it('creates a task', () => {
        cy.login();
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=add-task]').click();
        cy.get('input[data-cy="task-input"]')
            .type(testTask);
        cy.get(`[data-cy=${testPokemon}-input]`).click();
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=task-name]').should('contain', testTask);
        cy.get('[data-cy=pokemon-name]').should('contain', testPokemon);
    });

    it('deletes a task', () => {
        cy.login();
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();

        cy.get('[data-cy=task-name]').should('contain', testTask);
        cy.get('[data-cy=pokemon-name]').should('contain', testPokemon);

        const delButtonCyName = testTask.replace(' ', '-');

        cy.get(`[data-cy=${testPokemon}-${delButtonCyName}-del-button]`).click();
        cy.get('[data-cy=task-name]').should('not.exist', testTask);
        cy.get('[data-cy=pokemon-name]').should('not.exist', testPokemon);
    });

    afterEach(() => {
        cy.logout();
    });
});