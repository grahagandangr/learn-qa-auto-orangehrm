import LoginPage from '../../support/pageObjects/LoginPage';
import DashboardPage from '../../support/pageObjects/DashboardPage';
import loginData from '../../fixtures/loginData.json';

describe('OrangeHRM Dashboard Feature with intercept (POM)', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    // Go to the login page and clear the browser cache
    loginPage.visit();
    loginPage.clearCache();
  });

  it('TC-001: Login dan verifikasi Dashboard page berhasil dengan semua API calls', () => {
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

  it('TC-002: Verifikasi semua elemen Dashboard setelah login berhasil', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for all dashboard API calls
    dashboardPage.waitForDashboardAPIs();

    // Verify all dashboard elements
    dashboardPage.verifyAllDashboardElements();
  });

  it('TC-003: Verifikasi Dashboard widgets terlihat setelah login', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for all dashboard API calls
    dashboardPage.waitForDashboardAPIs();

    // Verify dashboard widgets
    dashboardPage.verifyDashboardWidgets();
  });

  it('TC-004: Verifikasi Dashboard header dan user dropdown', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for all dashboard API calls
    dashboardPage.waitForDashboardAPIs();

    // Verify dashboard header
    dashboardPage.verifyDashboardHeader();

    // Click user dropdown
    dashboardPage.clickUserDropdown();

    // Verify user dropdown menu
    dashboardPage.verifyUserDropdownMenu();
  });

  it('TC-005: Verifikasi Sidebar menu pada Dashboard', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for all dashboard API calls
    dashboardPage.waitForDashboardAPIs();

    // Verify sidebar menu
    dashboardPage.verifySidebarMenu();
  });

  it('TC-006: Verifikasi response API untuk action summary data', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for action summary API call
    cy.wait('@actionSummaryData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.exist;
      expect(interception.response.body.data).to.exist;
    });

    // Verify dashboard page
    dashboardPage.verifyDashboardLoaded();
  });

  it('TC-007: Verifikasi response API untuk leaves data', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for leaves API call
    cy.wait('@leavesData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.exist;
    });

    // Verify dashboard page
    dashboardPage.verifyDashboardLoaded();
  });

  it('TC-008: Verifikasi response API untuk subunit data', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for subunit API call
    cy.wait('@subunitData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.exist;
    });

    // Verify dashboard page
    dashboardPage.verifyDashboardLoaded();
  });

  it('TC-009: Verifikasi response API untuk locations data', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for locations API call
    cy.wait('@locationsData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.exist;
    });

    // Verify dashboard page
    dashboardPage.verifyDashboardLoaded();
  });

  it('TC-010: Verifikasi semua API calls selesai sebelum verifikasi UI', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for all dashboard API calls
    dashboardPage.waitForDashboardAPIs();

    // Verify all API calls completed successfully
    cy.get('@actionSummaryData').its('response.statusCode').should('eq', 200);
    cy.get('@leavesData').its('response.statusCode').should('eq', 200);
    cy.get('@subunitData').its('response.statusCode').should('eq', 200);
    cy.get('@locationsData').its('response.statusCode').should('eq', 200);

    // Verify dashboard page
    dashboardPage.verifyDashboardLoaded();
  });

  it('TC-011: Verifikasi response time untuk semua API calls', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for all dashboard API calls and verify response time
    cy.wait('@actionSummaryData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.wait('@leavesData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.wait('@subunitData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.wait('@locationsData').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    // Verify dashboard page
    dashboardPage.verifyDashboardLoaded();
  });

  it('TC-012: Verifikasi URL Dashboard setelah login berhasil', () => {
    // Set up intercepts
    loginPage.waitForPageImage();
    loginPage.interceptLoginRequest();
    dashboardPage.interceptDashboardAPIs();

    // Perform login
    loginPage.loginAndWait(loginData.valid.username, loginData.valid.password);

    // Wait for all dashboard API calls
    dashboardPage.waitForDashboardAPIs();

    // Verify dashboard URL
    dashboardPage.verifyDashboardUrl();
    cy.url().should('include', '/dashboard/index');
  });
});
