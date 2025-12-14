import LoginPage from '../../support/pageObjects/LoginPage';
import ForgotPasswordPage from '../../support/pageObjects/ForgotPasswordPage';
import loginData from '../../fixtures/loginData.json';

describe('OrangeHRM Forgot Password Feature with intercept (POM)', () => {
  const loginPage = new LoginPage();
  const forgotPasswordPage = new ForgotPasswordPage();

  beforeEach(() => {
    // Go to the login page and clear the browser cache
    loginPage.visit();
    loginPage.clearCache();
  });

  it('TC-001: Verifikasi halaman Forgot Password berhasil dibuka', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Click forgot password link
    loginPage.clickForgotPassword();

    // Verify forgot password page
    forgotPasswordPage.verifyForgotPasswordPageLoaded();
  });

  it('TC-002: Reset password dengan username yang valid', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Navigate to forgot password page
    loginPage.clickForgotPassword();
    forgotPasswordPage.verifyForgotPasswordPageLoaded();

    // Perform reset password
    forgotPasswordPage.resetPassword(loginData.valid.username);

    // Verify success message
    forgotPasswordPage.verifySendPasswordResetUrl();
  });

  it('TC-003: Reset password dengan username kosong', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Navigate to forgot password page
    loginPage.clickForgotPassword();
    forgotPasswordPage.verifyForgotPasswordPageLoaded();

    // Submit form without filling username
    forgotPasswordPage.clickResetPassword();

    // Verify required field message
    forgotPasswordPage.verifyRequiredFieldMessage();
  });

  it('TC-004: Klik tombol Cancel pada halaman Forgot Password', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Navigate to forgot password page
    loginPage.clickForgotPassword();
    forgotPasswordPage.verifyForgotPasswordPageLoaded();

    // Click cancel button
    forgotPasswordPage.clickCancel();

    // Verify redirected to login page
    forgotPasswordPage.verifyRedirectedToLogin();
    loginPage.verifyLoginUrl();
  });

  it('TC-005: Verifikasi semua elemen UI pada halaman Forgot Password', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Navigate to forgot password page
    loginPage.clickForgotPassword();
    forgotPasswordPage.verifyForgotPasswordPageLoaded();

    // Verify all UI elements
    forgotPasswordPage.verifyUIElements();
  });
});
