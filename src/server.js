const express = require('express');
const app = express();
const path = require('path');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
  res.render('pages/home');
});

// catalog page
app.get('/catalog', function (req, res) {
  const data = require(path.join(__dirname, 'data/EPFL-services.json'));
  res.render('pages/catalog', { data });
});

app.listen(1337);
console.log('Server listening on port 1337');
