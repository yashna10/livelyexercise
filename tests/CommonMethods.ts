import {test,expect, chromium} from '@playwright/test';
import AccountLoginPage from '../objects/AccountLoginPage'
const fs = require('fs');



export async function accountLoginTest(page) {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    let accountloginPage: AccountLoginPage;
    accountloginPage = new AccountLoginPage(page);

    const jsonFilePath = './data.json';
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

  console.log('Username:', data.randomnfirstame);
  console.log('Password:', data.randompassword);

    await expect(accountloginPage.username).toBeVisible();
    await (accountloginPage.username).fill(data.randomnfirstame);

    await expect(accountloginPage.password).toBeVisible();
    await (accountloginPage.password).fill(data.randompassword);

    await expect(accountloginPage.login).toBeVisible();
    await (accountloginPage.login).click();

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }

    console.log('before waiting');
    await delay(6000);
 
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState('networkidle');   

    await expect(accountloginPage.welcome).toBeVisible();
    }

    export async function delay(time) {
      return new Promise(function(resolve) { 
          setTimeout(resolve, time)
      });
   }
    

