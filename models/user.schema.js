const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required :true  
    } ,
    email : {
        type : String ,
        required :true  ,
    } ,
    password : {
        type : String ,
        required :true  
    } ,
    gender:{
        type : String ,
        enum : {
            values : [ 'Male' , 'Female'] ,
            message : '{VALUE} is not Supported' ,
        } 
    } ,
    token :{
        type : String
    }
} , {timestamps : true } )



module.exports = mongoose.model('User' , userSchema ) ;