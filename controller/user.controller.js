const User = require('../models/user.schema')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')


/*      REGISTER USER       */
const register = async (req , res) => {
    const { name , email , password } = req.body ;

    //check for existing user 
    const user = await User.findOne({ email }) ;
    if(user){
        return res.status(400).json({ msg : "User Already Exists"}) ;
    }

    //Password hash 
    const salt = await bcrypt.genSalt(10) ;
    const hashedPassword = await bcrypt.hash(password , salt ) ;
    
    try{
        const user = await User.create({
            name ,
            email ,
            password : hashedPassword ,
        }) ;
        res.status(201).json({
            success : true ,
            message : "User registered Successfully!" ,
        }) ;
    }
    catch(error){
        res.status(500).json({
            success : false ,
            error : error.message ,
        }) ;
    }
} ;

const login = async (req , res) => {
    const  {email , password } = req.body ;

    //Check for existing User 
    const user = await User.findOne({email }) ;
    if(!user ){
        return res.status(400).json({msg : "User does not exist"}) ;
    }

    //password hash compare
    const isMatch = await bcrypt.compare(password , user.password) ;
    if(!isMatch){
        return res.status(400).json({msg : 'Invalid Credentials '} ) ;
    } 

    //Create and assign a token
    const token = jwt.sign({ id : user._id} , process.env.JWT_SECRET , {
        expiresIn : 3600 ,
    }) ;

    //Set Cookie 
    res.cookie('token' , token , { httpOnly : true }).status(200) ;

    
    res.status(200).json({
        success : true ,
        message : "User Is Logged In SuccessFully !!" ,
        user:{
            id : user._id ,
            name : user.name ,
            email : user.email ,
            createdAt : user.createdAt ,
        },
    })
}

// verify token
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };


//ge authenticated user 
const getAuthUser = async ( req, res , next) => {
    const user = await User.findById(req.user.id).select('-password') ;
    res.status(200).json({
        success : true ,
        user ,
    }) ;
} ;

//update User Profile 
const updateProfile = async ( req,res) => {
    try {
        const {
            name ,
            email , 
            password ,
            gender
        } = req.body ;
       await User.findOneAndUpdate(req.params._id , {
            name ,
            email , 
            password ,
            gender
        }) ;
        res.json("User Profile Updated Successfully !!") ;
    } catch (error) {
        res.status(400).json({
            success : false ,
            message : error.message 
        }) ;
    }
} 

const logout = async (req , res ) => {
    res.clearCookie('token').status(200);
    res.status(200).json({
        success : true ,
        message : 'User logged Out Successfully !!'
    }) ;
} ;

module.exports = {
    register ,
    login ,
    verifyToken ,
    logout ,
    getAuthUser ,
    updateProfile
}