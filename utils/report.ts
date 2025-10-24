import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { getWIBTimestamp, getWIBDate } from '../utils/timeWIB';
import { sanitize, saveScreenshot } from '../utils/screenshot';

interface ReportEntry {
  scenario: string;
  step: string;
  status: 'PASSED' | 'FAILED';
  screenshotPath: string;
}

const reportData: ReportEntry[] = [];

export function addReportEntry(entry: ReportEntry) {
  reportData.push(entry);
}

export function generateHtmlReport(): string {
    const dateFolder = getWIBDate();
    const outputDir = path.join('reports', dateFolder);
    const safeScenario = sanitize(reportData[0]?.scenario || 'report');
    const timestamp = getWIBTimestamp();
    const filename = `report-${safeScenario}-${timestamp}.html`;
    const htmlPath = path.join(outputDir, filename);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const total = reportData.length;
    const passed = reportData.filter((e) => e.status === 'PASSED').length;
    const failed = reportData.filter((e) => e.status === 'FAILED').length;

    const grouped = {
        PASSED: reportData.filter((e) => e.status === 'PASSED'),
        FAILED: reportData.filter((e) => e.status === 'FAILED'),
    };

    const showPassed = grouped.PASSED.length > 0;
    const showFailed = grouped.FAILED.length > 0;

    const section = (status: 'PASSED' | 'FAILED') => {
        const color = status === 'PASSED' ? 'green' : 'red';
        const rows = grouped[status]
        .map((entry) => {
            const relativePath = path.relative(outputDir, entry.screenshotPath);
            return `
            <tr>
                <td>${entry.scenario}</td>
                <td>${entry.step}</td>
                <td style="color:${color}">${entry.status}</td>
                <td><img src="${relativePath}" width="100%"/></td>
            </tr>
            `;
        })
        .join('\n');

        return `
        <h2>${status === 'PASSED' ? '✅ PASSED' : '❌ FAILED'}</h2>
        <table border="1" cellpadding="8" cellspacing="0" class="${status}" style="width:100%; margin-bottom:50px">
            <tr><th style="fon">Scenario</th><th>Step</th><th>Status</th><th>Screenshot</th></tr>
            ${rows}
        </table>
        `;
    };

    const html = `
        <html>
            <head>
            <title>Test Report - ${safeScenario.replace(/-/g, ' ')} (${dateFolder})</title>
            <style>
                body { font-family: sans-serif; }
                .PASSED { display: table; }
                .FAILED { display: table; }
                button { margin: 0px 5px; padding: 12px 10px; border-radius: 20px; text-transform: uppercase; min-width: 155px; }
                .title { margin: 30px 0 10px; }
                .text-info { font-size: 22px; font-weight: bold; }

            </style>
            <script>
                function toggle(status) {
                const table = document.querySelector('.' + status);
                if (table) {
                    table.style.display = table.style.display === 'none' ? 'table' : 'none';
                }
                }
            </script>
            </head>
            <body>
            <h1 classs="title">TEST REPORT ${safeScenario.replace(/-/g, ' ').toUpperCase()} (${dateFolder})</h1>
            <p class="text-info">Total: ${total} | ✅ Passed: ${passed} | ❌ Failed: ${failed}</p>
            ${showPassed ? `<button onclick="toggle('PASSED')">Toggle PASSED</button>` : ''}
            ${showFailed ? `<button onclick="toggle('FAILED')">Toggle FAILED</button>` : ''}
            ${showPassed ? section('PASSED') : ''}
            ${showFailed ? section('FAILED') : ''}
            </body>
        </html>
    `;

    fs.writeFileSync(htmlPath, html);
    return htmlPath;
    console.log(`HTML report generated: ${htmlPath}`);
}

export async function exportReportToPDF(htmlPath: string) {
    const pdfPath = htmlPath.replace('.html', '.pdf');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(`file://${path.resolve(htmlPath)}`, { waitUntil: 'networkidle0' });
    await page.pdf({ path: pdfPath, format: 'A4' });
    await browser.close();
    console.log(`PDF report generated: ${pdfPath}`);
}