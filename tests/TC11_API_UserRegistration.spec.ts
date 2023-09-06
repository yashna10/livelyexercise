const { test, expect ,chromium} = require('@playwright/test');
import AccountLoginPage from '../objects/AccountLoginPage'
const fs = require('fs');

test('Verify whether the user is able to perform the user Registration through API and validate whether the registered credentials could be logged in', async ({ page }) => {
 
  const r = Math.random().toString(22).substring(4, 7);
  const randomnfirstame = "yashna" + r;
  const randomLastName = "lawrence" + r;
  const randomnaddress= "Calle Rafael"+r;
  const randomcity ="Sevilla" + r;
  const randomstate = "Andaulasia" + r;
  const zipcode = "41002"
  const lastdigits = Math.floor((Math.random()*100000000)+1);
  const phone = "+346"+lastdigits;
  const ssnlast = Math.floor((Math.random()*10000000000)+1);
  const ssn = "20"+ssnlast;
  const username =randomnfirstame;
  const randompassword = "Test@"+r;
  const confirm =randompassword;
  

  const registrationData = {
    "customer": {
      "firstName": randomnfirstame,
      "lastName": randomLastName,
      "address": {
        "street": randomnaddress,
        "city": randomcity,
        "state": randomstate,
        "zipCode": zipcode,
      },
      "phoneNumber": phone,
      "ssn": ssn,
      "username": randomnfirstame,
      "password": randompassword,
    },
    "repeatedPassword": confirm,
  };

  const response = await page.goto('https://parabank.parasoft.com/parabank/register.htm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: registrationData }),
  });

  

  console.log(response.status());
  console.log(randomnfirstame, randompassword);
  const data = {
    randomnfirstame,
    randompassword,
  };


const jsonFilePath = './data.json';
fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

    let accountloginPage: AccountLoginPage;
    accountloginPage = new AccountLoginPage(page);

    // await accountloginPage.logout.click();

    await page.goto('https://parabank.parasoft.com/parabank/');

    const data1 = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    await (accountloginPage.username).fill(data.randomnfirstame);
    await (accountloginPage.password).fill(data.randompassword);
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


