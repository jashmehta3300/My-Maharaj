const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {approveMaharaj,setPrice} = require("../controllers/adminRole");
const {authRequired} = require("../middleware/auth")

router.post("/approveMaharaj",authRequired("admin"),asyncHandler(approveMaharaj))
router.post("/setPrice",authRequired("admin"),asyncHandler(setPrice))


module.exports = router;