const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

const {
  createReq,
  getStatus,
  startReq,
  getOngoingReq,
  getAllAcceptedUser,
  completeReq,
  getPastReq,
  modifyReq
} = require('../controllers/req');

const { authRequired } = require('../middleware/auth');
const { getAllAccepted } = require('../controllers/maharajReq');

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

router.put(
    '/modify/:request_id',
    authRequired('user'),
    asyncHandler(modifyReq)
)

router.get(
    '/myreq',
    authRequired('user'),
    asyncHandler(getAllAcceptedUser)
)

module.exports = router;
