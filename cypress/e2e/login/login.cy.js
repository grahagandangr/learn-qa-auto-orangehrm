describe('OrangeHRM Login Feature', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com');
  });

  it('TC-001: Login dengan kredensial yang valid', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-breadcrumb-module').should('contain', 'Dashboard');
  });

  it('TC-002: Login dengan username salah dan password benar', () => {
    cy.get('input[name="username"]').type('InvalidUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-003: Login dengan username benar dan password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-004: Login dengan username dan password salah', () => {
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('wrongpass123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-005: Login dengan username dan password kosong', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('have.length', 2);
    cy.get('.oxd-input-group__message').each(($el) => {
      cy.wrap($el).should('contain', 'Required');
    });
    cy.url().should('include', '/auth/login');
  });

  it('TC-006: Login dengan username kosong dan password terisi', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('be.visible');
    cy.get('.oxd-input-group__message').should('contain', 'Required');
    cy.url().should('include', '/auth/login');
  });

  it('TC-007: Login dengan username terisi dan password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-group__message').should('be.visible');
    cy.get('.oxd-input-group__message').should('contain', 'Required');
    cy.url().should('include', '/auth/login');
  });

  it('TC-008: Login dengan password case sensitivity berbeda', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('ADMIN123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-009: Verifikasi password ditampilkan dalam bentuk tersembunyi', () => {
    cy.get('input[name="password"]').type('admin123');

    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('input[name="password"]').invoke('val').should('eq', 'admin123');
  });

  it('TC-010: Klik link Forgot your password', () => {
    cy.contains('Forgot your password').click();

    cy.url().should('include', '/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password');
  });

  it('TC-011: Login dengan username yang memiliki spasi di awal', () => {
    cy.get('input[name="username"]').type(' Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content').should('be.visible');
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
    cy.url().should('include', '/auth/login');
  });

  it('TC-012: Verifikasi semua elemen UI pada halaman login', () => {
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.contains('Forgot your password').should('be.visible');
    cy.get('.orangehrm-login-branding').should('be.visible');
    cy.get('.oxd-text--h5').should('contain', 'Login');
  });
});
