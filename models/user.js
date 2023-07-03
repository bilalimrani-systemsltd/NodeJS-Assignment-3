const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('Users', new mongoose.Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 20},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true,minLength: 8, maxLength: 20},
    date: {type: Date,default: Date.now},
}));

const UserValidation = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).max(20).required(),
});

module.exports = {UserValidation, User};