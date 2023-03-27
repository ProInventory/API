const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(config.get("dbConnectionString")).then(() => {
    console.log("Connected to MongoDB");
});

const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

module.exports.server = server;
