import { browser, by, element } from 'protractor';
export class BooksComponentPage {
  clickTheLoadButton() {
    const el = element(by.css('[data-books-load]'));
    return el.click();
  }
  getFirstItemOnTheList(): any {
    const el = element(by.css('[data-book-item="0"]'));
    return el.getText();

  }
  navigateTo() {
    return browser.get('/books');
  }



}
