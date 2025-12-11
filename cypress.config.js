const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Load environment variables from .env file
      config.env.REQRES_API_KEY = process.env.REQRES_API_KEY;
      config.env.REQRES_BASE_URL = process.env.REQRES_BASE_URL || 'https://reqres.in/api';
      return config;
    },
  },
});
