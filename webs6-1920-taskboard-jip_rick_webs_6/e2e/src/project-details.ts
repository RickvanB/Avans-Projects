import { browser, element, by } from 'protractor';

export class projectDetails {
    navigateTo() : Promise<unknown> {
        return browser.get('/test%20project%202/details') as Promise<unknown>
    }

    getColumnTitlesText(): Promise<string> {
        return element(by.css('.title')).getText() as Promise<string>;
    }
}