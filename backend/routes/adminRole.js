const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {approveMaharaj,setPrice} = require("../controllers/adminRole");
const {authRequired,hasRoles} = require("../middleware/auth")

router.post("/approveMaharaj/:id",authRequired("admin"),hasRoles(["admin"]),asyncHandler(approveMaharaj))
router.post("/setPrice/:id",authRequired("admin"),hasRoles(["admin"]),asyncHandler(setPrice))


module.exports = router;