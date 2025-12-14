class DashboardPage {
  // Locators
  elements = {
    dashboardBreadcrumb: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
    dashboardTitle: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
    userDropdown: () => cy.get('.oxd-userdropdown'),
    userDropdownMenu: () => cy.get('.oxd-dropdown-menu'),
    sidebarMenu: () => cy.get('.oxd-sidepanel'),
    quickLaunchCards: () => cy.get('.orangehrm-dashboard-widget'),
    timeAtWorkCard: () => cy.get('.orangehrm-dashboard-widget').contains('Time at Work'),
    myActionsCard: () => cy.get('.orangehrm-dashboard-widget').contains('My Actions'),
    quickLaunchCard: () => cy.get('.orangehrm-dashboard-widget').contains('Quick Launch'),
    buzzLatestPostCard: () => cy.get('.orangehrm-dashboard-widget-body').contains('Buzz Latest Posts'),
    employeesOnLeaveCard: () => cy.get('.orangehrm-dashboard-widget-body').contains('Employees on Leave Today'),
    employeeDistributionCard: () =>
      cy.get('.orangehrm-dashboard-widget-body').contains('Employee Distribution by Sub Unit'),
    employeeLocationCard: () =>
      cy.get('.orangehrm-dashboard-widget-body').contains('Employee Distribution by Location'),
    header: () => cy.get('.oxd-topbar-header'),
    mainMenu: () => cy.get('.oxd-main-menu'),
    // Sidebar menu items
    adminMenu: () => cy.get('.oxd-main-menu').contains('Admin'),
    pimMenu: () => cy.get('.oxd-main-menu').contains('PIM'),
    leaveMenu: () => cy.get('.oxd-main-menu').contains('Leave'),
    timeMenu: () => cy.get('.oxd-main-menu').contains('Time'),
    recruitmentMenu: () => cy.get('.oxd-main-menu').contains('Recruitment'),
    myInfoMenu: () => cy.get('.oxd-main-menu').contains('My Info'),
    performanceMenu: () => cy.get('.oxd-main-menu').contains('Performance'),
    dashboardMenu: () => cy.get('.oxd-main-menu').contains('Dashboard'),
    directoryMenu: () => cy.get('.oxd-main-menu').contains('Directory'),
    maintenanceMenu: () => cy.get('.oxd-main-menu').contains('Maintenance'),
    claimMenu: () => cy.get('.oxd-main-menu').contains('Claim'),
    buzzMenu: () => cy.get('.oxd-main-menu').contains('Buzz'),
  };

  // URL
  url = 'https://opensource-demo.orangehrmlive.com';

  // Visit the dashboard page
  visit() {
    cy.visit(`${this.url}/web/index.php/dashboard/index`);
  }

  // Verify dashboard URL
  verifyDashboardUrl() {
    cy.url().should('include', '/dashboard');
  }

  // Verify dashboard page loaded
  verifyDashboardLoaded() {
    this.verifyDashboardUrl();
    this.elements.dashboardBreadcrumb().should('contain', 'Dashboard');
  }

  // Set up dashboard API intercepts
  interceptDashboardAPIs() {
    // Intercept employee action summary API calls
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummaryData');

    // Intercept employee leaves API call
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/leaves**').as('leavesData');

    // Intercept employee subunit API call
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/subunit').as('subunitData');

    // Intercept employee locations API call
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/locations').as('locationsData');

    // Intercept time at work API call
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/time**').as('timeAtWorkData');
  }

  // Wait for all dashboard API calls
  waitForDashboardAPIs() {
    cy.wait('@actionSummaryData').its('response.statusCode').should('eq', 200);
    cy.wait('@leavesData').its('response.statusCode').should('eq', 200);
    cy.wait('@subunitData').its('response.statusCode').should('eq', 200);
    cy.wait('@locationsData').its('response.statusCode').should('eq', 200);
    cy.wait('@timeAtWorkData').its('response.statusCode').should('eq', 200);
  }

  // Verify dashboard widgets are visible
  verifyDashboardWidgets() {
    this.elements.timeAtWorkCard().should('be.visible');
    this.elements.myActionsCard().should('be.visible');
    this.elements.quickLaunchCard().should('be.visible');
  }

  // Verify dashboard header is visible
  verifyDashboardHeader() {
    this.elements.header().should('be.visible');
    this.elements.userDropdown().should('be.visible');
  }

  // Verify sidebar menu is visible
  verifySidebarMenu() {
    this.elements.sidebarMenu().should('be.visible');
    this.elements.mainMenu().should('be.visible');
  }

  // Click user dropdown
  clickUserDropdown() {
    this.elements.userDropdown().click();
  }

  // Verify user dropdown menu is visible
  verifyUserDropdownMenu() {
    this.elements.userDropdownMenu().should('be.visible');
  }

  // Verify all dashboard elements
  verifyAllDashboardElements() {
    this.verifyDashboardLoaded();
    this.verifyDashboardHeader();
    this.verifySidebarMenu();
    this.verifyDashboardWidgets();
  }

  // Sidebar menu click methods
  clickAdminMenu() {
    this.elements.adminMenu().click();
  }

  clickPIMMenu() {
    this.elements.pimMenu().click();
  }

  clickLeaveMenu() {
    this.elements.leaveMenu().click();
  }

  clickTimeMenu() {
    this.elements.timeMenu().click();
  }

  clickRecruitmentMenu() {
    this.elements.recruitmentMenu().click();
  }

  clickMyInfoMenu() {
    this.elements.myInfoMenu().click();
  }

  clickPerformanceMenu() {
    this.elements.performanceMenu().click();
  }

  clickDashboardMenu() {
    this.elements.dashboardMenu().click();
  }

  clickDirectoryMenu() {
    this.elements.directoryMenu().click();
  }

  clickMaintenanceMenu() {
    this.elements.maintenanceMenu().click();
  }

  clickClaimMenu() {
    this.elements.claimMenu().click();
  }

  clickBuzzMenu() {
    this.elements.buzzMenu().click();
  }

  // API intercept methods for each menu
  interceptAdminAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/admin/**').as('adminAPIs');
  }

  interceptPIMAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/pim/**').as('pimAPIs');
  }

  interceptLeaveAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/leave/**').as('leaveAPIs');
  }

  interceptTimeAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/time/**').as('timeAPIs');
  }

  interceptRecruitmentAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/recruitment/**').as('recruitmentAPIs');
  }

  interceptMyInfoAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/pim/employees/**').as('myInfoAPIs');
  }

  interceptPerformanceAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/performance/**').as('performanceAPIs');
  }

  interceptDirectoryAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/directory/**').as('directoryAPIs');
  }

  interceptMaintenanceAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/maintenance/**').as('maintenanceAPIs');
  }

  interceptClaimAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/claim/**').as('claimAPIs');
  }

  interceptBuzzAPIs() {
    cy.intercept('GET', '**/web/index.php/api/v2/buzz/**').as('buzzAPIs');
  }

  // Generic API intercept for any menu navigation
  interceptMenuAPIs(pattern) {
    cy.intercept('GET', pattern).as('menuAPIs');
  }

  // Wait for menu API calls
  waitForMenuAPIs(alias = 'menuAPIs') {
    cy.wait(`@${alias}`, { timeout: 10000 }).its('response.statusCode').should('eq', 200);
  }

  // Verify URL contains menu path
  verifyMenuUrl(menuPath) {
    cy.url().should('include', menuPath);
  }
}

export default DashboardPage;
