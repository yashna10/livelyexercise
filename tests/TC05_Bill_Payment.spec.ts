import {test,expect, chromium} from '@playwright/test';
import AccountLoginPage from '../objects/AccountLoginPage'
import BillPaymentPage from '../objects/BillPaymentPage'
import { accountLoginTest,delay } from './CommonMethods.spec';


test('Generating account Statement', async ({page }) => {

    let billPaymentPage: BillPaymentPage;

    accountLoginTest(page);

    billPaymentPage = new BillPaymentPage(page);

    await billPaymentPage.bill_payment_link.click()

    await delay(2000);

    await expect(billPaymentPage.billpayment_header ).toBeVisible();
    
    await expect(billPaymentPage.payee_name).toBeVisible();
    let r = (Math.random()).toString(22).substring(4,7);
    let randomnpayeename = "yashna"+r;
    await (billPaymentPage.payee_name).fill(randomnpayeename);


   
    await expect(billPaymentPage.payee_address).toBeVisible();
    let randomnaddress= "Calle Rafael"+r;
    await (billPaymentPage.payee_address).fill(randomnaddress);

    await expect(billPaymentPage.payee_City).toBeVisible();
    await (billPaymentPage.payee_City).fill("Sevilla");

    await expect(billPaymentPage.payee_State).toBeVisible();
    await (billPaymentPage.payee_State).fill("Andaulasia");

    await expect(billPaymentPage.payee_zipcode).toBeVisible();
    await (billPaymentPage.payee_zipcode).fill("41002");
   
    let lastdigits = Math.floor((Math.random()*100000000)+1);
    let randomphone = "+346"+lastdigits;
  
    await expect(billPaymentPage.payee_phonenumber).toBeVisible();
    await (billPaymentPage.payee_phonenumber).fill(randomphone);

    let account = Math.floor((Math.random()*1000000)+1);
    let random_acc = "20"+account;

    await expect(billPaymentPage.payee_Accountnumber).toBeVisible();
    await (billPaymentPage.payee_Accountnumber).fill(random_acc);
    await (billPaymentPage.verify_Acc).fill(random_acc);

   

    await expect(billPaymentPage.amount).toBeVisible();
    await (billPaymentPage.amount).fill("100");

    await expect(billPaymentPage.fromaccount_id).toBeVisible();
    await (billPaymentPage.fromaccount_id).selectOption({ index: 0 })
    const from_Acc = await billPaymentPage.selectedfromaccount_id.innerText();
    console.log(from_Acc);
    await (billPaymentPage.send_payment).click();
    await delay(6000);
 
    await expect(billPaymentPage.billpayment_complete).toBeVisible();
    await expect(billPaymentPage.billpayment_complete).toHaveText('Bill Payment Complete');
    
    let billpayment_success=  await page.locator("//p[contains(text(),'Bill Payment to')]").innerText();
    console.log(billpayment_success);

    let billpayment_message = "Bill Payment to " +randomnpayeename +" in the amount of $100.00 from account " + from_Acc + " was successful."
    console.log(billpayment_message);
    expect(billpayment_message).toEqual(billpayment_success);

});