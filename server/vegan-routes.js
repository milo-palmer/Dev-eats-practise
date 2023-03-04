const express = require('express')
const fs = require('fs').promises
const veganRouter = express.Router()

veganRouter.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) =>
      cuisine.hasOwnProperty('vegan')
    )

    const finalData = asianData.vegan
    const obj = { item: finalData }
    res.render('details', obj)
  } catch (err) {
    console.log(err)
  }
})

veganRouter.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const fastFoodData = cuisinesData.cuisines.find((cuisine) => {
      if (cuisine.hasOwnProperty('vegan')) {
        return cuisine
      }
    })
    //  fastFoodData.fastFood
    const finalData = fastFoodData.vegan[Number(req.params.id) - 1]
    res.render('restaurant', finalData)
  } catch (err) {
    console.log(err)
  }
})

module.exports = veganRouter
