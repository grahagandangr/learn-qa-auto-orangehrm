describe('ReqRes API Tests', () => {
  const baseUrl = Cypress.env('REQRES_BASE_URL') || 'https://reqres.in/api';
  const apiKey = Cypress.env('REQRES_API_KEY');

  if (!apiKey) {
    throw new Error('REQRES_API_KEY is not set. Please check your .env file.');
  }

  const headers = {
    'x-api-key': apiKey,
    'Content-Type': 'application/json',
  };

  describe('List Users', () => {
    it('TC-001: List Users - Success with valid page number', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users`,
        qs: { page: 2 },
        headers: headers,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(200);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify response body structure
        expect(response.body).to.have.property('page', 2);
        expect(response.body).to.have.property('per_page');
        expect(response.body).to.have.property('total');
        expect(response.body).to.have.property('total_pages');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');

        // Verify response body contains per_page string
        expect(JSON.stringify(response.body)).to.include('per_page');
      });
    });

    it('TC-002: List Users - Failed without API key', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users`,
        qs: { page: 7 },
        failOnStatusCode: false,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(403);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);
      });
    });
  });

  describe('Single User', () => {
    it('TC-003: Get Single User - Success with valid user ID', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/2`,
        headers: headers,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(200);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify response body structure
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id', 2);
        expect(response.body.data).to.have.property('email');
        expect(response.body.data).to.have.property('first_name');
        expect(response.body.data).to.have.property('last_name');
        expect(response.body.data).to.have.property('avatar');

        // Verify response body contains data string
        expect(JSON.stringify(response.body)).to.include('data');
      });
    });

    it('TC-004: Get Single User - Error without API key', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/27`,
        failOnStatusCode: false,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(403);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);
      });
    });
  });

  describe('Create User', () => {
    it('TC-005: Create User - Success with valid data', () => {
      const userData = {
        name: 'morpheus',
        job: 'leader',
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/users`,
        headers: headers,
        body: userData,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(201);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify response body structure
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('createdAt');

        // Verify response body contains createdAt string
        expect(JSON.stringify(response.body)).to.include('createdAt');
      });
    });
  });

  describe('Update User', () => {
    it('TC-006: Update User - Success using PUT method', () => {
      const userData = {
        name: 'morpheus',
        job: 'zion resident',
      };

      cy.request({
        method: 'PUT',
        url: `${baseUrl}/users/2`,
        headers: headers,
        body: userData,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(200);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify response body structure
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt');

        // Verify response body contains updatedAt string
        expect(JSON.stringify(response.body)).to.include('updatedAt');
      });
    });

    it('TC-007: Update User - Success using PATCH method', () => {
      const userData = {
        name: 'morpheus',
        job: 'zion resident',
      };

      cy.request({
        method: 'PATCH',
        url: `${baseUrl}/users/2`,
        headers: headers,
        body: userData,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(200);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify response body structure
        expect(response.body).to.have.property('name', userData.name);
        expect(response.body).to.have.property('job', userData.job);
        expect(response.body).to.have.property('updatedAt');

        // Verify response body contains updatedAt string
        expect(JSON.stringify(response.body)).to.include('updatedAt');
      });
    });
  });

  describe('Delete User', () => {
    it('TC-008: Delete User - Success', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/users/2`,
        headers: headers,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(204);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify response body is empty (204 No Content)
        expect(response.body).to.be.empty;
      });
    });
  });

  describe('Register User', () => {
    it('TC-009: Register User - Success with valid email and password', () => {
      const registerData = {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/register`,
        headers: headers,
        body: registerData,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(200);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify response body structure
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('token');

        // Verify response body contains token string
        expect(JSON.stringify(response.body)).to.include('token');
      });
    });

    it('TC-010: Register User - Failed with missing password', () => {
      const registerData = {
        email: 'eve.holt@reqres.in',
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/register`,
        headers: headers,
        body: registerData,
        failOnStatusCode: false,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(400);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify error message
        expect(response.body).to.have.property('error', 'Missing password');
      });
    });
  });

  describe('Login User', () => {
    it('TC-011: Login User - Success with valid email and password', () => {
      const loginData = {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        headers: headers,
        body: loginData,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(200);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify response body structure
        expect(response.body).to.have.property('token');

        // Verify response body contains token string
        expect(JSON.stringify(response.body)).to.include('token');
      });
    });

    it('TC-012: Login User - Error with missing password', () => {
      const loginData = {
        email: 'peter@klaven',
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        headers: headers,
        body: loginData,
        failOnStatusCode: false,
      }).then((response) => {
        // Verify status code
        expect(response.status).to.eq(400);

        // Verify response time is less than 1000ms
        expect(response.duration).to.be.below(1000);

        // Verify error message
        expect(response.body).to.have.property('error', 'Missing password');
      });
    });
  });
});
