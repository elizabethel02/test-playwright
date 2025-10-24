import { Before, After, Status, AfterStep, AfterAll} from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { CustomWorld } from './world';
import { LoginPage } from '../../pages/LoginPage';
import { ExceptionsPage } from '../../pages/ExceptionsPage';
import { getWIBTimestamp } from '../../utils/timeWIB';
import { saveScreenshot } from '../../utils/screenshot';
import { addReportEntry, generateHtmlReport, exportReportToPDF } from '../../utils/report';

// Launch browser before each scenario
Before({ timeout: 30000}, async function (this: CustomWorld) {
  this.browser = await chromium.launch({headless: false, slowMo: 300});
  this.page = await this.browser.newPage();
  this.loginPage = new LoginPage(this.page, this.baseUrl);
  this.exceptionsPage = new ExceptionsPage(this.page, this.baseUrl);
});

Before({ timeout: 30000, tags: '@exceptionsPage'}, async function (this: CustomWorld) {  
  await this.loginPage.loginWithValidCredentials(process.env.VALID_USERNAME!, process.env.VALID_PASSWORD!);
});

// Close browser after each scenario
After(async function (this: CustomWorld, scenario) {

  const isFailed = scenario.result?.status === 'FAILED';
  const error = scenario.result?.exception;
  const stepText = this.lastStepText || 'unknown-step';

  if (isFailed && this.page) {
    const filepath = await saveScreenshot({
      page: this.page,
      scenarioName: scenario.pickle.name,
      stepText,
      type: 'error',
    });

    console.error(`[After] Scenario failed: ${scenario.pickle.name}`);
    console.error(`[After] Step: ${stepText}`);
    console.error(`[After] Error: ${error?.message || error}`);

    addReportEntry({
      scenario: scenario.pickle.name,
      step: this.lastStepText || 'unknown-step',
      status: 'FAILED',
      screenshotPath: filepath,
    });
  }

  await this.page?.close();
  await this.browser?.close();

  console.log('[After] Browser closed');
});


AfterStep(async function (this: CustomWorld, step) {
  const stepText = step.pickleStep?.text || 'unknown-step';
  this.lastStepText = stepText;

  if (!this.page) return;

  const filepath = await saveScreenshot({
    page: this.page!,
    scenarioName: step.pickle.name,
    stepText: step.pickleStep?.text,
    type: 'step',
  });

  addReportEntry({
    scenario: step.pickle.name,
    step: step.pickleStep?.text || 'unknown-step',
    status: 'PASSED',
    screenshotPath: filepath,
  });
});


AfterAll(async function () {
  const htmlPath = generateHtmlReport(); // show all entry
  await exportReportToPDF(htmlPath);     // saved as PDF
});