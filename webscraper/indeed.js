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

module.exports  = (async () => { 
 async function getJob (url) {
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url);

    const jobs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#mosaic-provider-jobcards > a")).map(jobs => ({
        'Titel': jobs.querySelector('.jobTitle').innerText,
    'Link': jobs.href,
    'Lokation': jobs.querySelector('.companyLocation').innerText,
    'Virksomhed': jobs.querySelector('.companyName').innerText
            }))
    )


// Skal man afslutte recursion
if(jobs.length < 1){
return jobs
} else{
 const nextPageNumber = parseInt(url.match(/start=(\d+)$/)[1], 10) +10;
if(nextPageNumber == 100){
return jobs
}
 const nextUrl = `https://dk.indeed.com/jobs?q=Developer&fromage=15&radius=25&start=${nextPageNumber}`;
 return jobs.concat(await getJob(nextUrl));
}
};
const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
const firstUrl = "https://dk.indeed.com/jobs?q=Developer&fromage=15&radius=25&start=10"
const jobListe = await getJob(firstUrl);
const success = setAsync('indeed', JSON.stringify(jobListe));

console.log({success});


await browser.close();
})();

