const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')

const server = express()

const cafeRouter = require('./cafe-routes')
const fastFoodRouter = require('./fast-food-routes')
const italianRouter = require('./italian-routes')
const asianRouter = require('./asian-routes')
const indianRouter = require('./indian-routes')
const veganRouter = require('./vegan-routes')

// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// Your routes/router(s) should go here

server.get('/', async (req, res) => {
  try {
    const cuisineData = await fs.readFile('server/data/data.json')
    const cuisineParse = JSON.parse(cuisineData)
    const cuisine = cuisineParse.cuisines.map((resturant) => {
      const items = Object.keys(resturant)
      return { name: items[0], image: resturant.homeImage }
    })
    let allcuisinesData = { restaurant: cuisine }
    res.render('home', allcuisinesData)
    // console.log(cuisine)
  } catch (error) {
    console.error('Error loading cuisineData', error)
  }
})

server.use('/cafe', cafeRouter)
server.use('/fastFood', fastFoodRouter)
server.use('/italian', italianRouter)
server.use('/asian', asianRouter)
server.use('/indian', indianRouter)
server.use('/vegan', veganRouter)

module.exports = server
