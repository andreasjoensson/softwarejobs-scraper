let Indeed = require('./indeed');
let Glassdoor = require('./glassdoor');
let ITJobbank = require('./it-jobbank');
let JobIndex = require('./jobindex');

let CronJob = require('cron').CronJob;
let jobs = new CronJob('0 23 * * *', function () {
    Indeed()
    Glassdoor()
    ITJobbank()
    JobIndex()
},null, true, 'Europe/Copenhagen');
jobs.start();