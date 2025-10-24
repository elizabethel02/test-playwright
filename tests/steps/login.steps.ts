import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { validCredentials, invalidCredentials} from '../../fixtures/testData';
import { LoginPage } from '../../pages/LoginPage';

// Navigate to page
Given('I am on the login page', async function (this: CustomWorld) {
  await this.loginPage.goto();
});

// shared step for logged in
Given('I am logged in', async function (this: CustomWorld) {
  await this.loginPage.loginWithValidCredentials(validCredentials.username, validCredentials.password);
});

// Perform valid credentials
When('I login with valid credentials', async function () {
  if (!validCredentials.username || !validCredentials.password) {
    throw new Error('Missing credentials in .env file');
  } else{
    await this.loginPage.login(validCredentials.username, validCredentials.password);
  }
});

// Perform invalid credentials
When('I login with invalid credentials', async function () {
  if (!invalidCredentials.username || !invalidCredentials.password) {
    throw new Error('Missing credentials in .env file');
  } else {
    await this.loginPage.login(invalidCredentials.username, invalidCredentials.password);
  }
});

// Verify Success Login
Then('I should see the secure area page', async function () {
  await this.loginPage.isSuccessfulLogin();
});

// Verify Failed Login
Then('I should see an error message', async function () {
  await this.loginPage.isFailedLogin();
});