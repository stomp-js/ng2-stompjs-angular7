import { AppPage } from './app.po';
import { browser, ExpectedConditions } from 'protractor';

describe('Trivial test example', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Send and receive a message', async () => {
    await page.navigateTo();
    await browser.wait(ExpectedConditions.textToBePresentInElement(page.getStatusLabel(), 'OPEN'), 5000);

    await page.getSendMessageBtn().click();

    await browser.wait(ExpectedConditions.presenceOf(page.getMessageNode()), 2000);

    expect(await page.getMessageNode().getText()).toContain('Message');
  });
});
