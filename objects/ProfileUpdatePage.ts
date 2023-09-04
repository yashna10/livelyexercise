import { Page, Locator ,expect} from '@playwright/test';

class ProfileUpdatePage {
    newPage: Page;
    firstname: Locator;
    lastname:Locator;
    address:Locator;
    city:Locator;
    state:Locator;
    zipcode: Locator;
    phone: Locator;
    update_profile: Locator;
    updatedmessage: Locator;
  
    constructor(newPage: Page) {
      
     this.newPage =newPage;
     this.firstname = newPage.locator("input[id='customer.firstName']");
     this.lastname  = newPage.locator("input[id='customer.lastName']");
     this.address =  newPage.locator("input[id='customer.address.street']");
     this.city = newPage.locator("input[id='customer.address.city']");
     this.state = newPage.locator("input[id='customer.address.state']");
     this.zipcode = newPage.locator("input[id='customer.address.zipCode']");
     this.phone = newPage.locator("input[id='customer.phoneNumber']");
     this.update_profile = newPage.locator("input[type='submit']");
     this.updatedmessage = newPage.locator("//*[contains(text(),'Your updated address and phone number have been added to the system.')]")
    }
  
  
  
  

}

export default ProfileUpdatePage;

