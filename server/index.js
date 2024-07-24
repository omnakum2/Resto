const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Category = require('./modals/CategoryModel');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/resto')

app.listen(3001, () => {
    console.log("local server running on port 3001");
});

// fetch all category
app.get('/api/category', async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});

// insert category
app.post('/api/category', async (req,res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).send(category);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});

// fetch one category
app.get('/api/category/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});

app.put('/api/category/:id', async (req,res) => {
    try {
        const {id} = Category.findById(id);
        const category = await Category.findByIdAndUpdate(id,req.body);
        res.status(200).send(category);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});