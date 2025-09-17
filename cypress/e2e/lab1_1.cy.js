describe('My first cypress test',()=>{
  beforeEach('go to homepage',()=>{
    cy.visit('https://www.saucedemo.com/');

  });
  before(() => {
    cy.log('>> before: Runs once before all tests')
   
  })

  
 

  
  afterEach(() => {
    cy.log('>> afterEach: Runs after each test')
    
  })

 
  after(() => {
    cy.log('>> after: Runs once after all tests')
    
  })

  it('attributes',()=>{
    cy.visit('https://www.saucedemo.com/');
    cy.title().should('include','Swag');
    cy.get('#user-name').should('exist');
    cy.get('#us').should('not.exist');
    cy.get('#login-button').should('be.visible');
    cy.get('.login_logo').should('have.text','Swag Labs');
    cy.get('.login_logo').should('include.text','Swag');
    cy.get('.login_logo').should('not.have.text','hello');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').should('have.attr', 'placeholder', 'Password');
    cy.get('#password').type('secret_sauce');
   
    cy.get('#login-button').should('be.visible').and('have.value', 'Login').and('not.have.class', 'disabled');
     cy.get('#login-button').click();
     cy.url().should('include','/inventory.html');
     cy.url().should('eq','https://www.saucedemo.com/inventory.html');
     cy.window().should('have.property', 'localStorage');
     cy.viewport('iphone-6');
  });
  it('finding elements',()=>{
    cy.get('#login_button_container').find('.login-box');
    cy.get('#login_button_container').first('div');
    cy.get('#login_button_container').last('div');
    cy.contains('Swag Labs');
  

  });
  it('user actions',()=>{
    cy.get('#user-name',{timeout:10000}).click()
    .type('standard_user')
    .clear()
    .trigger('mouseover').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
    cy.get('.product_sort_container').select('Price (low to high)');





  });
  it('command chaining and control flow',()=>{
    cy.get('#user-name').as('user_name');
    cy.get('@user_name').type('hello');
    cy.get('@user_name').clear();
    cy.get('.login-box').within(() => {
  cy.get('input[name="user-name"]').type('standard_user')
  cy.get('input[name="password"]').type('secret_sauce')
  cy.get('#login-button').click();
})

cy.get('.inventory_item_name').first().then(($el) => {
  const text = $el.text()
  expect(text).to.include('Sauce Labs Backpack')
})


  })
it('Radio button test with cy.origin', () => {
  cy.origin('https://demoqa.com', () => {
    cy.visit('/radio-button')
    cy.on('uncaught:exception', () => false) // ignore site errors
    cy.get('input[type="radio"][id="yesRadio"]').check({ force: true })
    cy.get('.text-success').should('contain', 'Yes')
  })
})
it('checkbox test with cy.origin', () => {
  cy.origin('https://demoqa.com', () => {
    cy.visit('/checkbox')
    cy.on('uncaught:exception', () => false) // ignore site errors
    cy.get('#tree-node-home').check({ force: true })
    cy.get('#tree-node-home').should('be.checked')
  })
})

it('API registration test with failOnStatusCode', () => {
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/register',
    body: {
      email: 'eve.holt@reqres.in',
      password: 'pistol'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(401);
    expect(response.body).to.have.property('error');
  });
});
});
describe('OrangeHRM Login', () => {
 it('should login with custom command', () => {
 cy.login('Admin', 'admin123')
 cy.screenshot('login-image')
 cy.url().should('include', '/dashboard')
 })
});

describe('OrangeHRM Login with Fixture', () => {
 it('should login using fixture data', () => {
 
cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
 
 // This will use the overwritten type command and show console logs
 cy.fixture('users').then((userData) => {
 cy.get('input[name="username"]').type(userData.username);
 // Console: "Typing: 'Admin'"
 
 cy.get('input[name="password"]').type(userData.password);
 // Console: "Typing: 'admin123'"
 });
 
 cy.get('button[type="submit"]').click();
 
 // Verify successful login
 cy.url().should('include', '/dashboard');
 cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
 });
});
describe('OrangeHRM Data-Driven Login Tests', () => {
  const testCases = [
    {
      username: 'Admin',
      password: 'admin123',
      expected: 'success',
      description: 'Valid credentials'
    },
    {
      username: 'InvalidUser',
      password: 'wrongpassword',
      expected: 'invalid',
      description: 'Invalid credentials'
    },
    {
      username: '',
      password: 'admin123',
      expected: 'required-username',
      description: 'Empty username'
    },
    {
      username: 'Admin',
      password: '',
      expected: 'required-password',
      description: 'Empty password'
    }
  ];

  testCases.forEach((testCase) => {
    it(`should handle login for: ${testCase.description}`, () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

      // Wait for login form
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');

      // Fill username if provided
      if (testCase.username) {
        cy.get('input[name="username"]').type(testCase.username);
      }

      // Fill password if provided
      if (testCase.password) {
        cy.get('input[name="password"]').type(testCase.password);
      }

      // Click login
      cy.get('button[type="submit"]').click();

      // Verify outcomes
      if (testCase.expected === 'success') {
        cy.url({ timeout: 10000 }).should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
      }

      if (testCase.expected === 'invalid') {
        cy.get('.oxd-alert-content-text', { timeout: 10000 })
          .should('be.visible')
          .and('contain', 'Invalid credentials');
        cy.url().should('include', '/auth/login');
      }

      if (testCase.expected === 'required-username') {
        cy.get('.oxd-input-field-error-message')
          .should('be.visible')
          .and('contain', 'Required');
      }

      if (testCase.expected === 'required-password') {
        cy.get('.oxd-input-field-error-message')
          .should('be.visible')
          .and('contain', 'Required');
      }
    });
  });
});
