import {test,expect, chromium} from '@playwright/test';
import AccountLoginPage from '../objects/AccountLoginPage'
const fs = require('fs');




  test('Account Login Test', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    let accountloginPage: AccountLoginPage;
    accountloginPage = new AccountLoginPage(page);

    const jsonFilePath = 'D:/Lively/automation-exercise/data.json';
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
    let welcome_Text = await accountloginPage.welcome.allInnerTexts();
    console.log(welcome_Text);
    expect(await accountloginPage.welcome.innerText()).toContain("Welcome")
    await expect(accountloginPage.account_Creation_success_message).toBeVisible();
    let account_overview = await accountloginPage.account_Creation_success_message.allInnerTexts();
    expect(account_overview).toContainEqual("Accounts Overview");
    
    }

  );

