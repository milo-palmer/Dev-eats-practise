const express = require('express')
const fs = require('fs').promises
const italianRouter = express.Router()
const fs = require('node:fs/promises')


italianRouter.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) =>
      cuisine.hasOwnProperty('italian')
    )
    const finalData = asianData.italain
    const obj = { item: finalData }
    res.render('details', obj)
  } catch (err) {
    console.log(err)
  }
})

italianRouter.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) => {
      if (cuisine.hasOwnProperty('italian')) {
        return cuisine.italain[Number(req.params.id) - 1]
      }
    })
    const finalData = asianData.italain[Number(req.params.id) - 1]
    res.render('restaurant', finalData)
  } catch (err) {
    console.log(err)
  }
})
module.exports = italianRouter
