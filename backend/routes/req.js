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

// @@@ ALL ROUTES FOR USER APP @@@ //

router.post('/create', asyncHandler(createReq));

router.get('/status/:request_id', asyncHandler(getStatus))

router.put('/start/:request_id', asyncHandler(startReq));
router.post('/ongoing', asyncHandler(getOngoingReq));

router.put('/complete/:request_id', asyncHandler(completeReq));
router.get('/past', asyncHandler(getPastReq));

module.exports = router;
