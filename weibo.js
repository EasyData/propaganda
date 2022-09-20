#!/usr/bin/env node

/*
 * weibo hotlist
 */

const puppeteer = require('puppeteer-core');

(async () => {
  //const browser = await puppeteer.launch();
  const browser = await puppeteer.connect({browserWSEndpoint: 'ws://127.0.0.1:3000'});
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 720*8});
  await page.goto('https://weibo.com/newlogin?tabtype=search&openLoginLayer=0&url=');
  await page.waitForSelector('#app');
  await page.waitForTimeout(5000);
  const result = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div[class^="HotTopic_item_"]')).map(e => {
      const rank = e.querySelector('span[class^="HotTopic_ranknum_"]');
      const title = e.querySelector('div[class^="HotTopic_tit_"]');
      const score = e.querySelector('div[class^="HotTopic_num_"]>span');
      const tags = e.querySelectorAll('span.wbpro-icon-search-2');
      const isTop = e.querySelectorAll('img[class^="HotTopic_ranktop_"]').length > 0;
      const getText = (elm) => elm ? elm.innerText.trim() : null;
      const getNumber = (txt) => txt ? parseInt(/\d+/.exec(txt)[0]) : null;
      return {
        rank: getNumber(getText(rank)),
        title: getText(title),
        score: getNumber(getText(score)),
        tags: Array.from(tags).map((e) => e.innerText.trim()).concat(isTop ? ['置顶'] : []),
        url: `https://s.weibo.com/weibo?q=%23${encodeURIComponent(getText(title))}%23`,
      };
    });
  });
  await page.screenshot({path: 'weibo.png', fullPage: false});
  console.log(JSON.stringify(result, null, 2));
  await page.close();
  await browser.close();
})();
