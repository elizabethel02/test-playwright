import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ExceptionsPage } from '../../pages/ExceptionsPage';

Given('I navigate to the "Test Exceptions" page', async function (this: CustomWorld) {
  await this.exceptionsPage.navigateToExceptions();
});

When('I add a new row', async function (this: CustomWorld) {
  await this.exceptionsPage.addRow();
});

When ('I wait for the spinner to disappeared', async function (this: CustomWorld) {
  await this.exceptionsPage.waitSpinner();
});

When ('I wait for new row is appear', async function (this: CustomWorld) {
  await this.exceptionsPage.showNewRow();
});

When('I input {string} into the new row and save', async function (this: CustomWorld, text: string) {
  await this.exceptionsPage.inputTextInRow(2, text);
});

When('I edit the row with {string}', async function (this: CustomWorld, newText: string) {
  await this.exceptionsPage.editRow(2, newText);
});

When('I delete the second row', async function (this: CustomWorld) {
  await this.exceptionsPage.deleteRow(2);
});

Then('I should see only one row remaining', async function (this: CustomWorld) {
  const count = await this.exceptionsPage.getRowCount();
  expect(count).toBe(1);
});
