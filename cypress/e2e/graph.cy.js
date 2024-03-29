describe('testing chart making', () => {
  it('enters data and creates graph', () => {
    cy.visit('/')
    cy.findByRole("link", { name: "Line"}).click()
    cy.url().should("contain", "line")
    cy.data()
    cy.findByRole("button", { name: "Generate chart"}).click()
    cy.findByRole("img").should('exist')
  })

  it('enters data and data stays after changing graph type', () => {
    cy.visit('/')
    cy.findByRole("link", { name: "Line"}).click()
    cy.data()
    cy.findByRole("link", { name: "Scatter"}).click()
    cy.findByLabelText("Chart title").should("have.value", "cats v dogs")
    cy.findByLabelText("X label").should("have.value", "cats")
    cy.findByLabelText("Y label").should("have.value", "dogs")
    cy.findByTestId("data-1").should("have.value", "1")
    cy.findByTestId("data-2").should("have.value", "3")
    cy.findByRole("link", { name: "Bar"}).click()
    cy.findByLabelText("Chart title").should("have.value", "cats v dogs")
    cy.findByLabelText("X label").should("have.value", "cats")
    cy.findByLabelText("Y label").should("have.value", "dogs")
    cy.findByTestId("data-3").should("have.value", "2")
    cy.findByTestId("data-4").should("have.value", "7")
    cy.findByRole("link", { name: "Line"}).click()
    cy.findByLabelText("Chart title").should("have.value", "cats v dogs")
    cy.findByLabelText("X label").should("have.value", "cats")
    cy.findByLabelText("Y label").should("have.value", "dogs")
    cy.findByTestId("data-5").should("have.value", "3")
    cy.findByTestId("data-6").should("have.value", "15")
  })

  it('creates and saves graph to gallery', () => {
    cy.visit('/')
    cy.findByRole("link", { name: "Line"}).click()
    cy.data()
    cy.findByRole("button", { name: "Generate chart"}).click()
    cy.findByRole("button", { name: "Save chart"}).click()
    cy.findByRole("link", { name: "Gallery"}).click()
    cy.findByText("cats v dogs").should("exist")
  })

  it('reopens previously saved chart from gallery', () => {
    cy.visit('/')
    cy.findByRole("link", { name: "Line"}).click()
    cy.data()
    cy.findByRole("button", { name: "Generate chart"}).click()
    cy.findByRole("button", { name: "Save chart"}).click()
    cy.findByRole("link", { name: "Gallery"}).click()
    cy.findByRole("img", { name: "cats v dogs"}).click()
    cy.findByRole("img").should('exist')
    cy.url().should("contain", "line")
    cy.datacheck()
  })
})