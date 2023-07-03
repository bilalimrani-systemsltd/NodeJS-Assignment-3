const mongoose = require('mongoose');
const Joi = require('joi');

const Category = mongoose.model('Categories', new mongoose.Schema({
    name: {type: String, required: true, maxLength: 20},
    date: {type: Date,default: Date.now},
}));

const CategoryValidation = Joi.object({
    name: Joi.string().max(20).required(),
});

module.exports = {CategoryValidation, Category};
