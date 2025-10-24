import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';
import { getWIBTimestamp, getWIBDate } from '../utils/timeWIB';


// clean up text for safe filename usage
export function sanitize(text: string): string {
    return text
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .slice(0, 50);
}

// save screenshot with structured naming and folder per date
export async function saveScreenshot(options: {
    page: Page;
    scenarioName: string;
    stepText?: string;
    type?: 'step' | 'error';
    folderRoot?: string;
    log?: boolean;
    }) {
    const {
        page,
        scenarioName,
        stepText = 'unknown-step',
        type = 'step',
        folderRoot = 'screenshots',
        log = true,
    } = options;

    const timestamp = getWIBTimestamp();
    const dateFolder = getWIBDate();
    const safeScenario = sanitize(scenarioName);
    const safeStep = sanitize(stepText);

    const folder =
        type === 'step'
        ? path.join(folderRoot, 'steps', dateFolder, safeScenario)
        : path.join(folderRoot, 'errors', dateFolder);

    const filename = `${type}-${safeScenario}-${safeStep}-${timestamp}.png`;
    const filepath = path.join(folder, filename);
    
    // check for targeted folder is exist? if not => create new folder
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    // save screenshot
    await page.screenshot({ path: filepath });

    // if (log) {
    //     console.log(`Screenshot saved: ${filepath}`);
    // }

    return filepath;
}
