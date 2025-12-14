import LoginPage from '../../support/pageObjects/LoginPage';
import DashboardPage from '../../support/pageObjects/DashboardPage';
import loginData from '../../fixtures/loginData.json';

describe('OrangeHRM Sidebar Menu Feature with intercept (POM)', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    // Go to the login page and clear the browser cache
    loginPage.visit();
    loginPage.clearCache();

    // Login first to access sidebar menu
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);
    dashboardPage.waitForDashboardAPIs();
  });

  it('TC-001: Klik menu Admin dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/admin/**');

    // Click Admin menu
    dashboardPage.clickAdminMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/admin');
  });

  it('TC-002: Klik menu PIM dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/pim/**');

    // Click PIM menu
    dashboardPage.clickPIMMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/pim');
  });

  it('TC-003: Klik menu Leave dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/leave/**');

    // Click Leave menu
    dashboardPage.clickLeaveMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/leave');
  });

  it('TC-004: Klik menu Time dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/time/**');

    // Click Time menu
    dashboardPage.clickTimeMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/time');
  });

  it('TC-005: Klik menu Recruitment dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/recruitment/**');

    // Click Recruitment menu
    dashboardPage.clickRecruitmentMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/recruitment');
  });

  it('TC-006: Klik menu My Info dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/pim/employees/**');

    // Click My Info menu
    dashboardPage.clickMyInfoMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/pim/viewPersonalDetails');
  });

  it('TC-007: Klik menu Performance dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/performance/**');

    // Click Performance menu
    dashboardPage.clickPerformanceMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/performance');
  });

  it('TC-008: Klik menu Dashboard dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptDashboardAPIs();

    // Click Dashboard menu
    dashboardPage.clickDashboardMenu();

    // Wait for all dashboard API calls
    dashboardPage.waitForDashboardAPIs();

    // Verify URL
    dashboardPage.verifyMenuUrl('/dashboard');
  });

  it('TC-009: Klik menu Directory dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/directory/**');

    // Click Directory menu
    dashboardPage.clickDirectoryMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/directory');
  });

  it('TC-010: Klik menu Claim dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/claim/**');

    // Click Claim menu
    dashboardPage.clickClaimMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/claim');
  });

  it('TC-011: Klik menu Buzz dan verifikasi API call success', () => {
    // Set up intercepts
    dashboardPage.interceptMenuAPIs('**/web/index.php/api/v2/buzz/**');

    // Click Buzz menu
    dashboardPage.clickBuzzMenu();

    // Wait for API call and verify success
    dashboardPage.waitForMenuAPIs('menuAPIs');

    // Verify URL
    dashboardPage.verifyMenuUrl('/buzz');
  });
});
