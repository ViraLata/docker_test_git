const { Router} =  require('express');
const router = Router();

const { getProducts, getProductById, createProduct, deleteProduct, updateProduct, getProductByName } = require('../controllers/index.controller');

router.get('/search_products/:name',getProductByName);
router.get('/search_products/',getProducts);
router.get('/products',getProducts);
router.get('/products/:id',getProductById);
router.post('/products',createProduct);
router.delete('/products/:id',deleteProduct);
router.put('/products/',updateProduct);

module.exports = router;