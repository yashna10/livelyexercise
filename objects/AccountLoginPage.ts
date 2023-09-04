import { Page, Locator ,expect} from '@playwright/test';

class AccountsLoginPage {
    newPage: Page;
    username: Locator;
    password:Locator;
    login:Locator;
    welcome:Locator;
    account_Creation_success_message:Locator;
    transfer_funds: Locator;
    bill_payment: Locator;
    request_loan: Locator;
    find_transaction : Locator;
    update_profile: Locator;
  
  
    constructor(newPage: Page) {
      
     this.newPage =newPage;
     this.username = newPage.locator("input[name='username']");
     this.password  = newPage.locator("input[name='password']");
     this.login =  newPage.locator('div input[type=submit]');
     this.welcome = newPage.locator("p.smallText");
     this.account_Creation_success_message = newPage.locator("h1.title");
     this.transfer_funds = newPage.locator('a[href="/parabank/transfer.htm"]');
     this.bill_payment = newPage.locator('a[href="/parabank/billpay.htm"]');
     this.request_loan = newPage.locator('a[href="/parabank/requestloan.htm"]');
     this.find_transaction = newPage.locator('a[href="/parabank/findtrans.htm"]');
     this.update_profile = newPage.locator('a[href="/parabank/updateprofile.htm"]');
     this.logout = newPage.locator('a[href="/parabank/logout.htm"]');
    }
  
  
  
  

}

export default AccountsLoginPage;

