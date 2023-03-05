const express = require('express')
const fs = require('fs').promises
const restaurantRoutes = express.Router()

restaurantRoutes.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const restaurantData = cuisinesData.cuisines.map((cuisine) => {
      const keys = Object.keys(cuisine)
      for (let key of keys) {
        if (cuisine.hasOwnProperty(key)) {
          return cuisine[key]
        }
      }
    })

    const finalData = { restaurant: [] }
    for (let cuisine of restaurantData) {
      for (let restaurant of cuisine) {
        finalData.restaurant.push(restaurant)
      }
    }
    res.render('search', finalData)
  } catch (err) {
    console.log(err)
  }
})

restaurantRoutes.post('/', (req, res) => {
  res.redirect(`/resturants/${req.body.name}`)
})

restaurantRoutes.get('/:name', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const restaurantData = cuisinesData.cuisines.map((cuisine) => {
      const keys = Object.keys(cuisine)
      for (let key of keys) {
        if (cuisine.hasOwnProperty(key)) {
          return cuisine[key]
        }
      }
    })
    const finalData = { restaurant: [] }
    for (let cuisine of restaurantData) {
      for (let restaurant of cuisine) {
        if (restaurant.Name === req.params.name) {
          finalData.restaurant.push(restaurant)
        }
      }
    }
    res.render('search', finalData)
  } catch (err) {
    console.log(err)
  }
})

module.exports = restaurantRoutes
