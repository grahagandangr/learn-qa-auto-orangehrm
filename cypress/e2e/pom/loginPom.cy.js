import LoginPage from '../../support/pageObjects/LoginPage';
import DashboardPage from '../../support/pageObjects/DashboardPage';
import loginData from '../../fixtures/loginData.json';

describe('OrangeHRM Login Feature with intercept (POM)', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    // Go to the login page and clear the browser cache
    loginPage.visit();
    loginPage.clearCache();
  });

  it('TC-001: Login dengan kredensial yang valid', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for all dashboard API calls
    dashboardPage.waitForDashboardAPIs();

    // Verify dashboard page
    dashboardPage.verifyDashboardLoaded();
  });

  it('TC-002: Login dengan username salah dan password benar', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();

    // Perform login with invalid username
    loginPage.loginAndWait(loginData.invalidUsername.username, loginData.invalidUsername.password);

    // Verify error message
    loginPage.verifyErrorMessage();
    loginPage.verifyLoginUrl();
  });

  it('TC-003: Login dengan username benar dan password salah', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();

    // Perform login with invalid password
    loginPage.loginAndWait(loginData.invalidPassword.username, loginData.invalidPassword.password);

    // Verify error message
    loginPage.verifyErrorMessage();
    loginPage.verifyLoginUrl();
  });

  it('TC-004: Login dengan username dan password salah', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();

    // Perform login with invalid credentials
    loginPage.loginAndWait(loginData.invalidBoth.username, loginData.invalidBoth.password);

    // Verify error message
    loginPage.verifyErrorMessage();
    loginPage.verifyLoginUrl();
  });

  it('TC-005: Login dengan username dan password kosong', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Submit login form without filling
    loginPage.clickSubmit();

    // Verify required field messages
    loginPage.verifyRequiredFieldMessages(2);
    loginPage.verifyLoginUrl();
  });

  it('TC-006: Login dengan username kosong dan password terisi', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Fill only password
    loginPage.enterPassword(loginData.emptyUsername.password);
    loginPage.clickSubmit();

    // Verify required field message
    loginPage.verifyRequiredFieldMessage();
    loginPage.verifyLoginUrl();
  });

  it('TC-007: Login dengan username terisi dan password kosong', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Fill only username
    loginPage.enterUsername(loginData.emptyPassword.username);
    loginPage.clickSubmit();

    // Verify required field message
    loginPage.verifyRequiredFieldMessage();
    loginPage.verifyLoginUrl();
  });

  it('TC-008: Login dengan password case sensitivity berbeda', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();

    // Perform login with wrong case password
    loginPage.loginAndWait(loginData.caseSensitivity.username, loginData.caseSensitivity.password);

    // Verify error message
    loginPage.verifyErrorMessage();
    loginPage.verifyLoginUrl();
  });

  it('TC-009: Verifikasi password ditampilkan dalam bentuk tersembunyi', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Fill password field
    loginPage.enterPassword(loginData.valid.password);

    // Verify password is hidden
    loginPage.verifyPasswordIsHidden();
    loginPage.verifyPasswordValue(loginData.valid.password);
  });

  it('TC-010: Klik link Forgot your password', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Click forgot password link
    loginPage.clickForgotPassword();

    // Verify reset password page
    loginPage.verifyForgotPasswordPage();
  });

  it('TC-011: Login dengan username yang memiliki spasi di awal', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();

    // Perform login with username containing leading space
    loginPage.loginAndWait(loginData.leadingSpace.username, loginData.leadingSpace.password);

    // Verify error message
    loginPage.verifyErrorMessage();
    loginPage.verifyLoginUrl();
  });

  it('TC-012: Verifikasi semua elemen UI pada halaman login', () => {
    // Set up intercepts
    loginPage.waitForPageImage();

    // Verify all UI elements
    loginPage.verifyUIElements();
  });
});
