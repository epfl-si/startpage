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
  const defaultSettings = require(path.join(
    __dirname,
    'public/settings/default.json'
  ));
  res.render('pages/home', { defaultSettings, version });
});

// about page
app.get('/about', function (req, res) {
  res.render('pages/about', { version });
});
// help page
app.get('/help', function (req, res) {
  res.render('pages/help', { version });
});
// catalog page
app.get('/catalog', function (req, res) {
  const data = require(path.join(__dirname, 'data/EPFL-services.json'));
  res.render('pages/catalog', { data, version });
});

const port = process.env.PORT || 1337;
app.listen(port);
console.log(`Server listening on port ${port}`);
