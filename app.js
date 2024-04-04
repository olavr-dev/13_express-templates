const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const resData = require('./util/restaurant-data');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/confirm', function (req, res) {
  res.render('confirm');
});

app.get('/recommend', function (req, res) {
  res.render('recommend');
});

app.post('/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

app.get('/restaurants', function (req, res) {
  const restaurants = resData.getStoredRestaurants();

  res.render('restaurants', { numberOfRestaurants: restaurants.length, restaurants: restaurants });
});

app.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  const restaurants = resData.getStoredRestaurants();

  for (const restaurant of restaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-details', { restaurant: restaurant });
    }
  }
  res.status(404).render('404');
});

// Custom middleware to show 404 page if user enters an invalid url
app.use(function (req, res) {
  res.status(404).render('404');
});

// Express default error handling function
app.use(function (error, req, res, next) {
  res.status(500).render('500');
});

app.listen(3000);
