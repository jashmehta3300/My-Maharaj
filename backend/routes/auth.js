const express = require('express');
const router = express.Router();
const {upload} = require("../middleware/multer")
const { register, login , sms , verify , getMe , getUsers , getProfileImage} = require('../controllers/auth');
const asyncHandler = require("express-async-handler")
const {authRequired} =require("../middleware/auth")

router.post("/register",upload.single('file'),asyncHandler(register));
router.post("/login",asyncHandler(login))
router.post("/sms",asyncHandler(sms))
router.post("/verify",asyncHandler(verify))
router.get("/me",authRequired("user"),asyncHandler(getMe))
router.get("/users",asyncHandler(getUsers))
router.get("/:id/profileimage",asyncHandler(getProfileImage))

module.exports = router;