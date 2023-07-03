const mongoose = require('mongoose');
const Joi = require('joi');

const Product = mongoose.model('Products', new mongoose.Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 20},
    description: {type: String, required: true, maxLength: 200},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    categoryId: {type: String, required: true},
    date: {type: Date,default: Date.now},
}));

const ProductValidation = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().max(20).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    categoryId: Joi.string().required(),
});

module.exports = {ProductValidation, Product};
