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
	category: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
		maxlength: 255,
	},
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
		category: Joi.string().min(5).max(50).required(),
		price: Joi.number().required(),
		quantity: Joi.number(),
		description: Joi.string().max(255),
	});

	return schema.validate(product);
}

module.exports.Product = Product;
module.exports.validate = validateProduct;
