const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  getAllUnaccepted,
  getAllAccepted,
  acceptReq,
  adminGetAll,
} = require('../controllers/maharajReq');

const { authRequired } = require('../middleware/auth');

// @@@ ALL ROUTES FOR MAHARAJ APP @@@ //

router.get('/allreq', asyncHandler(getAllUnaccepted));

router.get(
    '/myreq', 
    authRequired('maharaj'), 
    asyncHandler(getAllAccepted)
);

router.put('/:request_id', asyncHandler(acceptReq));

router.get('/admin', asyncHandler(adminGetAll));

module.exports = router;
