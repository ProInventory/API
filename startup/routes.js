const express = require("express");

const user = require("../routes/users");
const branch = require("../routes/branches");
const product = require("../routes/products");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/users", user);
    app.use("/api/branches", branch);
    app.use("/api/products", product);
};
