const express = require('express');
const router = express.Router();
const {upload} = require("../middleware/multer")
const { register, login , sms , verify , getMe , getUsers , getProfileImage , uploadProfileImage, getUserById, updateProfile , updateUserSignal } = require('../controllers/auth');
const asyncHandler = require("express-async-handler")
const {authRequired} =require("../middleware/auth");


router.post("/register",asyncHandler(register));
router.post("/upload", authRequired("user") , upload.single('file') , asyncHandler(uploadProfileImage))
router.post("/login",asyncHandler(login))
router.post("/sms",asyncHandler(sms))
router.post("/verify",asyncHandler(verify))
router.post("/updateSignal/:id",asyncHandler(updateUserSignal));
router.put("/me",authRequired("user"),asyncHandler(updateProfile))
router.get("/me",authRequired("user"),asyncHandler(getMe))
router.get("/users",asyncHandler(getUsers))
router.get("/users/:id",asyncHandler(getUserById))
router.get("/:id/profileimage",asyncHandler(getProfileImage))

module.exports = router; 