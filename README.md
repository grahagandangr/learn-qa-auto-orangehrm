# Learn QA Automation - OrangeHRM

A Cypress-based end-to-end (E2E) test automation project for OrangeHRM login functionality. This project contains
comprehensive test cases covering various login scenarios including valid credentials, invalid credentials, field
validations, and UI element verification.

## 🎯 Overview

This project automates the testing of OrangeHRM login feature using Cypress. It covers 12 different test scenarios to
ensure the login functionality works correctly under various conditions.

**Test URL:** https://opensource-demo.orangehrmlive.com

## Notes
- Since the free public API key for reqres is not available at the moment. You have to use your own API key by registering for a free account at https://reqres.in/ and create a .env file in the root of the project and add the following variables:
  - REQRES_API_KEY: Your API key for the ReqRes API
  - REQRES_BASE_URL: The base URL for the ReqRes API