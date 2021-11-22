describe('Test App', () => {

    it('launches', () => {
        cy.visit('/');
    });

    it('loads with sign in button', () => {
        cy.visit('/');
        cy.get('[data-cy=sign-in]').should('contain', 'Sign In');
    });

    it('bypasses sign in and shows sign out button', () => {
        cy.login()
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=sign-out]').should('contain', 'Sign Out');
    });

    it('creates a task', () => {
        cy.login()
        cy.visit('/');
        cy.get('[data-cy=sign-in]').click();
        cy.get('[data-cy=add-task]').click();

        const testTask = "test task";
        cy.get('input[data-cy="task-input"]')
            .type(testTask);
        cy.get('[data-cy=Charmander-input]').click();
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=task-name]').should('contain', testTask);
    });

    afterEach(() => {
        cy.logout();
    });
});