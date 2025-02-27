const express = require('express')
const logicC = require('../controller/logicCategories')
const logicP = require('../controller/logicProduct')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const router = express.Router()



//categories
router.get('/categories',logicC.getCategories);
router.post('/categories/addCategories',jsonParser,logicC.addCategories);
router.put('/categories/updateCategories/:c_id',jsonParser,logicC.updateCategories)
router.delete('/categories/deleteCategories/:c_id',logicC.deleteCategories)


//product
router.get('/products',logicP.getProduct);
router.post('/products/addProducts',jsonParser,logicP.addProduct);
router.put('/products/updateProducts',jsonParser,logicP.updateProduct)
router.delete('/products/deleteProducts/:p_id',jsonParser,logicP.deleteProduct)


module.exports = router;