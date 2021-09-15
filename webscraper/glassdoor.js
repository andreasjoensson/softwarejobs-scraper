const puppeteer = require('puppeteer');
const redis = require("redis");

const client = redis.createClient("database",{
  tls: {
      rejectUnauthorized: false
  }
});
const {promisify} = require("util");
const setAsync = promisify(client.set).bind(client);

module.exports = (async () => {
async function getJob (url) {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url);

    const jobs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.hover > li')).map(jobs => ({
      'Virksomhed': jobs.querySelector('.e1n63ojh0 > span').innerText,
      'Link': jobs.querySelector('.jobLink').href,
      'Titel':jobs.querySelector('.eigr9kq2 > span').innerText,
      'Lokation': jobs.querySelector('.e1rrn5ka0').innerText,
        }))
    )


// Skal man afslutte recursion
if(jobs.length < 1){
return jobs
} else{
 const nextPageNumber = parseInt(url.match(/\IP(\d*)/)[1], 10) +1;
if(nextPageNumber == 12){
return jobs
}
 const nextUrl = `https://www.glassdoor.com/Job/denmark-developer-jobs-SRCH_IL.0,7_IN63_KO8,17_IP${nextPageNumber}.htm`;
 return jobs.concat(await getJob(nextUrl));
}
};
const browser = await puppeteer.launch({headless:false});
const firstUrl = "https://www.glassdoor.com/Job/denmark-developer-jobs-SRCH_IL.0,7_IN63_KO8,17_IP1.htm"
const jobListe = await getJob(firstUrl);
const success = setAsync('glassdoor', JSON.stringify(jobListe));

console.log({success});


await browser.close();
})();



