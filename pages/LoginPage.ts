import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Page Object Model for the Login Page
 * Encapsulates all interactions and verifications for login functionality
 */
export class LoginPage {
  constructor(private page: Page, private baseUrl: string) {}

  // Navigates to Login URL
  async goto() {
    await this.page.goto(`${this.baseUrl}/practice-test-login`)
  }

  async login(username: string, password: string) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('#submit');
  }

  async isSuccessfulLogin() {
    await expect(this.page.locator('.post-header')).toContainText('Logged In Successfully');
    await expect(this.page.locator('text=Log out')).toBeVisible();
  }

  async isFailedLogin() {
    await expect(this.page.locator('#error')).toBeVisible();
  }

  // shared login steps
  async loginWithValidCredentials(username: string, password: string) {
    await this.goto();
    await this.login(username, password);
    await this.page.waitForSelector('text=Practice', { timeout: 5000 });
  }

}