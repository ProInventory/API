const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const branchController = require("../controllers/branchController");

router.get("/", auth, branchController.getBranches);
router.get("/:id", auth, branchController.getBranch);
router.post("/", auth, branchController.createBranch);
router.put("/:id", auth, branchController.updateBranch);
router.delete("/:id", auth, branchController.deleteBranch);

module.exports = router;
