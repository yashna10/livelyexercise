import { Page, Locator,expect } from '@playwright/test';

class UserRegistrationPage {
  newPage: Page;
  register:Locator;
  firstname:Locator;
  lastname:Locator;
  address:Locator;
  city:Locator;
  state:Locator;
  zipcode:Locator;
  phone:Locator;
  ssn:Locator;
  username:Locator;
  password :Locator;;
  confirm:Locator;
  submit:Locator;
  welcome:Locator;
  account_Creation_success_message:Locator;


  constructor(newPage: Page) {
    
   this.newPage =newPage;
   this.register = newPage.locator("text=Register");
   this.firstname = newPage.locator('input[name="customer.firstName"]');
   this.lastname  = newPage.locator('input[name="customer.lastName"]');
   this.address =  newPage.locator('input[name="customer.address.street"]');
   this.city =  newPage.locator('input[name="customer.address.city"]');
   this.state =  newPage.locator('input[name="customer.address.state"]');
   this.zipcode  = newPage.locator('input[name="customer.address.zipCode"]');  
   this.phone =  newPage.locator('input[name="customer.phoneNumber"]');
   this.ssn  = newPage.locator('input[name="customer.ssn"]');
   this.username  = newPage.locator('input[name="customer.username"]');
   this.password  = newPage.locator('input[name="customer.password"]');
   this.confirm =  newPage.locator('input[name="repeatedPassword"]');
   this.submit = newPage.locator("td input[type=submit]");
   this.welcome = newPage.locator("h1.title");
   this.account_Creation_success_message = newPage.locator("text=Your account was created successfully. You are now logged in.");
 

  }



}

export default UserRegistrationPage;