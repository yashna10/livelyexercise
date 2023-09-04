
const { test, expect ,chromium} = require('@playwright/test');
const { parseString } = require('xml2js');
import AccountsStatementPage from '../objects/AccountsStatementPage'
import { accountLoginTest,delay } from './CommonMethods';
const fs = require('fs');

let trans_id ,trans_date ,trans_description , trans_type ,trans_amount;
let id,account_id,type,dates,amount,description,formattedDate,transaction_amount;

test('Logging to the application UI and fetching the transaction history', async ({page }) => {
  accountLoginTest(page);
  let accountsStatementPage: AccountsStatementPage;
  
  await delay(2000);

  accountsStatementPage = new AccountsStatementPage(page);
  console.log('before waiting');
    await delay(12000);
 
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState('networkidle');   
  await page.locator('a[href="/parabank/findtrans.htm"]').click();
  await expect(accountsStatementPage.find_transactions_header  ).toBeVisible();  
  await expect(accountsStatementPage.select_an_account).toBeVisible();
  await (accountsStatementPage.select_an_account).selectOption({ index: 0 });
  await expect(accountsStatementPage.find_by_date_Range ).toBeVisible();  
  await expect(accountsStatementPage.between).toBeVisible();  
  await expect(accountsStatementPage.and).toBeVisible();  
  await (accountsStatementPage.transaction_id).fill("18805");
  
  await accountsStatementPage.find_button.click();
  await expect(accountsStatementPage.transactions_table).toBeVisible();

  await expect (accountsStatementPage.transaction_results).toBeVisible();
 // await expect (accountsStatementPage.transaction_rowvalues).toBeVisible();
  await page.locator("//td//a").click();

  await expect (accountsStatementPage.transaction_Details).toBeVisible();

   const rowvalues =await accountsStatementPage.transaction_historytable.allInnerTexts();

   let rowheadingsnew : string[] = [];
   for (const row_value of rowvalues)
   {
    rowheadingsnew.push(row_value);
   }
 
   const regexPattern = /[\n\t]/g;
   //const resultArray = rowheadingsnew.map((str) => str.replace(regexPattern, ' '));
   const resultArray = rowheadingsnew.map((str) => str.split(regexPattern));
   console.log(resultArray);
   const innerArray = resultArray[0]; // Access the inner array

   for (let i = 0; i < innerArray.length; i++) {
     if (innerArray[i].toLowerCase().includes('date:')) {
      trans_date = innerArray[i + 1];
     } else if (innerArray[i].toLowerCase().includes('description:')) {
      trans_description = innerArray[i + 1];
     } else if (innerArray[i].toLowerCase().includes('type:')) {
      trans_type = innerArray[i + 1];
     } else if (innerArray[i].toLowerCase().includes('amount:')) {
      trans_amount = innerArray[i + 1];
     }
     if (innerArray[i].toLowerCase() === 'transaction id:') {
      trans_id = innerArray[i + 1];
    // Exit the loop once the Transaction ID is found
    }
   }
  

    console.log(trans_id ,trans_date ,trans_description , trans_type ,trans_amount);


});

test('Fetching the Transaction History using API', async ({ request }) => {
  
  const apiUrl = 'https://parabank.parasoft.com/parabank/services/bank/transactions/'+ trans_id;

 
  const response = await request.get(apiUrl);
  await expect(response.status()).toBeTruthy();
  const responseText = await response.text();
 

  try {
    parseString(responseText, (err, result) => {
      if (err) {
        console.error('Error parsing XML response:', err);
      } else {
        // Extract and print the customer ID
        id = result.transaction.id;
        account_id = result.transaction.accountId;
        type = result.transaction.type;
        dates = result.transaction.date;
        amount = result.transaction.amount;
        description = result.transaction.description;

        
        //const resultArray = rowheadingsnew.map((str) => str.replace(regexPattern, ' '));
        const resultdate = dates.map((str) => str.split("T"));
  
      
        const [date] = resultdate[0];
const [year, month, day] = date.split('-');
 formattedDate = `${month}-${day}-${year}`;
transaction_amount ="$"+ amount;
console.log(id,account_id,type,formattedDate,transaction_amount,description);
    }});
  } catch (error) {
    console.error('Error reading XML response:', error);
  }
expect(id[0]).toEqual(trans_id);
expect(type[0]).toEqual(trans_type);
expect(description[0]).toEqual(trans_description);
expect(formattedDate).toEqual(trans_date);
expect(trans_amount).toEqual(transaction_amount);

});
