const express = require("express");
const user = require("../routes/users");
const branch = require("../routes/branches");

module.exports = function (app) {
    app.use(express.json());
    app.use("/api/users", user);
    app.use("/api/branches", branch);
};
