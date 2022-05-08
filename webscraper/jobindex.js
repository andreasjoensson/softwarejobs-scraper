const puppeteer = require('puppeteer');
const redis = require("redis");
const client = redis.createClient("redis://:p2ec03b7b9eaa747c4b0d5cffe393f3d1ff1bfc866fdef5551aa9df07220514c2@ec2-34-250-1-27.eu-west-1.compute.amazonaws.com:19040",{
  tls: {
      rejectUnauthorized: false
  },
  legacyMode: true
});
const {promisify} = require("util");
const setAsync = promisify(client.set).bind(client);

module.exports =  (async () => {
async function getJob (url) {
  const page = await browser.newPage();
    await page.goto(url);

    /*
    const button = await page.$('.close')
    await button.evaluate(button => button.click());
    */

let jobs = await page.evaluate(() =>
Array.from(document.querySelectorAll('.PaidJob')).map(jobs => ({
  'Virksomhed': jobs.querySelector('p > a').innerText,
  'Lokation':  jobs.querySelector(' p').innerText.split(",").splice(1,1).toString(),
  'Titel': jobs.querySelector('a > b').innerText,
  'Link': jobs.querySelector('a').href
  }))
)  
// Skal man afslutte recursion
if(jobs.length < 1){
return jobs
} else{


  
 const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) +1;
 if(nextPageNumber == 18){
    return jobs  
  }
 const nextUrl = `https://www.jobindex.dk/jobsoegning/it/systemudvikling?page=${nextPageNumber}`;
 return jobs.concat(await getJob(nextUrl))
}
};
const browser = await puppeteer.launch({
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
  ],
});
const firstUrl = "https://www.jobindex.dk/jobsoegning/it/systemudvikling?page=1"
const jobListe = await getJob(firstUrl);
const success = setAsync('jobindex', JSON.stringify(jobListe))
console.log({success});

await browser.close();
})();