const express = require('express');
const router = express.Router();
const {upload} = require("../middleware/multer")
const { register, login , sms , verify} = require('../controllers/auth');
const asyncHandler = require("express-async-handler")

router.post("/register",upload,asyncHandler(register));
router.post("/login",asyncHandler(login))
router.post("/sms",asyncHandler(sms))
router.post("/verify",asyncHandler(verify))

module.exports = router; 