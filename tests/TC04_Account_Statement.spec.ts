import {test,expect, chromium} from '@playwright/test';
import AccountLoginPage from '../objects/AccountLoginPage'
import AccountsStatementPage from '../objects/AccountsStatementPage'
import { accountLoginTest,delay } from './CommonMethods.spec';


test('Generating account Statement', async ({page }) => {
    accountLoginTest(page);
    let accountsStatementPage: AccountsStatementPage;
    await delay(2000);

    accountsStatementPage = new AccountsStatementPage(page);
    await expect(accountsStatementPage.accounts_Table ).toBeVisible();
    let textsFromNthColumn : string[] = [];  
    const rowheaders =await accountsStatementPage.table_headers.allInnerTexts();
    var rowfields = ["Account", "Balance*", "Available Amount"]
    let rowheadings : string[] = [];
    for (const rowhead of rowheaders)
    {
    rowheadings.push(rowhead);
    }

   expect(rowheadings).toEqual(rowfields);
   const Rows = await accountsStatementPage.table_Rows.count();

   for(let i =0;i<Rows;i++)
   {
    let elem = await page.locator("table tbody tr td").nth(i).allInnerTexts();
    console.log(elem);
   }
   await expect (accountsStatementPage.balance_Text).toBeVisible();
   await page.locator("table tbody tr td a").first().click();

   await expect (accountsStatementPage.account_overview_header).toBeVisible();
   await delay(6000);

   await expect (accountsStatementPage.account_number).toBeVisible();
   await expect (accountsStatementPage.account_type).toBeVisible();
   await expect (accountsStatementPage.balance).toBeVisible();
   await expect (accountsStatementPage.available).toBeVisible();
  
   await expect (accountsStatementPage.account_Activity).toBeVisible();
   await expect (accountsStatementPage.activity_period).toBeVisible();
   await (accountsStatementPage.activity_period).selectOption('September')
   await expect (accountsStatementPage.type).toBeVisible();
   await (accountsStatementPage.type).selectOption({ label: 'All' }); 
   await (accountsStatementPage.go_button).dblclick();
   console.log('before waiting');
    await delay(6000);
 
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState('networkidle');   

   
   await expect (accountsStatementPage.transactions_table).toBeVisible();
   const rowheaders_transactions =await accountsStatementPage.transactions_headers.allInnerTexts();
   console.log(rowheaders_transactions);
   var rowfields1 = [ 'Date', 'Transaction', 'Debit (-)', 'Credit (+)' ]
   let rowheadingsnew : string[] = [];
   for (const row_value of rowheaders_transactions)
   {
    rowheadingsnew.push(row_value);
   }
   console.log(rowheadingsnew);
   expect(rowheadingsnew).toEqual(rowfields1);
   const Row = await accountsStatementPage.transaction_rowvalues.count();

  for(let i =0;i<Row;i++)
  {
   let element = await page.locator("table[id=transactionTable] tbody tr td").nth(i).allInnerTexts();

  }
  console.log(await page.locator("table[id=transactionTable] tbody tr td").nth(1).innerText());
  
  console.log(await page.locator("table[id=transactionTable] tbody tr td").nth(2).innerText());
 
  console.log(await page.locator("table[id=transactionTable] tbody tr td").nth(4).innerText());
 
  expect(await page.locator("table[id=transactionTable] tbody tr td").nth(1).innerText()).toEqual('Funds Transfer Sent');
  expect(await page.locator("table[id=transactionTable] tbody tr td").nth(2).innerText()).toEqual('$');
  expect(await page.locator("table[id=transactionTable] tbody tr td").nth(4).innerText()).toContain('-2023');
  

   


});