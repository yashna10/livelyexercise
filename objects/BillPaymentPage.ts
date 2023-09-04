import { Page, Locator,expect } from '@playwright/test';

class BillPaymentsPage {
  page: Page;
  billpayment_header : Locator;
  payee_name : Locator;
  payee_address : Locator;
  payee_City: Locator;
  payee_State: Locator;
  payee_zipcode: Locator;
  payee_phonenumber: Locator;
  payee_Accountnumber: Locator;
  verify_Acc: Locator;
  amount: Locator;
  fromaccount_id : Locator;
  send_payment : Locator;
  billpayment_complete : Locator;
  billpayment_message :Locator;
  selectedfromaccount_id: Locator;
  bill_payment_link: Locator;
  
 

  constructor(page: Page) {
    this.page = page;
    this.billpayment_header = page.locator("//*[text()='Bill Payment Service']");
    this.payee_name = page.locator("[name='payee.name']");
    this.payee_address = page.locator("[name='payee.address.street']");
    this.payee_City = page.locator("[name='payee.address.city']");
    this.payee_State = page.locator("[name='payee.address.state']");
    this.payee_zipcode = page.locator("[name='payee.address.zipCode']");
    this.payee_phonenumber = page.locator("[name='payee.phoneNumber']");
    this.payee_Accountnumber = page.locator("[name='payee.accountNumber']");
    this.verify_Acc = page.locator("[name='verifyAccount']");
    this.amount = page.locator("[name='amount']");
    this.fromaccount_id = page.locator("[name='fromAccountId']");
    this.selectedfromaccount_id = page.locator("option[selected=selected]");
    this.send_payment = page.locator("[type='submit']");
    this.billpayment_complete = page.locator("//*[text()='Bill Payment Complete']");
    this.billpayment_message = page.locator("div[ng-show=showResult] p");
    this.bill_payment_link = page.locator('a[href="/parabank/billpay.htm"]');
   


  }


  
    
}

export default BillPaymentsPage;