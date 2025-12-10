class DashboardPage {
  // Locators
  elements = {
    dashboardBreadcrumb: () => cy.get('.oxd-topbar-header-breadcrumb-module'),
  };

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
  }

  // Wait for all dashboard API calls
  waitForDashboardAPIs() {
    cy.wait('@actionSummaryData').its('response.statusCode').should('eq', 200);
    cy.wait('@leavesData').its('response.statusCode').should('eq', 200);
    cy.wait('@subunitData').its('response.statusCode').should('eq', 200);
    cy.wait('@locationsData').its('response.statusCode').should('eq', 200);
  }
}

export default DashboardPage;
