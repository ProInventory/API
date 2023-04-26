const { Delivery, validate } = require("../models/delivery");

exports.getDeliveries = async (req, res) => {
	const deliveries = await Delivery.find().sort("placedDate");
	res.send(deliveries);
};

exports.getDelivery = async (req, res) => {
	const delivery = await Delivery.findById(req.params.id);
	if (!delivery)
		return res
			.status(404)
			.send("The delivery with the given ID was not found.");
	res.send(delivery);
};

exports.createDelivery = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const delivery = new Delivery({
		from: req.body.from,
		to: req.body.to,
		items: req.body.items,
		placedDate: req.body.placedDate,
		status: req.body.status,
		deliveryDate: req.body.deliveryDate,
	});

	await delivery.save();
	res.send(delivery);
};

exports.updateDelivery = async (req, res) => {
	if (
		!req.body.from ||
		!req.body.to ||
		!req.body.items ||
		!req.body.placedDate ||
		!req.body.status ||
		!req.body.deliveryDate
	)
		return res.status(400).send("Missing required fields.");

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const delivery = await Delivery.findByIdAndUpdate(
		req.params.id,
		{
			from: req.body.from,
			to: req.body.to,
			items: req.body.items,
			placedDate: req.body.placedDate,
			status: req.body.status,
			deliveryDate: req.body.deliveryDate,
		},
		{ new: true }
	);

	if (!delivery)
		return res
			.status(404)
			.send("The delivery with the given ID was not found.");

	res.send(delivery);
};

exports.deleteDelivery = async (req, res) => {
	const delivery = await Delivery.findByIdAndRemove(req.params.id);
	if (!delivery)
		return res
			.status(404)
			.send("The delivery with the given ID was not found.");

	res.send(delivery);
};
