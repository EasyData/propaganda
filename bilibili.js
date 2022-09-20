#!/usr/bin/env node

/*
 * bilibili hotlist
 */

const puppeteer = require('puppeteer-core');

(async () => {
  //const browser = await puppeteer.launch();
  const browser = await puppeteer.connect({browserWSEndpoint: 'ws://127.0.0.1:3000'});
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 720});
  await page.goto('https://search.bilibili.com/all');
  const input = await page.waitForSelector('.search-input-el');
  await input.click();
  await page.waitForSelector('.trending', {visible: true})
  const result = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.trending-item')).map(e => {
      const rank = e.querySelector('.trendings-rank').innerText;
      const title = e.querySelector('.trending-text').innerText;
      const tags = Array.from(e.querySelectorAll('.trending-mark')).map(e => {
        const src = e.getAttribute('src');
        if (src.indexOf('4d579fb61f9655316582db193118bba3a721eec0.png') >= 0) {
          return '新';
        } else if (src.indexOf('e9e7a2d8497d4063421b685e72680bf1cfb99a0d.png') >= 0) {
          return '热';
        } else {
          return '?';
        }
      });
      return {
        rank: rank,
        title: title,
        tags: tags,
        url: `https://search.bilibili.com/all?keyword=${encodeURIComponent(title)}`,
      };
    });
  });
  await page.screenshot({path: 'bilibili.png', fullPage: false});
  console.log(JSON.stringify(result, null, 2));
  await page.close();
  await browser.close();
})();
