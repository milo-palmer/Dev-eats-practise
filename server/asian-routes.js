const express = require('express')
const fs = require('fs').promises
const asianRouter = express.Router()


asianRouter.get('/', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) =>
      cuisine.hasOwnProperty('asian')
    )

    const finalData = asianData.asian
    const obj = { item: finalData }
    res.render('details', obj)
  } catch (err) {
    console.log(err)
  }
})

asianRouter.get('/:id', async (req, res) => {
  try {
    const data = await fs.readFile('server/data/data.json', 'utf-8')
    const cuisinesData = JSON.parse(data)
    const asianData = cuisinesData.cuisines.find((cuisine) => {
      if (cuisine.hasOwnProperty('asian')) {
        return cuisine.asian[Number(req.params.id) - 1]
      }
    })
    const finalData = asianData.asian[Number(req.params.id) - 1]
    res.render('restaurant', finalData)
  } catch (err) {
    console.log(err)
  }
})


module.exports = asianRouter
