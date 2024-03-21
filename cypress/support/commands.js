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
    cy.findByLabelText("Chart title").type("cats v dogs")
    cy.findByLabelText("X label").type("cats")
    cy.findByLabelText("Y label").type("dogs")
    cy.findByRole("button", { name: "+"}).click()
    cy.findByRole("button", { name: "+"}).click()
    cy.findByTestId("data-1").type('1')
    cy.findByTestId("data-2").type('3')
    cy.findByTestId("data-3").type('2')
    cy.findByTestId("data-4").type('7')
    cy.findByTestId("data-5").type('3')
    cy.findByTestId("data-6").type('15')
})

Cypress.Commands.add("datacheck", function() {
    cy.findByLabelText("Chart title").should("have.value", "cats v dogs")
    cy.findByLabelText("X label").should("have.value", "cats")
    cy.findByLabelText("Y label").should("have.value", "dogs")
    cy.findByTestId("data-1").should("have.value", "1")
    cy.findByTestId("data-2").should("have.value", "3")
    cy.findByTestId("data-3").should("have.value", "2")
    cy.findByTestId("data-4").should("have.value", "7")
    cy.findByTestId("data-5").should("have.value", "3")
    cy.findByTestId("data-6").should("have.value", "15")
})