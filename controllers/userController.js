const bcrypt = require("bcrypt");

const { User, validate } = require("../models/user");

exports.getUsers = async (req, res) => {
	const users = await User.find().sort("username");
	res.send(users);
};

exports.getUser = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user)
		return res
			.status(404)
			.send("The user with the given ID was not found.");
	res.send(user);
};

exports.createUser = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	try {
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		await user.save();

		res.json({
			user: user._id,
			username: user.username,
			email: user.email,
		});
	} catch (err) {
		if (err.code === 11000)
			return res.status(400).send("Email already exists.");

		res.status(500).send("Internal server error.");
	}
};

exports.updateUser = async (req, res) => {
	if (!req.body.username || !req.body.email || !req.body.password)
		return res.status(400).send("Missing required fields.");

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findByIdAndUpdate(
		req.params.id,
		{
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		},
		{ new: true }
	);

	if (!user)
		return res
			.status(404)
			.send("The user with the given ID was not found.");

	res.send(user);
};

exports.deleteUser = async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	if (!user)
		return res
			.status(404)
			.send("The user with the given ID was not found.");
	res.send(user);
};

exports.loginUser = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res
			.status(404)
			.send("The user with the given email was not found.");

	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (!validPassword)
		return res.status(400).send("Invalid email or password.");

	res.send(true);
};
