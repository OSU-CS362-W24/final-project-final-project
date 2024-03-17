// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require("@testing-library/cypress/add-commands")

Cypress.Commands.add("data", function() {
    cy.findByRole("button", { name: "+"}).click()
    cy.findByRole("button", { name: "+"}).click()
    cy.findByTestId("data-1").type('1')
    cy.findByTestId("data-2").type('3')
    cy.findByTestId("data-3").type('2')
    cy.findByTestId("data-4").type('7')
    cy.findByTestId("data-5").type('3')
    cy.findByTestId("data-6").type('15')
})