import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ExceptionsPage {
  constructor(private page: Page, private baseUrl: string) {}

    async navigateToExceptions() {
        await this.page.click('text=Practice');
        await this.page.click('a[href*="test-exceptions"]');
        await expect(this.page).toHaveURL(`${this.baseUrl}/practice-test-exceptions/`);
    }

     // action: Get the total of current rows
    async getRowCount(): Promise<number> {
        // count the total of element with class that starts 'row'
        const countRow = await this.page.locator('.row:visible').count();
        return countRow;
        // console.log(`current row = ${countRow}`);
    }

    async addRow() {
        // get initial row count
        const initialCount = await this.getRowCount();
        // console.log('Initial row count:', initialCount); // should be 1

        // click button add
        await this.page.click('#add_btn');
        // console.log('Clicked Add button');
    }

    async waitSpinner() {
        // spinner
        const spinner = this.page.locator('#loading');
        if(await spinner.isVisible ()){
            await spinner.waitFor({ state: 'hidden' , timeout: 5000}); 
            console.log('Spinner disappeared...')
        } else {
            console.log('Spinner did not appeared... skipping wait');
        }
    }

    async showNewRow(){
        // wait for new row to appear
        await expect(this.page.locator('#row2')).toBeVisible(); 
        // console.log('New row appeared');

        // validate row count
        const finalCount = await this.getRowCount();
        expect(finalCount).toBe(2);
        // console.log('Final row count:', finalCount);
    }

    async inputTextInRow(rowIndex: number, text: string) {
        // input text
        const input = this.page.locator(`#row${rowIndex} input`);
        await input.fill(text);
        // console.log('inputted text')

        // click button save
        await this.page.click(`#row${rowIndex} #save_btn`);
        // console.log ("click button save")   
    }

    async editRow(rowIndex: number, newText: string) {
        // click button edit
        await this.page.click(`#row${rowIndex} #edit_btn`);

        // edit with new text
        const input = this.page.locator(`#row${rowIndex} input`);
        await input.fill(newText);

        // click button save
        await this.page.click(`#row${rowIndex} #save_btn`);
    }

    async deleteRow(rowIndex: number) {
        // get the initial row count
        const initialCount = await this.getRowCount();

        // click button remove
        await this.page.click(`#row${rowIndex} #remove_btn`);

        // wait until the 2nd row is removed
        await this.page.locator(`#row${rowIndex}`).waitFor({ state: 'hidden' ,  timeout: 500});
    }

}

