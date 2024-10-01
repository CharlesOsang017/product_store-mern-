import Product from '../models/product.model.js'
import mongoose from 'mongoose'

// get all products
export const getProducts = async (req, res)=>{
    try {
        const products = await Product.find({})
        return res.status(200).json({success:true, data: products})
    } catch (error) {
        console.log(`Error in get posts: ${error.message}`);        
        return res.status(500).json({success:false, message: 'Internal server error'})
    }
}

// create product functionality
export const createProducts = async (req, res)=>{
    const product = req.body;
    if (!product.name || !product.price || !product.image){
        return res.status(400).json({success: 'false', message: 'Please provide all fields'})
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save()
       return res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.error(`Error in create product: ${error.message}`)
       return res.status(500).json({success: false, message: 'server error'})
    }
}

// update product
export const updateProduct = async (req, res)=>{
    const {id} = req.params
    const product = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: 'product with such id is not availbale'})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
        return res.status(200).json({success: true, message: updatedProduct})
    } catch (error) {
        return res.status(404).json({success:false, message: 'product not found'})
    }
}

// delete product functionality
export const deleteProduct = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: 'product with such id is not availbale'})
    }
    try {
        await Product.findByIdAndDelete(id)
       return res.status(200).json({success: true, message: 'product deleted successfully!'})
    } catch (error) {
       return res.status(500).json({success: false, message: 'internal server error'})
    }
}