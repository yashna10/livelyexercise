
const { test, expect ,chromium} = require('@playwright/test');
const { parseString } = require('xml2js');
import AccountsStatementPage from '../objects/AccountsStatementPage'
import { accountLoginTest,delay } from './CommonMethods';
const fs = require('fs');

let AccountBalance;

test('Verify whether the user is able to login to the application and fetch the available balance', async ({page }) => {

  accountLoginTest(page);
  let accountsStatementPage: AccountsStatementPage;
  
  await delay(2000);

  accountsStatementPage = new AccountsStatementPage(page);
  await expect(accountsStatementPage.accounts_Table ).toBeVisible();  
 const Rows = await accountsStatementPage.table_Rows.count();

  AccountBalance = await page.locator("table tbody tr td").nth(2).allInnerTexts();
  console.log(AccountBalance);

 
});

test('Verify whether the user is able to fetch the account Balance using API and validate whether it is the same as the one displayed in the UI', async ({ request }) => {

  const jsonFilePath = './data.json';
  const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

console.log('Username:', data.randomnfirstame);
console.log('Password:', data.randompassword);

  const apiUrl = 'https://parabank.parasoft.com/parabank/services/bank/login/' + data.randomnfirstame +'/' +data.randompassword


  // Send a GET request using request.get()
  const response = await request.get(apiUrl);
  console.log(AccountBalance);
  console.log(apiUrl);

  // Ensure the response status code is truthy (e.g., 200)
  await expect(response.status()).toBeTruthy();
  console.log(response.headers());


  const responseText = await response.text();
  let customerId;
  console.log(responseText);
  try {
    parseString(responseText, (err, result) => {
      if (err) {
        console.error('Error parsing XML response:', err);
      } else {
        // Extract and print the customer ID
        customerId = result.customer.id[0];
        console.log('Customer ID:', customerId);
      }
    });
  } catch (error) {
    console.error('Error reading XML response:', error);
  }
  console.log(customerId);
  const apistring = "https://parabank.parasoft.com/parabank/services/bank/customers/" + customerId +"/accounts"
  const response1 = await request.get(apistring);
  await delay(6000);
  const responseText1 = await response1.text();
  console.log(responseText1)
  let customerBalance;
  try {
    parseString(responseText1, (err, result) => {
      if (err) {
        console.error('Error parsing XML response:', err);
      } else {
        // Check if the 'account' element exists before accessing it
        if (result.accounts && result.accounts.account && result.accounts.account[0]) {
           customerBalance = result.accounts.account[0].balance[0];
          console.log('Account Balance:', customerBalance);
        } else {
          console.error('No account element found in the XML response');
        }
      }
    });
  } catch (error) {
    console.error('Error reading XML response:', error);
  }
  const customerfinalBalance = "$" + customerBalance;
  console.log(AccountBalance);

  expect(AccountBalance).toContainEqual(customerfinalBalance);
});







