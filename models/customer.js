const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        maxlength: 40,
        minlength: 5,
        required: true
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: String,
        minlength: 8
    }

}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(8)
    }
    return Joi.validate(customer, schema);
}

exports.Customer=Customer;
exports.validate=validateCustomer;