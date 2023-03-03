const express = require('express')
const cafeRouter = express.Router()
const fs = require('fs').promises

cafeRouter.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) =>
      cuisine.hasOwnProperty('cafe')
    )

    const finalData = asianData.cafe
    const obj = { item: finalData }
    res.render('details', obj)
  } catch (err) {
    console.log(err)
  }
})

cafeRouter.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) => {
      if (cuisine.hasOwnProperty('cafe')) {
        return cuisine.cafe[Number(req.params.id) - 1]
      }
    })
    const finalData = asianData.cafe[Number(req.params.id) - 1]
    res.render('restaurant', finalData)
  } catch (err) {
    console.log(err)
  }
})

module.exports = cafeRouter
