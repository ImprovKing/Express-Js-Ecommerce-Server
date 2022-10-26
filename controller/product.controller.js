const Product = require('../models/product.schema' ) ;


const createProduct = async (  req , res ) => {

    const {name} = req.body ;
    const {price} = req.body ;
    const {quantity} = req.body ;
    const {description} = req.body ;
    const {image} = req.body ;
    const {shippingFee} = req.body ;
    const {category} = req.body ;

    const inDB = await Product.findOne({ name }) ;
    if(inDB){
        return res.status(400).json({ msg : "Product name already exist in Database , Try another name !"}) ;
    } 

    try {
        const newItem = await new Product({
            name ,
            price ,
            image ,
            shippingFee ,
            quantity ,
            category ,
            description
        }) ;

        await newItem.save();
        res.json(" Product Created!!");
    }    catch (error) {
        res.status(400) ;
        res.json(error);
        }
}

const getAllProduct = async (req ,res ) => {
    try {
        const allItem = await Product.find() ;
        res.status(200).json(allItem) ;
    } catch (error) {
        res.status(400).json({
            success : false ,
            message : error.message
        })
    }
}

const getProductById = async (req , res ) => {
    try{
        const {id} = req.params ;
        const oneItem = await Product.findById(id) ;
        res.status(200).json(oneItem) ;
    }
    catch (error) {
        res.status(400).json({
            success : false ,
            message : error.message 
        }) ;
    }
}

const getProductByCategory = async (req , res ) => {
    try {
        const {category} = req.params ;
        const itemCategory = await Product.find({category}) ;
        res.status(200).json(itemCategory) ;
    } catch (error) {
        res.status(400).json({
            success : false ,
            message  : error.message 
        }) ;
    }
}

const updateProduct = async ( req , res ) => {
    try {
        const {
            name ,
            price ,
            image ,
            shippingFee , 
            quantity ,
            category ,
            description
        } = req.body ;
       await Product.findOneAndUpdate(req.params._id , {
            name ,
            price ,
            image ,
            shippingFee , 
            quantity ,
            category ,
            description
        }) ;
        res.json("Product Updated Successfully !!") ;
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message 
        }) ;
    }
} ;

const deleteProduct = async ( req , res ) => {
    try {
        const { _id } = req.body ;
        await Product.findByIdAndDelete(_id ) 
        res.json("Product Successfully Deleted !!") ;
    } catch (error) {
        res.status(400).json("Unable to delete Product !" , error ) ;
    }
}

module.exports = {
    createProduct ,
    getProductByCategory ,
    getProductById ,
    getAllProduct ,
    updateProduct ,
    deleteProduct
}