const puppeteer = require("puppeteer");

/**
 * メインロジック
 */
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto("https://www.shuwasystem.co.jp/");

  await page.waitForSelector('#newsBlock');

  const newBook = await page.evaluate((selector) => {
    return document.querySelector(selector).innerHTML;
  }, '#newsBlock');

  console.log(newBook);

  await browser.close();

})();
