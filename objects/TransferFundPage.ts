import { Page, Locator } from '@playwright/test';

class TransferFundPage {

  page: Page;
  transfer_funds: Locator;
  transfer_header: Locator;
  amount: Locator;
  from_account: Locator;
  to_account: Locator;
  transferbutton: Locator;
  transfer_completeheader :Locator;
  transfer_completemessage:Locator;
  transfer_secondline: Locator;
  selectedfromaccount_id: Locator;
  selected_to_account_id: Locator;
  transfer_fundslink: Locator;



  constructor(page: Page) {
    this.page =page;
    this.transfer_funds = page.locator("(//*[contains(text(),'Transfer Funds')])");
    this.transfer_header = page.locator("h1.title");
    this.selectedfromaccount_id = page.locator("(//option[@selected='selected'])[1]");
    this.selected_to_account_id = page.locator("(//select[@id='toAccountId']//option)[1]");
    this.amount =  page.locator("input[id='amount']");
    this.from_account = page.locator("select[id='fromAccountId']");
    this.to_account = page.locator("select[id='toAccountId']");
    this.transferbutton = page.locator("input[type='submit']");
    this.transfer_completeheader = page.locator("h1.title");
    this.transfer_completemessage = page.locator("(//div//p)[3]");
    this.transfer_secondline = page.locator("(//div//p)[4]");
    this.transfer_fundslink = page.locator('a[href="/parabank/transfer.htm"]');

  }



}

export default TransferFundPage;