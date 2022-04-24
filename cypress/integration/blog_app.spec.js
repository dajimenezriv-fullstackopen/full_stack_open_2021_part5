/* eslint prefer-arrow-callback: [ "off" ] */
/* eslint func-names: [ "off" ] */

// if we have to use a component many times we can save it in a variable
// cy.contains('second note').parent().find('button').as('theButton');
// cy.get('@theButton').click();

// the only way to look at the output of cypress commands is with then
// cypress always return promises

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'rootName',
      username: 'root',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('username');
    cy.contains('password');
  });

  // if we put it.only, only runs that test
  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login_button').click();
    cy.contains('invalid username or password');
    // get the component by the classname
    cy.get('.Error')
      .contains('invalid username or password')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)');

    cy.get('html').should('not.contain', 'root logged in');
  });

  it('user can login', function () {
    cy.get('#username').type('root');
    cy.get('#password').type('password');
    cy.get('#login_button').click();
    cy.contains('root logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      // custom command in support/commands.js
      cy.login({ username: 'root', password: 'password' });
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('new blog');
      cy.get('#author').type('cypress');
      cy.get('#url').type('nothing');
      cy.get('#create_button').click();
      cy.contains('new blog cypress');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'new blog',
          author: 'cypress command',
          url: 'nothing',
        });
      });

      it('users can like a blog', function () {
        cy.contains('view').click();
        cy.get('.Blog').should('contain', 'likes 0');
        cy.get('#like_button').click();
        cy.get('.Blog').should('not.contain', 'likes 0');
        cy.get('.Blog').should('contain', 'likes 1');
      });

      it('user that created the blog can delete it', function () {
        cy.contains('view').click();
        cy.contains('delete').click();
        cy.visit('http://localhost:3000');
        cy.get('html').should('not.contain', 'new blog cypress');
      });
    });

    describe('multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'new blog1', author: 'cypress command', url: 'nothing' });
        cy.createBlog({ title: 'new blog2', author: 'cypress command', url: 'nothing' });
        cy.createBlog({ title: 'new blog3', author: 'cypress command', url: 'nothing' });
      });

      it('blogs sorted by likes', function () {
        cy.contains('new blog1').parent().find('button').click();
        cy.get('#like_button').click();
        cy.get('#hide_button').click();

        cy.contains('new blog2').parent().find('button').click();
        cy.get('#like_button').click();
        cy.get('#like_button').click();
        cy.get('#like_button').click();
        cy.get('#like_button').click();
        cy.get('#hide_button').click();

        cy.contains('new blog3').parent().find('button').click();
        cy.get('#like_button').click();
        cy.get('#like_button').click();
        cy.get('#hide_button').click();

        cy.visit('http://localhost:3000');

        cy.get('.Blog').eq(0).should('contain', 'new blog2');
        cy.get('.Blog').eq(1).should('contain', 'new blog3');
        cy.get('.Blog').eq(2).should('contain', 'new blog1');
      });
    });
  });
});
