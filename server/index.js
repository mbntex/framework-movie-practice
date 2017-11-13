const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var API = require('../lib/api_key.js');
var axios = require('axios');
var dB = require('../database/index.js');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000, function () { console.log('MovieList app listening on port 3000!') });

app.use(bodyParser.urlencoded({ extended: false }));

var moviesData = [{title: 'Mean Girls'}, {title: 'Hack Reactor Hackers'}, {title: 'The Grey'}, {title: 'Sunshine'}, {title: 'Ex Machina'}];

app.get('/movies', function(req, res) {
  console.log('GET AT MOVIES WORKED!');
  res.send({info: moviesData});
}) 

app.post('/movies', function(req, res) {
  // console.log('POST AT MOVIES WORKED!');
  // console.log('REQ BODY = ', req.body);
  moviesData.push({title: req.body.q});
  dB.addOne(req.body.q, function(err, rows) {
    if (err) {
      console.log('ERROR at /movies', err);
    } else {
      res.send(rows);
    }
  });
})

app.get('/load', function(req, res) {
  axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key='+ API.APIKEY)
    .then(function (response) {
      var newData = [];
      for (var i = 0; i < response.data.results.length; i++) {
        newData.push({title: response.data.results[i].title});
      }
      //console.log('API RESPONSE12121 DATA= ', newData);
      res.send(newData);
    })
    .catch(function (error) {
      console.log('API ERROR', error)
    });
}) 


app.get('/findall', function(req, res) {
  var data = dB.findAll(function(err, item) {
    // if (err) {
    //   console.log('Error in findall', err)
    // } else {
    //   res.send(item);
    // }
  });
})

app.post('/addone', function(req, res) {
  var data = dB.addOne(function(err, item) {
    if (err) {
      console.log('Error in addone', err)
    } else {
      res.send
    }
  });
})


// app.post('/movies', function(req, res) {
//   console.log('POST AT MOVIES WORKED!');
//   console.log('REQ BODY = ', req.body);
//   moviesData.push({title: req.body.q});
//   res.send(req.body);
// })









