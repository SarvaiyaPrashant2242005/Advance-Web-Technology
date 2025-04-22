const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");

router.post("/jobs", jobController.createJob);
router.get("/jobs", jobController.getJobs);

module.exports = router;
