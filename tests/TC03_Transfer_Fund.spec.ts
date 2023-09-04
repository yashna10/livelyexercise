import {test,expect, chromium} from '@playwright/test';
import AccountLoginPage from '../objects/AccountLoginPage'
import TransferFundPage from '../objects/TransferFundPage'
import { accountLoginTest,delay } from './CommonMethods.spec';



test('Run Account Login Test', async ({ page }) => {
     accountLoginTest(page);
    let transferFundPage: TransferFundPage;

    await delay(6000);
    transferFundPage = new TransferFundPage(page);
    await expect(transferFundPage.transfer_funds).toBeVisible();
    await transferFundPage.transfer_fundslink.click()
    await delay(2000);

    
    try {
        await page.waitForSelector("h1.title" , { timeout: 5000 });
        console.log('Element is visible.');
        expect(transferFundPage.transfer_header).toBeVisible();
      } catch (error) {
        console.error('Element is not visible');
      }
      await expect(transferFundPage.amount).toBeVisible();
      await (transferFundPage.amount).fill("100");


    await expect(transferFundPage.from_account).toBeVisible();
    await (transferFundPage.from_account).selectOption({ index: 0 })
    const from_Acc = await transferFundPage.selectedfromaccount_id.innerText();
    console.log(from_Acc);


    await expect(transferFundPage.to_account).toBeVisible();
    await (transferFundPage.to_account).selectOption({ index: 0 });
    const to_Acc = await transferFundPage.selected_to_account_id.textContent();
    console.log(to_Acc);
    

    await expect(transferFundPage.transferbutton).toBeVisible();
    await (transferFundPage.transferbutton).click();

    await delay(3000);

    await expect(transferFundPage.transfer_completeheader).toBeVisible();
    await expect((transferFundPage.transfer_completeheader)).toHaveText('Transfer Complete!');
    await expect(transferFundPage.transfer_completemessage).toBeVisible();

    let transfer_Complete=  await (transferFundPage.transfer_completemessage).innerText();

    let transfer_message = "$100.00"+ " has been transferred from account " + "#"+ from_Acc + " to account #" + to_Acc + "."
    console.log(transfer_Complete);

    expect(transfer_message).toEqual(transfer_Complete);
    await expect((transferFundPage.transfer_secondline)).toHaveText('See Account Activity for more details.');
    
    
    })

