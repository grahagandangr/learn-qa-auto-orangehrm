class LoginPage {
  // Locators
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    submitButton: () => cy.get('button[type="submit"]'),
    forgotPasswordLink: () => cy.contains('Forgot your password'),
    alertContent: () => cy.get('.oxd-alert-content'),
    alertText: () => cy.get('.oxd-alert-content-text'),
    inputGroupMessage: () => cy.get('.oxd-input-group__message'),
    loginBranding: () => cy.get('.orangehrm-login-branding'),
    loginTitle: () => cy.get('.oxd-text--h5'),
  };

  // URL
  url = 'https://opensource-demo.orangehrmlive.com';

  // Visit the login page
  visit() {
    cy.visit(this.url);
  }

  // Clear browser cache
  clearCache() {
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Network.clearBrowserCache',
      })
    );
  }

  // Wait for login page image to load
  waitForPageImage() {
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);
  }

  // Set up login API intercept
  interceptLoginRequest() {
    cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');
  }

  // Wait for login request and verify response
  waitForLoginRequest(expectedStatus = 302) {
    cy.wait('@loginRequest').its('response.statusCode').should('eq', expectedStatus);
  }

  // Enter username
  enterUsername(username) {
    this.elements.usernameInput().type(username);
  }

  // Enter password
  enterPassword(password) {
    this.elements.passwordInput().type(password);
  }

  // Click submit button
  clickSubmit() {
    this.elements.submitButton().click();
  }

  // Login with credentials
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickSubmit();
  }

  // Login with credentials and wait for request
  loginAndWait(username, password, expectedStatus = 302) {
    this.login(username, password);
    this.waitForLoginRequest(expectedStatus);
  }

  // Click forgot password link
  clickForgotPassword() {
    this.elements.forgotPasswordLink().click();
  }

  // Verify error message
  verifyErrorMessage(message = 'Invalid credentials') {
    this.elements.alertContent().should('be.visible');
    this.elements.alertText().should('contain', message);
  }

  // Verify required field messages
  verifyRequiredFieldMessages(count = 2) {
    this.elements.inputGroupMessage().should('have.length', count);
    this.elements.inputGroupMessage().each(($el) => {
      cy.wrap($el).should('contain', 'Required');
    });
  }

  // Verify single required field message
  verifyRequiredFieldMessage() {
    this.elements.inputGroupMessage().should('be.visible');
    this.elements.inputGroupMessage().should('contain', 'Required');
  }

  // Verify password field is hidden
  verifyPasswordIsHidden() {
    this.elements.passwordInput().should('have.attr', 'type', 'password');
  }

  // Verify password value
  verifyPasswordValue(expectedValue) {
    this.elements.passwordInput().invoke('val').should('eq', expectedValue);
  }

  // Verify URL contains login path
  verifyLoginUrl() {
    cy.url().should('include', '/auth/login');
  }

  // Verify all UI elements are visible
  verifyUIElements() {
    this.elements.usernameInput().should('be.visible');
    this.elements.passwordInput().should('be.visible');
    this.elements.submitButton().should('be.visible');
    this.elements.forgotPasswordLink().should('be.visible');
    this.elements.loginBranding().should('be.visible');
    this.elements.loginTitle().should('contain', 'Login');
  }

  // Verify forgot password page
  verifyForgotPasswordPage() {
    cy.url().should('include', '/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password');
  }
}

export default LoginPage;
