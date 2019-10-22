import { browser, by, element } from 'protractor';

export class HeaderPage {

  navigateTo() {
    return browser.get('/signin');
  }
  getHeaderinfo() {
    return element(by.css('.headerinfo'));
  }

  logOut() {
    return element(by.css('button')).click();
  }
}
