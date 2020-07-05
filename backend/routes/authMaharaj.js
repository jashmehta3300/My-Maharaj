const express  = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const  { register } = require("../controllers/authMaharaj");
const  {upload} = require("../middleware/multer")

// const newUp = upload.array[{fieldName:'image',maxCount:1},{fieldName:'aadhar',maxCount:1}]
// router.post("/register",newUp,asyncHandler(register));
router.post("/register",upload.fields([{name:'image' , maxCount:1},{name:'doc',maxCount:1}]),asyncHandler(register));
//router.post("/login",asyncHandler(login))
// router.post("/sms",asyncHandler(sms))
// router.post("/verify",asyncHandler(verify))
// router.get("/me",asyncHandler(getMe))
// router.get("/users",asyncHandler(getUsers))

module.exports = router

