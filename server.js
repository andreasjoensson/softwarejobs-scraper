const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const redis = require('redis');
const cors = require('cors');
const client = redis.createClient("database",{
  tls: {
      rejectUnauthorized: false
  }
});
const { promisify } = require("util");
const path = require('path');
const cronJob = require('./cronjob');
const getAsync = promisify(client.get).bind(client);


app.use(cors());
cronJob.start();


app.get('/api/c', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
}
else{
job.Lokation.trim();
}
})

let Software = shuffledArray.filter(job => {
  let Regex = new RegExp("C#", 'gi')
  return job.Titel.match(Regex);
})

return res.send(JSON.stringify(Software));
})



app.get('/api/jobs', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IT = await JSON.parse(ItJobbank);
  const FinalArray = IT;
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)
console.log(shuffledArray); 

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
}
else{
job.Lokation.trim();
}
})

let Software = shuffledArray.filter(job => {
  let Regex = new RegExp("software", 'gi')
  return job.Titel.match(Regex);
})
console.log(Software);
return res.send(JSON.stringify(Software));
})


app.get('/api/javascript', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  let FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

let javascript = shuffledArray.filter(job => {
  let Regex = new RegExp("javascript", 'gi')
  return job.Titel.match(Regex);
})
return res.send(JSON.stringify(javascript));
})


app.get('/api/net', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

let NET = shuffledArray.filter(job => {
  let Regex = new RegExp(/.net\b/gi)
  return job.Titel.match(Regex);
})
return res.send(JSON.stringify(NET));
})

app.get('/api/java', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);


  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

let java = shuffledArray.filter(job => {
  return job.Titel.match(/\bJava\b/gi);
})
return res.send(JSON.stringify(java));
})

app.get('/api/python', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)
  
  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

let python = shuffledArray.filter(job => {
  let Regex = new RegExp("python", 'gi')
  return job.Titel.match(Regex);
})
return res.send(JSON.stringify(python));
})


app.get('/api/fullstack', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

let Fullstack = shuffledArray.filter(job => {
  let Regex = new RegExp("full", 'gi')
  return job.Titel.match(Regex);
})
return res.send(JSON.stringify(Fullstack));
})

app.get('/api/frontend', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  let FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

  let Frontend = shuffledArray.filter(job => {
  let Regex = new RegExp("front", 'gi')
  return job.Titel.match(Regex);
})

  return res.send(JSON.stringify(Frontend));
})



app.get('/api/junior', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

  let Junior = shuffledArray.filter(job => {
  let Regex = new RegExp("junior", 'gi')
  return job.Titel.match(Regex);
})
  return res.send(JSON.stringify(Junior));
})



app.get('/api/backend', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

  let Backend = shuffledArray.filter(job => {
  let Regex = new RegExp("backend", 'gi')
  return job.Titel.match(Regex);
})
  return res.send(JSON.stringify(Backend));
})


app.get('/api/machine', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

 shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

  let Machine = shuffledArray.filter(job => {
  let Regex = new RegExp("machine", 'gi')
  return job.Titel.match(Regex);
})
  return res.send(JSON.stringify(Machine));
})



app.get('/api/senior', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)
  
  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

  let Senior = shuffledArray.filter(job => {
  let Regex = new RegExp("senior", 'gi');
  return job.Titel.match(Regex);
})
  return res.send(JSON.stringify(Senior));
})



app.get('/api/cloud', async (req, res) => {
  const ItJobbank = await getAsync('jobliste');
  const IndeedDA = await getAsync('indeed');
  const Jobindex = await getAsync('jobindex');

  const IT = await JSON.parse(ItJobbank);
  const Indeed = await JSON.parse(IndeedDA);
  const JobIndex = await JSON.parse(Jobindex);

  const FinalArray = IT.concat(Indeed, JobIndex, IT);
  const shuffledArray = FinalArray.sort(() => 0.5 - Math.random)

  shuffledArray.map(job => {
    let jobz = job.Lokation.toLowerCase()
   if(jobz.includes("copenhagen")){
     job.Lokation = "København"
 }  
 else if(jobz == null || jobz == ""){
 job.Lokation = "Ikke specificeret"
 }})

  let Cloud = shuffledArray.filter(job => {
  let Regex = new RegExp("cloud", 'gi')
  return job.Titel.match(Regex);
})
  return res.send(JSON.stringify(Cloud));
})

if(process.env.NODE_ENV === "production"){
  app.use(express.static("build"));
  app.get('*', (req,res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})