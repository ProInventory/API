const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const userController = require("../controllers/userController");

router.get("/", auth, userController.getUsers);
router.get("/:id", auth, userController.getUser);
router.post("/", auth, userController.createUser);
router.post("/login", userController.loginUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
