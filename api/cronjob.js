let Indeed = require('./webscraper/indeed');
let ITJobbank = require('./webscraper/it-jobbank');
let JobIndex = require('./webscraper/jobindex');

let CronJob = require('cron').CronJob;
module.exports = new CronJob('0 23 * * *', function () {
    Indeed()
    ITJobbank()
    JobIndex()
},null, true, 'Europe/Copenhagen');
