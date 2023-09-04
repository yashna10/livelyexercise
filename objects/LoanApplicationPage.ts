import { Page, Locator } from '@playwright/test';

class LoanApplicationPage {
  page: Page;
  Apply_for_a_Loan_header: Locator;
  LoanAmount: Locator;
  DownPayment: Locator;
  FromAcc: Locator;
  ApplyNow: Locator;
  Loan_Request_Processed: Locator;
  Loan_Provider: Locator;
  Loan_Date: Locator;
  Status: Locator;
  Loan_Approved_Message: Locator;
  account_number_new: Locator;
  request_loan: Locator;
 



  constructor(page: Page) {
    
   this.page =page;
   this.LoanAmount = page.locator("input[id=amount]");
   this.DownPayment = page.locator("input[id=downPayment]");
   this.FromAcc = page.locator("select[id=fromAccountId]");
   this.ApplyNow = page.locator("input[type=submit]");
   this.Apply_for_a_Loan_header = page.locator("h1.title");
   this.Loan_Request_Processed = page.locator("//*[contains(text(),'Loan Request Processed')]");
   this.Loan_Provider = page.locator("//*[contains(text(),'Loan Provider:')]/ancestor::tr//td[contains(text(),'ParaBank')]");
   this.Loan_Date = page.locator("//*[contains(text(),'Date')]/ancestor::tr//td[contains(text(),'-2023')]");
   this.Status = page.locator("//*[contains(text(),'Status')]/ancestor::tr//td[contains(text(),'Approved')]");
   this.Loan_Approved_Message = page.locator("//*[contains(text(),'Congratulations, your loan has been approved.')]");
   this.account_number_new = page.locator("//*[contains(text(),'Your new account number:')]/ancestor::p//a");
   this.request_loan = page.locator('a[href="/parabank/requestloan.htm"]');

   

 

  }



}

export default LoanApplicationPage;