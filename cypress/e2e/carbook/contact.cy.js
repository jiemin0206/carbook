describe('Submit contact form', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('https://carrental.qyalliance.com.au/contact.html')
    })
  
    it('enter user information', () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.
      cy.get('[name=name]').type('Alex')
      cy.get('[name=email]').type('alex@hotmail.com')

      cy.get('[name=phoneNumber]').type('023232')

      cy.get('[name=message]').type('test')
      cy.get('#submitButton').click()

    })
  })