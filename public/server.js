const express = require('express');
const PORT = process.env.PORT || 3000;
const User = require('../model/user'); 
const app = express(); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//server
mongoose.connect('mongodb://localhost:27017/store')
.then((result)=>{
    console.log('Connected');    
}).catch((Error)=>{
    console.log('Error to Connect');
})

const Product = mongoose.model('Product',{
    name:String,
    price:Number,
    description:String
});
app.use(bodyParser.json())
app.post('/product',async(req,res)=>{
    try{
        const{name,price,description} = req.body;
        const product = new Product({name,price,description})
        await product.save();
        res.json(product);
    }catch{
        res.status(500).json({message:error.message})
    }

app.get('/product',async(req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
});

app.post('/users',async(req,res)=>{
    try{
        const{username,email,password} = req.body;
        const user = new User({username,email,password})
        await user.save();
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})


//port
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`);
})
