const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
    orderBranch: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    orderUser: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    orderItems: {
        type: Array,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    orderTotal: {
        type: Number,
        required: true,
    },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
    const schema = Joi.object({
        orderBranch: Joi.string().min(5).max(50).required(),
        orderUser: Joi.string().min(5).max(50).required(),
        orderItems: Joi.array().required(),
        orderDate: Joi.date().required(),
        orderStatus: Joi.string().min(5).max(50).required(),
        orderTotal: Joi.number().required(),
    });
}

module.exports.Order = Order;
module.exports.validate = validateOrder;
