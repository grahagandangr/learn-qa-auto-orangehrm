class ForgotPasswordPage {
  // Locators
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    cancelButton: () => cy.get('button[type="button"]').contains('Cancel'),
    resetPasswordButton: () => cy.get('button[type="submit"]'),
    resetPasswordTitle: () => cy.get('.orangehrm-forgot-password-title'),
    resetPasswordSubtitle: () => cy.get('.orangehrm-forgot-password-subtitle'),
    inputGroupMessage: () => cy.get('.oxd-input-group__message'),
  };

  // URL
  url = 'https://opensource-demo.orangehrmlive.com';

  // Visit the forgot password page
  visit() {
    cy.visit(`${this.url}/web/index.php/auth/requestPasswordResetCode`);
  }

  // Visit from login page
  visitFromLogin() {
    cy.visit(this.url);
    this.clickForgotPasswordLink();
  }

  // Click forgot password link from login page
  clickForgotPasswordLink() {
    cy.contains('Forgot your password').click();
  }

  // Wait for forgot password page image to load
  waitForPageImage() {
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('forgotPasswordPageImage');
    cy.wait('@forgotPasswordPageImage').its('response.statusCode').should('eq', 200);
  }

  // Enter username
  enterUsername(username) {
    this.elements.usernameInput().type(username);
  }

  // Clear username field
  clearUsername() {
    this.elements.usernameInput().clear();
  }

  // Click cancel button
  clickCancel() {
    this.elements.cancelButton().click();
  }

  // Click reset password button
  clickResetPassword() {
    this.elements.resetPasswordButton().click();
  }

  // Reset password with username
  resetPassword(username) {
    this.enterUsername(username);
    this.clickResetPassword();
  }

  // Reset password with username and wait for request
  resetPasswordAndWait(username, expectedStatus = 200) {
    this.resetPassword(username);
    this.waitForResetPasswordRequest(expectedStatus);
  }

  // Verify forgot password page URL
  verifyForgotPasswordUrl() {
    cy.url().should('include', '/requestPasswordResetCode');
  }

  // Verify reset password page loaded
  verifyForgotPasswordPageLoaded() {
    this.verifyForgotPasswordUrl();
    this.elements.resetPasswordTitle().should('be.visible');
    this.elements.resetPasswordTitle().should('contain', 'Reset Password');
  }

  // Verify send password reset url
  verifySendPasswordResetUrl() {
    cy.url().should('include', '/auth/sendPasswordReset');
  }

  // Verify required field message
  verifyRequiredFieldMessage() {
    this.elements.inputGroupMessage().should('be.visible');
    this.elements.inputGroupMessage().should('contain', 'Required');
  }

  // Verify all UI elements are visible
  verifyUIElements() {
    this.elements.usernameInput().should('be.visible');
    this.elements.cancelButton().should('be.visible');
    this.elements.resetPasswordButton().should('be.visible');
    this.elements.resetPasswordTitle().should('be.visible');
  }

  // Verify redirected to login page
  verifyRedirectedToLogin() {
    cy.url().should('include', '/auth/login');
  }
}

export default ForgotPasswordPage;
