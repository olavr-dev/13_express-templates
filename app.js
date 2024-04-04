const path = require('path');

const express = require('express');

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//Routes through default.js before going through restaurants.js
app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

// Custom middleware to show 404 page if user enters an invalid url
app.use(function (req, res) {
  res.status(404).render('404');
});

// Express default error handling function
app.use(function (error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);
