const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  getAllUnaccepted,
  getAllAccepted,
  acceptReq,
  getPastReq,
  adminGetAll,
  acceptModifiedReq
} = require('../controllers/maharajReq');

const { authRequired } = require('../middleware/auth');

// @@@ ALL ROUTES FOR MAHARAJ APP @@@ //

router.get('/allreq', asyncHandler(getAllUnaccepted));

router.get(
    '/myreq', 
    authRequired('maharaj'), 
    asyncHandler(getAllAccepted)
);

router.put(
    '/:request_id', 
    authRequired('maharaj'), 
    asyncHandler(acceptReq)
);

router.get(
  '/past',
  authRequired('maharaj'),
  asyncHandler(getPastReq)
);

router.get('/admin', asyncHandler(adminGetAll));

router.put(
  '/modify/:request_id',
  authRequired('maharaj'),
  asyncHandler(acceptModifiedReq)
);

module.exports = router;
