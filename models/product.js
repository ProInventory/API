const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(255).required(),
        price: Joi.number().required(),
        category: Joi.string().min(5).max(50).required(),
    });

    return schema.validate(product);
}

module.exports.Product = Product;
module.exports.validate = validateProduct;
