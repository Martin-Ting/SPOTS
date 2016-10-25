/* Express requirements */
const express = require('express');
const app = express();

/* Database */
const pg = require('pg');
var db = null;
const uri = 'postgres://Martin:pw@localhost/postgresql-raw';
pg.connect(uri, (err, _db) => {
  if (err) throw new Error(err);
  db = _db;
});
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mongodb-orm');

const Hello = require('../db-mongoose/models/hello-model');

app.get('/dbtest', (req, res) => {
  show(req,res);
});
app.get('/mongoosetest', (req, res) => {
  Hello.create({title: "title1", author: "author1"});
  Hello.find({}, (err, events) =>{
    res.status(200).send(events);
  });
});

app.get('/', (req, res)=>{
  res.status(200).send('hello, world!');
})


app.listen(3000);


function show(req, res) {
  const qry = new Promise((resolve, reject) => {
    console.log(req.params.id)
    db.query("SELECT * FROM events", (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  }).then(results => {
    console.log('yay');
    res.setHeader('content-type', 'application/json');
    if (results.rows.length === 0) {
      console.log("so sad no events");
      res.status(404).send({});
    } else {
      res.status(200).send(results.rows);
    }
  }).catch(result => {
    console.error('there was an error!', results);
  });

}