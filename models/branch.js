const mongoose = require("mongoose");
const Joi = require("joi");

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    manager: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
});

const Branch = mongoose.model("Branch", branchSchema);

function validateBranch(branch) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        address: Joi.string().min(5).max(255).required(),
        phoneNumber: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        manager: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(branch);
}

module.exports.Branch = Branch;
module.exports.validate = validateBranch;
