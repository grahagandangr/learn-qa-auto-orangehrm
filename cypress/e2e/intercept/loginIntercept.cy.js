describe('OrangeHRM Login Feature with intercept', () => {
  beforeEach(() => {
    // Go to the login page and clear the browser cache
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Network.clearBrowserCache',
      })
    );
  });

  it('TC-001: Login dengan kredensial yang valid', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Intercept login request
    cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

    // Intercept employee action summary API calls after successful login
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummaryData');

    // Intercept employee leaves API call after successful login
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/leaves**').as('leavesData');

    // Intercept employee subunit API call after successful login
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/subunit').as('subunitData');

    // Intercept employee locations API call after successful login
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/employees/locations').as('locationsData');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Wait for login request
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    // Wait for all dashboard API calls after successful login
    cy.wait('@actionSummaryData').its('response.statusCode').should('eq', 200);
    cy.wait('@leavesData').its('response.statusCode').should('eq', 200);
    cy.wait('@subunitData').its('response.statusCode').should('eq', 200);
    cy.wait('@locationsData').its('response.statusCode').should('eq', 200);

    // Verify dashboard page
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb-module').should('contain', 'Dashboard');
  });

  it('TC-002: Login dengan username salah dan password benar', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Intercept login request
    cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="username"]').type('InvalidUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Wait for login request
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    // Verify error message
    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-003: Login dengan username benar dan password salah', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Intercept login request
    cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Wait for login request
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    // Verify error message
    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-004: Login dengan username dan password salah', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Intercept login request
    cy.intercept('POST', '**/web/index.php/auth/validate').as('loginRequest');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('wrongpass123');
    cy.get('button[type="submit"]').click();

    // Wait for login request
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    // Verify error message
    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-005: Login dengan username dan password kosong', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Submit login form without filling the form
    cy.get('button[type="submit"]').click();

    // Verify error message
    cy.get('.oxd-input-group__message').should('have.length', 2);
    cy.get('.oxd-input-group__message').each(($el) => {
      cy.wrap($el).should('contain', 'Required');
    });
    cy.url().should('include', '/auth/login');
  });

  it('TC-006: Login dengan username kosong dan password terisi', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Verify error message
    cy.get('.oxd-input-group__message').should('be.visible');
    cy.get('.oxd-input-group__message').should('contain', 'Required');
    cy.url().should('include', '/auth/login');
  });

  it('TC-007: Login dengan username terisi dan password kosong', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    // Verify error message
    cy.get('.oxd-input-group__message').should('be.visible');
    cy.get('.oxd-input-group__message').should('contain', 'Required');
    cy.url().should('include', '/auth/login');
  });

  it('TC-008: Login dengan password case sensitivity berbeda', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();

    // Verify error message
    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-009: Verifikasi password ditampilkan dalam bentuk tersembunyi', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="password"]').type('admin123');

    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('input[name="password"]').invoke('val').should('eq', 'admin123');
  });

  it('TC-010: Klik link Forgot your password', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Click forgot password link
    cy.contains('Forgot your password').click();

    // Verify reset password page
    cy.url().should('include', '/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password');
  });

  it('TC-011: Login dengan username yang memiliki spasi di awal', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Fill login form
    cy.get('input[name="username"]').type(' Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Verify error message
    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-012: Verifikasi semua elemen UI pada halaman login', () => {
    // Intercept login page image request
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('loginPageImage');

    // Wait for login page image request
    cy.wait('@loginPageImage').its('response.statusCode').should('eq', 200);

    // Verify all UI elements
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.contains('Forgot your password').should('be.visible');
    cy.get('.orangehrm-login-branding').should('be.visible');
    cy.get('.oxd-text--h5').should('contain', 'Login');
  });
});
