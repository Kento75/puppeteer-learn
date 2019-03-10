const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50
  })

  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto("https://ana.co.jp/");

  await page.evaluate(() => {
    document.querySelector("#m_ticket02").checked = true;
  });

  await page.screenshot({ path: 'page.png', fullPage: 'true' });

  await browser.close();
})();
