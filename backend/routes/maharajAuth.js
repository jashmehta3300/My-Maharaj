const express  = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const  { register  ,login , sms , verify , getMaharajs , getMe , getDocument , getProfileImage ,uploadProfileImage , uploadDoc} = require("../controllers/authMaharaj");
const  {upload} = require("../middleware/multer")
const {authRequired} = require("../middleware/auth")


router.post("/register",asyncHandler(register));
router.post("/upload/profile", authRequired("maharaj") , upload.single("image") , asyncHandler(uploadProfileImage) )
router.post("/upload/doc", authRequired("maharaj") , upload.single("doc") , asyncHandler(uploadDoc) )
router.post("/login",asyncHandler(login))
router.post("/sms",asyncHandler(sms))
router.post("/verify",asyncHandler(verify))
router.get("/me",authRequired("maharaj"),asyncHandler(getMe))
router.get("/maharajs",asyncHandler(getMaharajs))
router.get("/:id/profileimage",asyncHandler(getProfileImage));
router.get("/:id/doc",asyncHandler(getDocument));

module.exports = router

