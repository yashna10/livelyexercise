import {test,expect, chromium} from '@playwright/test';
import UserRegistrationPage from '../objects/UserRegistrationPage';
import ProfileUpdatePage from '../objects/ProfileUpdatePage';
import AccountLoginPage from '../objects/AccountLoginPage'
import { accountLoginTest,delay } from './CommonMethods.spec';

test('Register the User and do the profile Update after registering', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.html');

    await page.click('text=Register');
    
    // Expects the URL to contain about.htm.
    await expect(page).toHaveURL(/.*register.htm/);
    let registerpage: UserRegistrationPage;
    let profileUpdatePage: ProfileUpdatePage;
    let accountloginPage: AccountLoginPage;
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
    
    accountloginPage = new AccountLoginPage(page);
    await accountloginPage.update_profile.click();


    await delay(2000);
    profileUpdatePage = new ProfileUpdatePage(page);
    await expect(profileUpdatePage.firstname).toBeVisible();
    await expect(profileUpdatePage.lastname).toBeVisible();
    await expect(profileUpdatePage.address).toBeVisible();
    await expect(profileUpdatePage.city).toBeVisible();
    await expect(profileUpdatePage.state).toBeVisible();
    await expect(profileUpdatePage.zipcode).toBeVisible();
    await expect(profileUpdatePage.phone).toBeVisible();
    await expect(profileUpdatePage.update_profile).toBeVisible();
    

    await (profileUpdatePage.firstname).clear();
    await (profileUpdatePage.firstname).fill(randomnfirstame + r);

    await (profileUpdatePage.lastname).clear();
    await (profileUpdatePage.lastname).fill(randomnlastname + r);

    await (profileUpdatePage.address).clear();
    await (profileUpdatePage.address).fill("Avenida");

    await (profileUpdatePage.city).clear();
    await (profileUpdatePage.city).fill("Barcelona");

    await (profileUpdatePage.state).clear();
    await (profileUpdatePage.state).fill("Catalonia");

    await (profileUpdatePage.zipcode).clear();
    await (profileUpdatePage.zipcode).fill("08001");

    await (profileUpdatePage.phone).clear();
    await (profileUpdatePage.phone).fill("+34567890123");

    await (profileUpdatePage.update_profile).click();await expect(profileUpdatePage.updatedmessage).toBeVisible();
   
    await expect(profileUpdatePage.updatedmessage).toBeVisible();
    
    const message = await (profileUpdatePage.updatedmessage).innerText();
    await expect(message).toEqual('Your updated address and phone number have been added to the system.');
    console.log(await accountloginPage.welcome.innerText());
    
   
    let welcomemessage = "Welcome "+ randomnfirstame+ " " + randomnlastname 
    console.log(welcomemessage)
    expect(await accountloginPage.welcome.innerText()).toContain("Welcome")


    }
);