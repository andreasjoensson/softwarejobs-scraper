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
    await page.goto(url);
    const button = await page.$('.close')
    await button.evaluate(button => button.click());
  
let jobs = await page.evaluate(() =>
Array.from(document.querySelectorAll('.jobsearch-result')).map(jobs => ({
  'Virksomhed': jobs.querySelector('.job-company').textContent,
  'Titel': jobs.querySelector('.job-title > a').textContent,
  'Lokation': jobs.querySelector('.job-location')  ? jobs.querySelector('.job-location').textContent : "No data",
  'Link': jobs.querySelector('.job-title > a').href     
  }))
)  



// Skal man afslutte recursion
if(jobs.length < 1){
return jobs
} else{
 const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) +1;
 const nextUrl = `https://www.it-jobbank.dk/job/software-webudvikling?page=${nextPageNumber}`;
 return jobs.concat(await getJob(nextUrl))
}
};
const browser = await puppeteer.launch({headless:false});
const firstUrl = "https://www.it-jobbank.dk/job/software-webudvikling?page=1"
const jobListe = await getJob(firstUrl);
const success = setAsync('jobliste', JSON.stringify(jobListe))
console.log({success});

await browser.close();
})();