const express = require('express');
const router = express.Router();
const {upload} = require("../middleware/multer")
const { register, login } = require('../controllers/auth');


router.post("/register",upload,register);
router.post("/login",login)

module.exports = router;