const express = require('express')
const fs = require('fs').promises
const fastFoodRouter = express.Router()

fastFoodRouter.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) =>
      cuisine.hasOwnProperty('fastFood')
    )

    const finalData = asianData.fastFood
    const obj = { item: finalData }
    res.render('details', obj)
  } catch (err) {
    console.log(err)
  }
})


fastFoodRouter.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const fastFoodData = cuisinesData.cuisines.filter((cuisine) => {
      if (cuisine.hasOwnProperty('fastFood')) {
        return cuisine.fastFood[Number(req.params.id) - 1]
      }
    })
    const finalData = fastFoodData.fastFood[Number(req.params.id) - 1]
    res.render('resturant', finalData)
  } catch (err) {
    console.log(err)
  }

})

module.exports = fastFoodRouter