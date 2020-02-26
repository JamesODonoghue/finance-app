import { Balance } from './interfaces/interfaces';
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

const username = 'jodonogh1@gmail.com';
const password = 'Lizakroeschell1!';

@Injectable()
export class MintService {
  private readonly balance: Balance = {
    value: 4000,
    account: 'Simple card'
  }

  getBalance(): Balance {
    return this.balance
  }

  async login() {

    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time)
      });
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://mint.com', { waitUntil: 'load' });

    console.log('On: ', page.url());
    await page.waitForSelector('a[aria-label="Sign in"]')

    let signUrl = await page.evaluate(() => {
      let signinHref = document.querySelectorAll('a[aria-label="Sign in"]')[0].getAttribute('href');
      console.log(signinHref);
      return signinHref
    })

    await page.goto(signUrl)
    await page.waitForSelector('input[name="Email"]');
    await page.waitForSelector('#ius-sign-in-submit-btn');

    await page.type('input[name="Email"]', username);
    await page.type('input[name="Password"]', password);
    await page.click('#ius-sign-in-submit-btn');

    await delay(6000)

    await page.screenshot({ path: 'signin_page.png', fullPage: true });

    try {
      await page.waitForSelector('#module-accounts', { visible: true })
    } catch (ex) {
      console.error(ex);
    }
    await page.screenshot({ path: 'account_page.png', fullPage: true });

    console.log(page.url());
    // console.log('found balance');

    let balance = await page.evaluate(() => {
      return document.querySelectorAll('span[title="balance"]')[0].textContent;
    })
    await browser.close();

    return balance;

  }
}