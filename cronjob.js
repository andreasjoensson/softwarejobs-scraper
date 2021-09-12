let Indeed = require('./webscraper/indeed');
let Glassdoor = require('./webscraper/glassdoor');
let ITJobbank = require('./webscraper/it-jobbank');
let JobIndex = require('./webscraper/jobindex');

let CronJob = require('cron').CronJob;
let jobs = new CronJob('0 23 * * *', function () {
    Indeed()
    Glassdoor()
    ITJobbank()
    JobIndex()
},null, true, 'Europe/Copenhagen');
jobs.start();