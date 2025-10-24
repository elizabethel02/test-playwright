import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page } from 'playwright';
import { LoginPage } from '../../pages/LoginPage';
import { ExceptionsPage } from '../../pages/ExceptionsPage';

/**
 * Custom World object to share context between steps
 */
export class CustomWorld {
  browser: Browser | null = null;
  page: Page | null = null;
  loginPage!: LoginPage;
  exceptionsPage!: ExceptionsPage;
  baseUrl: string = process.env.BASE_URL || 'https://practicetestautomation.com';
  lastStepText?: string;
}

setWorldConstructor(CustomWorld);