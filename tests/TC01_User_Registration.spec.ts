import {test,expect, chromium} from '@playwright/test';
import UserRegistrationPage from '../objects/UserRegistrationPage';
const fs = require('fs');


test('Register the User', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/');

    await page.click('text=Register');
    
    await expect(page).toHaveURL(/.*register.htm/);
    let registerpage: UserRegistrationPage;
    registerpage = new UserRegistrationPage(page);

    await expect(registerpage.firstname).toBeVisible();
    let r = (Math.random()).toString(22).substring(4,7);
    let randomnfirstame = "yashna"+r;
    await (registerpage.firstname).fill(randomnfirstame);


    await expect(registerpage.lastname).toBeVisible();
    let randomnlastname = "lawrence"+r;
    await (registerpage.lastname).fill(randomnlastname);

    await expect(registerpage.address).toBeVisible();
    let randomnaddress= "Calle Rafael"+r;
    await (registerpage.address).fill(randomnaddress);

    await expect(registerpage.city).toBeVisible();
    await (registerpage.city).fill("Sevilla");

    await expect(registerpage.state).toBeVisible();
    await (registerpage.state).fill("Andaulasia");

    await expect(registerpage.zipcode).toBeVisible();
    await (registerpage.zipcode).fill("41002");
   
    let lastdigits = Math.floor((Math.random()*100000000)+1);
    let randomphone = "+346"+lastdigits;
  
    await expect(registerpage.phone).toBeVisible();
    await (registerpage.phone).fill(randomphone);

    let ssnlast = Math.floor((Math.random()*10000000000)+1);
    let random_ssn = "20"+ssnlast;

    await expect(registerpage.ssn).toBeVisible();
    await (registerpage.ssn).fill(random_ssn);

    await expect(registerpage.username).toBeVisible();
    await (registerpage.username).fill(randomnfirstame);

    await expect(registerpage.password).toBeVisible();
    let randompassword = "Test@"+r;
    await (registerpage.password).fill(randompassword);

    await expect(registerpage.confirm).toBeVisible();
    await (registerpage.confirm).fill(randompassword);
    console.log(randompassword);
    await (registerpage.submit).click();

    const data = {
        randomnfirstame,
        randompassword,
      };
    

    const jsonFilePath = './data.json';
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));

    

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }

    console.log('before waiting');
    await delay(6000);
 
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState('networkidle');   

    await expect(registerpage.welcome).toBeVisible();
    let welcome_Text = await registerpage.welcome.innerText();
    console.log(welcome_Text);
    let validation_welcome_message = "Welcome"+ " " +randomnfirstame;
    
    expect(welcome_Text).toEqual(validation_welcome_message);
    await expect(registerpage.account_Creation_success_message).toBeVisible();
    await expect((registerpage.account_Creation_success_message )).toHaveText('Your account was created successfully. You are now logged in.');
    
    }
);