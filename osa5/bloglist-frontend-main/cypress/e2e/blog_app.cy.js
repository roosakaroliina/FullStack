describe('Blog app', function () {
  beforeEach(function () {
    //cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })


  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })
  describe('Login', function () {
    const user = {
      username: 'root',
      password: 'sekret'
    }
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Pääkäyttäjä logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

})