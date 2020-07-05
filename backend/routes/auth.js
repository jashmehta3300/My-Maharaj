const express = require('express');
const router = express.Router();
const {upload} = require("../middleware/multer")
const { register, login , sms , verify , getMe , getUsers} = require('../controllers/auth');
const asyncHandler = require("express-async-handler")

router.post("/register",upload.single('file'),asyncHandler(register));
router.post("/login",asyncHandler(login))
router.post("/sms",asyncHandler(sms))
router.post("/verify",asyncHandler(verify))
router.get("/me",asyncHandler(getMe))
router.get("/users",asyncHandler(getUsers))

module.exports = router;