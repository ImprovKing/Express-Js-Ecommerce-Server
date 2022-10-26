const express = require('express') ;
const router = express.Router() ;

const { createProduct, getAllProduct, getProductById, getProductByCategory,updateProduct, deleteProduct } = require('../controller/product.controller') ;
const { verifyToken , getAuthUser } = require('../controller/user.controller') ;



//Create Product
router.post('/create' , createProduct , verifyToken , getAuthUser ) ;

//Get Product By ID
router.get('/:id' , getProductById ) ;

//Get Product By Category
router.get('/getByCategory/:category' , getProductByCategory ) ;

//update Product By ID
router.put('/:id', updateProduct , verifyToken , getAuthUser ) ;

//update Product By ID
router.delete('/:id' , deleteProduct , verifyToken , getAuthUser ) ;


//Get All Product
router.get('/' , getAllProduct ) ;


module.exports = router ;