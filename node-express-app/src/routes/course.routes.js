const express = require("express");
const courseController = require("../controllers/course.controller");
const router = express.Router();

router.get("/", courseController.fetchAll);
router.post("/", courseController.create);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);
router.get("/:id", courseController.findOne);
module.exports = router;
