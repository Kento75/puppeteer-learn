const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

/**
 * メインロジック
 */
(async () => {
  // 起動
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto("https://www.google.co.jp/");

  const image = await page.$("#lga img");
  console.log(image);

  // 取得したタグのsrc属性を取得する
  const src = await image.getProperty("src");
  const targetUrl = await src.jsonValue();

  // ファイル名部分のみ取得
  const filename = targetUrl.split("/").pop();

  const localfilefullpath = path.join(__dirname, filename);

  const viewSource = await page.goto(targetUrl);
  fs.writeFile(localfilefullpath, await viewSource.buffer(), (error) => {
    if (error) {
      console.log(`error=${error}`);
      return;
    }
  });
  await browser.close();
})();