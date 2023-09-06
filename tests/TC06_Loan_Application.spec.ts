import {test,expect, chromium} from '@playwright/test';
import LoanApplicationPage from '../objects/LoanApplicationPage'
import { accountLoginTest,delay } from './CommonMethods';

test('Verify whether the user is able to Request for a loan  and validate the success message', async ({ page}) => {

    accountLoginTest(page);
    let loanApplicationPage: LoanApplicationPage;
    await delay(2000);

    loanApplicationPage = new LoanApplicationPage(page);

    await loanApplicationPage.request_loan.click();

  
    await expect(loanApplicationPage.Apply_for_a_Loan_header ).toBeVisible();
    await expect(loanApplicationPage.LoanAmount ).toBeVisible();
    await (loanApplicationPage.LoanAmount ).fill("1000");
    await expect(loanApplicationPage.DownPayment ).toBeVisible();
    await (loanApplicationPage.DownPayment ).fill("10");
    await expect(loanApplicationPage.FromAcc ).toBeVisible();
    await (loanApplicationPage.FromAcc ).selectOption({ index: 0 })
    await expect(loanApplicationPage.ApplyNow ).toBeVisible();
    await (loanApplicationPage.ApplyNow ).click();

    await delay(4000);

    await expect(loanApplicationPage.Loan_Request_Processed ).toBeVisible();
    await expect(loanApplicationPage.Loan_Provider ).toBeVisible();
    await expect(loanApplicationPage.Loan_Date ).toBeVisible();
    await expect(loanApplicationPage.Status ).toBeVisible();
    await expect((loanApplicationPage.Status )).toHaveText('Approved');
    await expect(loanApplicationPage.Loan_Approved_Message ).toBeVisible();
    await expect((loanApplicationPage.Loan_Approved_Message )).toHaveText('Congratulations, your loan has been approved.');
    await expect(loanApplicationPage.account_number_new ).toBeVisible();
   let newnumber = await loanApplicationPage.account_number_new.innerText();
   console.log("The new account number is " + newnumber);

});