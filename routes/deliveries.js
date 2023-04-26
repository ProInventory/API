const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const deliveryController = require("../controllers/deliveryController");

router.get("/", auth, deliveryController.getDeliveries);
router.get("/:id", auth, deliveryController.getDelivery);
router.post("/", auth, deliveryController.createDelivery);
router.put("/:id", auth, deliveryController.updateDelivery);
router.delete("/:id", auth, deliveryController.deleteDelivery);

module.exports = router;
