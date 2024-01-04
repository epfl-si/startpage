const express = require('express');
const app = express();
const path = require('path');
const version = require(path.join(__dirname, '../package.json')).version;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
  res.render('pages/home', { version });
});

// about page
app.get('/about', function (req, res) {
  res.render('pages/about', { version });
});
// catalog page
app.get('/catalog', function (req, res) {
  const data = require(path.join(__dirname, 'data/EPFL-services.json'));
  res.render('pages/catalog', { data, version });
});

app.listen(1337);
console.log('Server listening on port 1337');
