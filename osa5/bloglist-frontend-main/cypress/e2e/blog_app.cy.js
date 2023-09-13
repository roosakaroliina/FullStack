describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Käyttäjä',
      username: 'kayttajanimi',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')

  })


  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })
  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('kayttajanimi')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Käyttäjä logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('kayttis')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('kayttajanimi')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })
    const newBlog = {
      title: 'Book Club',
      author: 'J. C. Aniston',
      url: 'www.blogger.com/bookclub'
    }

    it('A blog can be created', function() {
      cy.get('#newblog').click()
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#create-button').click()

      cy.contains(newBlog.title + ' ' + newBlog.author)
    })

    it('A blog can be liked', function() {
      cy.get('#newblog').click()
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#create-button').click()
      cy.contains('view').click()
      cy.get('#likebutton').click()
      cy.contains('likes: 1')
      
    })
  })

})