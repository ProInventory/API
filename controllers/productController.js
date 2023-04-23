const { Product, validate } = require("../models/product");

exports.getProducts = async (req, res) => {
	const products = await Product.find().sort("name");
	res.send(products);
};

exports.getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product)
		return res
			.status(404)
			.send("The product with the given ID was not found.");
	res.send(product);
};

exports.createProduct = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const product = new Product({
		name: req.body.name,
		category: req.body.category,
		price: req.body.price,
		quantity: req.body.quantity,
		description: req.body.description,
	});

	await product.save();
	res.send(product);
};

exports.updateProduct = async (req, res) => {
	if (
		!req.body.name ||
		!req.body.category ||
		!req.body.price ||
		!req.body.quantity
	)
		return res.status(400).send("Missing required fields.");

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const product = await Product.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			category: req.body.category,
			price: req.body.price,
			quantity: req.body.quantity,
		},
		{ new: true }
	);

	if (!product)
		return res
			.status(404)
			.send("The product with the given ID was not found.");

	res.send(product);
};

exports.deleteProduct = async (req, res) => {
	const product = await Product.findByIdAndRemove(req.params.id);
	if (!product)
		return res
			.status(404)
			.send("The product with the given ID was not found.");
	res.send(product);
};
