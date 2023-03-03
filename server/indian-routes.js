const express = require('express')
const fs = require('fs').promises
const indianRouter = express.Router()
const fs = require('node:fs/promises')

indianRouter.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) =>
      cuisine.hasOwnProperty('indian')
    )
       const obj = { item: finalData }
    res.render('details', obj)
  } catch (err) {
    console.log(err)
  }
})



indianRouter.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) => {
      if (cuisine.hasOwnProperty('indian')) {
        return cuisine.indian[Number(req.params.id) - 1]
      }
    })
    const finalData = asianData.indian[Number(req.params.id) - 1]
    res.render('restaurant', finalData)
  } catch (err) {
    console.log(err)
  }
})
module.exports = indianRouter
