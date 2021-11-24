const { Cluster } = require('puppeteer-cluster');

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 3,
    puppeteerOptions: {
      headless: false,
      executablePath: 'C:\\Users\\minhm\\Downloads\\chrome-win\\chrome.exe',
    },
    timeout: Math.pow(2, 30),
    monitor: true,
  });

  cluster.on('taskerror', (err, data, willRetry) => {
    console.log(err.message);
  });

  for (let i = 0; i < 5; i++) {
    cluster.queue(async ({ page }) => {
      page.setDefaultTimeout(0);
      await page.goto('https://youtube.com/watch?v=GAoetgUHE3A&feature=share');
      await page.click('.ytp-play-button');
      await page.waitForTimeout(270000);
    });
  }

  await cluster.idle();
  await cluster.close();
})()