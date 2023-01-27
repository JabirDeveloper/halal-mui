const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')
const baseUrl = 'https://halalmui.org/search-product/'

const paginator = (items, page, per_page) => {
  var page = page || 1,
  per_page = per_page || 10,
  offset = (page - 1) * per_page,

  paginatedItems = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length / per_page)
  return {
  data: paginatedItems,
  current_page: parseInt(page),
  prev_page: page - 1 ? page - 1 : undefined,
  next_page: (total_pages > page) ? parseInt(page) : undefined,
  total: items.length,
  total_pages: total_pages,
  }
}

const getHalal = async (product, produsen, certificate, page) => {
  const url = `${baseUrl}?productname=${product}&produsenname=${produsen}&sertifikat=${certificate}&datepicker=`
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const halalProducts = $('#content .ast-container .main-content .width-block .container .row .col-md-9 .container .row.card-content .product-halal')
  const error = $('#content .ast-container .main-content .width-block .container .row .col-md-9 .container .row.card-content p').text()
  
  if(halalProducts.length > 0){
    const halals = []
    halalProducts.map(((index) => {
      const pElement = $(halalProducts[index]).find('div > div > p')
      const product = $(pElement[0]).text()
      const certificate = $(pElement[1]).text()
      const produsen = $(pElement[3]).text()
      const expired = $(pElement[5]).text()
      halals.push({
        product, certificate, produsen, expired
      })
    }))

    const per_page = 10
    const paginedItems = paginator(halals, page, per_page)

    return {
      error: false,
      message: 'Halal product fetched successfully',
      ...paginedItems
    }
  } else {
    return {
      error: true,
      message: error ? error : 'Please enter query product_name or produsen_name or certificate'
    }
  }
}

/* GET Halal listing. */
router.get('/', async function(req, res, next) {
  const product_name = req.query.product_name ? req.query.product_name : ''
  const produsen_name = req.query.produsen_name ? req.query.produsen_name : ''
  const certificate = req.query.certificate ? req.query.certificate : ''
  const page = req.query.page ? req.query.page : 1

  const halal = await getHalal(product_name, produsen_name, certificate, page)
  res.json(halal)
})

module.exports = router
