const puppeteer = require("puppeteer");

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

  await page.goto("http://www.jma.go.jp/jp/yoho/");

  await page.evaluate(() => {
    document.querySelector("select[name=elarealist]")[6].selected = true;
    goNextArea(document.querySelector("select[name=elarealist]").options[6].value);
  })

  await page.screenshot({ path: 'page.png', fullPage: 'true' });
  await browser.close();

})();