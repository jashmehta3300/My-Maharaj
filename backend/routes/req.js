const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  createReq,
  getStatus,
  startReq,
  getOngoingReq,
  completeReq,
  getPastReq,
} = require('../controllers/req');

const { authRequired } = require('../middleware/auth');

// @@@ ALL ROUTES FOR USER APP @@@ //

router.post(
    '/create',
    authRequired("user"),
    asyncHandler(createReq)
);

router.get(
    '/status/:request_id',
    asyncHandler(getStatus)
);

router.put(
    '/start/:request_id',  
    asyncHandler(startReq)
);

router.get(
    '/ongoing', 
    authRequired('user'), 
    asyncHandler(getOngoingReq)
);

router.put(
    '/complete/:request_id',
    asyncHandler(completeReq)
);

router.get(
    '/past', 
    authRequired('user'), 
    asyncHandler(getPastReq)
);

module.exports = router;
