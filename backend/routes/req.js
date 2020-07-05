const express = require('express');
const router = express.Router();
const { getAllUnaccepted, userPostReq, getAllAccepted, acceptReq, startUserReq, getOngoingUserReq, completeUserReq, getPastUserReq, adminGetAll} = require('../controllers/req');
const asyncHandler = require('express-async-handler');

router.get('/maharaj', asyncHandler(getAllUnaccepted));
router.post('/maharaj', asyncHandler(userPostReq));

router.get('/maharaj/:maharaj_id', asyncHandler(getAllAccepted));
router.put('/maharaj/:request_id', asyncHandler(acceptReq));

router.put('/user/:request_id/ongoing', asyncHandler(startUserReq));
router.get('/user/:request_id/ongoing', asyncHandler(getOngoingUserReq));

router.put('/user/:request_id/past', asyncHandler(completeUserReq));
router.get('/user/:request_id/past', asyncHandler(getPastUserReq));
router.get('/admin', asyncHandler(adminGetAll));

module.exports = router;
