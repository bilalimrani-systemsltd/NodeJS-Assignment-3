const mongoose = require('mongoose');
const Joi = require('joi');

    const Cart = mongoose.model('Cart', new mongoose.Schema({
        userId: {type: String, required: true},
        categoryId: {type: String, required: true},
        productId: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
        discount: {type: Number, required: true},
        date: {type: Date,default: Date.now},
    }));

const CartValidation = Joi.object({
    userId: Joi.string().required(),
    categoryId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
});

module.exports = {CartValidation, Cart};
