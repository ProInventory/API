const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const userController = require("../controllers/userController");

router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUser);
router.post("/", auth, userController.createUser);

module.exports = router;
