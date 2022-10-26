const express = require('express') ;
const router = express.Router() ;
const { register , login , logout , updateProfile , getAuthUser , verifyToken } = require('../controller/user.controller') ;

//register User 
router.post('/register' , register ) ;

//login user 
router.post('/login' , login) ;

//update User Profile 
router.put('/:id' , updateProfile  ) ;

//get auth User 
router.get('/profile' , verifyToken , getAuthUser) ;

//logout user 
router.get('/logout' , verifyToken ,logout ) ;

module.exports = router ;