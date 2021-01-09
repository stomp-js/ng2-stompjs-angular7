import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getStatusLabel() {
    return element(by.id('status-label'));
  }

  getMessageNode() {
    return element(by.css('#messages ol li.message'));
  }

  getSendMessageBtn() {
    return element(by.css('#messages button'));
  }
}
