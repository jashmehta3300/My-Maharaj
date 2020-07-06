const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  getAllUnaccepted,
  getAllAccepted,
  acceptReq,
  adminGetAll,
} = require('../controllers/maharajReq');

// @@@ ALL ROUTES FOR MAHARAJ APP @@@ //

router.get('/', asyncHandler(getAllUnaccepted));

router.get('/:maharaj_id', asyncHandler(getAllAccepted));
router.put('/:request_id', asyncHandler(acceptReq));

router.get('/admin', asyncHandler(adminGetAll));

module.exports = router;
