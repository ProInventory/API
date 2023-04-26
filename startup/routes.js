const express = require("express");
const cors = require("cors");

const user = require("../routes/users");
const branch = require("../routes/branches");
const product = require("../routes/products");
const delivery = require("../routes/deliveries");

module.exports = function (app) {
	app.use(cors());
	app.use(express.json());
	app.use("/api/users", user);
	app.use("/api/branches", branch);
	app.use("/api/products", product);
	app.use("/api/deliveries", delivery);
};
