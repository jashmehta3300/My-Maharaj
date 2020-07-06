const Request = require('../models/Request');
const User = require("../models/User");


// @@@ ALL CONTROLLERS FOR REQUEST FROM USER APP @@@ //


// @desc      User will post a req
// @route     POST /api/v1/req/create
// @access    private
exports.createReq = async(req, res, next) => {
    try {
      const request = await Request.create(req.body);
      res.status(200).json({
        success: true,
        data: request,
      });
    } catch (err) {
      console.log(err.message.red.underline);
      res.status(400).json({
        success: false
      });
    }
};


// @desc      Show if a request is accepted or still pending
// @route     GET /api/v1/req/status/:request_id
// @access    private
exports.getStatus = async(req, res, next) => {
    try {
      const request = await Request.findById(req.params.request_id);
      if(request.accepted){
        res.status(200).json({
          success: true,
          reqStatus: request.accepted,
          data: request
        });
      }
      else{
        res.status(200).json({
            success: true,
            reqStatus: request.accepted,
        });
      }
      
    } catch (err) {
      console.log(err.message.red.underline);
      res.status(400).json({
        success: false
      });
    }
};


// @desc      Start the request
// @route     PUT /api/v1/req/start/:request_id
// @access    private
exports.startReq = async(req, res, next) => {
    const fieldsToUpdate = {
      status: 'ongoing'
    };

    const request = await Request.findByIdAndUpdate(req.params.request_id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: request,
    });
};


// @desc      Get ongoing user request
// @route     POST /api/v1/req/ongoing
// @access    private
exports.getOngoingReq = async(req, res, next) => {
    const user = await User.find({name: req.body.name});
    const request = await Request.find({createdBy: user._id, status: 'ongoing'});

    res.status(200).json({
      success: true,
      data: request,
    });
};


// @desc      User declares that the request has been fulfilled
// @route     PUT /api/v1/req/complete/:request_id
// @access    private
exports.completeReq = async(req, res, next) => {
    const fieldsToUpdate = {
      status: 'completed',
    };

    const request = await Request.findByIdAndUpdate(
      req.params.request_id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: request,
    });
};

// @desc      Return all past requests by user
// @route     GET /api/v1/req/past
// @access    private
exports.getPastReq = async(req, res, next) => {

    const user = await User.find({ name: req.body.name });
    const request = await Request.find({
      createdBy: user._id,
      status: 'completed',
    });

    res.status(200).json({
      success: true,
      data: request,
    });
};
