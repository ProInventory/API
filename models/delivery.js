const mongoose = require("mongoose");
const Joi = require("joi");

const deliverySchema = new mongoose.Schema({
	from: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
	},
	to: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
	},
	items: {
		type: Array,
		required: true,
	},
	placedDate: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		default: "Pending",
	},
	deliveryDate: {
		type: Date,
	},
});

const Delivery = mongoose.model("Delivery", deliverySchema);

function validateDelivery(delivery) {
	const schema = Joi.object({
		from: Joi.string().min(5).max(255).required(),
		to: Joi.string().min(5).max(255).required(),
		items: Joi.array().required(),
		placedDate: Joi.date(),
		status: Joi.string(),
		deliveryDate: Joi.date(),
	});

	return schema.validate(delivery);
}

module.exports.Delivery = Delivery;
module.exports.validate = validateDelivery;
