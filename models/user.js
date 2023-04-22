const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
});

const User = mongoose.model("User", userSchema);

function validateUser(user, ignore = []) {
	const schema = Joi.object({
		username: ignore.includes("username")
			? Joi.string().min(5).max(50)
			: Joi.string().min(5).max(50).required(),
		email: ignore.includes("email")
			? Joi.string().min(5).max(255).email()
			: Joi.string().min(5).max(255).required().email(),
		password: ignore.includes("password")
			? Joi.string().min(5).max(255)
			: Joi.string().min(5).max(255).required(),
	});

	return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
