import { browser, by, element } from 'protractor';

export class SigninPage {

  navigateTo() {
    return browser.get('/signin');
  }
  getUsernameTextbox() {
    return element(by.name('username'));
  }
  getPasswordTextbox() {
    return element(by.name('password'));
  }
  getSubmitButton() {
    return element(by.css('#btnSubmit'));
  }
  getUsernameErrorMsg() {
    return element(by.css('#username-error-msg'));
  }
  getPasswordErrorMsg() {
    return element(by.css('#password-error-msg'));
  }
  getError() {
    return element(by.css('.error'));
  }
  getForm() {
    return element(by.css('#loginForm'));
  }
  getMatFormField1() {
    return element(by.css('#username-container mat-form-field'));
  }
  getMatFormField2() {
    return element(by.css('#password-container mat-form-field'));
  }
}
