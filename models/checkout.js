const mongoose = require('mongoose');
const Joi = require('joi');

    const Cart = mongoose.model('Cart', new mongoose.Schema({
        userId: {type: String, required: true},
        products: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            }
        ],        productId: {type: String, required: true},
        totalPrice: { type: Number, required: true },
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        date: {type: Date,default: Date.now},
    }));

const CartValidation = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string().required(),
                quantity: Joi.number().required(),
                price: Joi.number().required(),
            })
        )
        .required(),
    totalPrice: Joi.number().required(),
    shippingAddress: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
    paymentMethod: Joi.string().required(),
});

module.exports = {CartValidation, Cart};
