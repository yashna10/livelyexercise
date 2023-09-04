    import { Page, Locator } from '@playwright/test';

    class AccountsStatementPage {
    
      page: Page;
      accounts_Table: Locator;
      table_headers: Locator;
      table_Rows: Locator;
      balance_Text: Locator;
      account_overview_header : Locator; 
      account_number: Locator;
      account_type: Locator;
      balance: Locator;
      available: Locator;
      account_Activity : Locator;
      activity_period : Locator;
      type : Locator;
      transactions_headers : Locator;
      transaction_rowvalues : Locator;
      go_button : Locator;
      transactions_table: Locator;
      find_transactions_header: Locator;
      select_an_account: Locator;
      transaction_id : Locator;
      find_by_date_Range: Locator;
      between: Locator;
      and: Locator;
      find_button: Locator;
      transaction_results : Locator;
      transaction_Details: Locator;
      transaction_historytable: Locator


    
    
    
      constructor(page: Page) {
        this.page =page;
        this.accounts_Table = page.locator("table[id='accountTable']");
        this.table_headers =  page.locator("table tr th");
        this.balance_Text = page.locator("td[colspan='3']");
        this.table_Rows = page.locator("table tbody tr td");
       
       
        this.account_overview_header = page.locator("//*[contains(text(),'Account Details')]");
        this.account_number  = page.locator("//tr//td[contains(text(),'Account Number')]/following-sibling::*");
        this.account_type  = page.locator("//tr//td[contains(text(),'Account Type')]/following-sibling::*");
        this.balance  = page.locator("//tr//td[contains(text(),'Balance')]/following-sibling::*");
        this.available = page.locator("//tr//td[contains(text(),'Available')]/following-sibling::*");
        this.account_Activity = page.locator("(//*[contains(text(),'Account Activity')])[2]");
        this.activity_period  = page.locator("select[id=month]");
        this.type  = page.locator("select[id=transactionType]");
        this.go_button  = page.locator("td input[type=submit]");
        this.transactions_table  = page.locator("table[id=transactionTable]");
        this.transactions_headers  = page.locator("table[id=transactionTable] tr th");
        this.transaction_rowvalues  = page.locator("table[id=transactionTable] tbody tr td");

        ////////////////////////Find_Transactions/////////////////////////////////////////////////
        this.find_transactions_header  = page.locator("(//*[contains(text(),'Find Transactions')])[3]");
        this.select_an_account  = page.locator("select[id=accountId]");
        this.find_by_date_Range  = page.locator("(//*[contains(text(),'Find by Date Range')])");
        this.between  = page.locator("input[id='criteria.fromDate']");
        this.and  = page.locator("input[id='criteria.toDate']");
        this.find_button = page.locator("(//button[@type='submit'])[1]");
        this.transaction_results = page.locator("//*[contains(text(),'Transaction Results')]");
        this.transaction_id = page.locator("input[id='criteria.transactionId']");
        this.transaction_Details = page.locator("(//*[contains(text(),'Transaction Details')])[2]")
        this.transaction_historytable = page.locator("table tbody");
    

        
    
      }
    
    
    
    }
    
    export default AccountsStatementPage;

