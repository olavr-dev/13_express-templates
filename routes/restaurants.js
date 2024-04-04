const express = require('express');

const uuid = require('uuid');
const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/confirm', function (req, res) {
  res.render('confirm');
});

router.get('/recommend', function (req, res) {
  res.render('recommend');
});

router.post('/recommend', function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

router.get('/restaurants', function (req, res) {
  const restaurants = resData.getStoredRestaurants();

  res.render('restaurants', { numberOfRestaurants: restaurants.length, restaurants: restaurants });
});

router.get('/restaurants/:id', function (req, res) {
  const restaurantId = req.params.id;
  const restaurants = resData.getStoredRestaurants();

  for (const restaurant of restaurants) {
    if (restaurant.id === restaurantId) {
      return res.render('restaurant-details', { restaurant: restaurant });
    }
  }
  res.status(404).render('404');
});

module.exports = router;
