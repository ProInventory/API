const express = require("express");
const app = express();

app.use(express.json());

const server = app.listen(3000, () => {
    winston.info("Server is running on port 3000");
});

module.exports.server = server;
