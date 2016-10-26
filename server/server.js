/* Express requirements */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/* Database */
const Spot = require('../db-postgres/models/spots-model');


const pg = require('pg');
var db = null;
const uri = 'postgres://Martin:pw@localhost/postgresql-raw';
pg.connect(uri, (err, _db) => {
  if (err) throw new Error(err);
  db = _db;
});

/* middleware */
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

/* app routes */
app.get('/', (req, res)=>{
  res.status(200).send('It works! Please contact your server admin if you have difficulties with your bowel movements.');
})

/* API Routes */
app.get('/spots/all', (req, res) => {
  Spot.findAll({}).then(results => {/*console.log(results);*/ res.status(200).send(results);});
  // let point = {type: 'Point', coordinates: [-118.4246642, 33.9794474]}
  // Spot.create({location: point}, (err, results) => {
  //   console.log(results);
  // });
  // res.status(200).send({});
});

app.post('/spots/new', (req, res) => {
  console.log('got post');
  console.log(req.body);
  let tags = req.body.formTags;
  delete req.body.formTags;
  console.log(req.body);
  req.body.location = {
      type: 'Point', 
      coordinates: req.body.location
    }
  Spot.create(req.body).then(()=>{
    res.status(200).send('Done');
    //console.log(`created: ${spot}`);
  });
});

app.listen(3000);