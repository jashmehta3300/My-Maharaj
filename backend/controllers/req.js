const Request = require('../models/Request');
const User = require("../models/User");

// @desc      Show all unaccepted requests to all Maharaj
// @route     GET /api/v1/req/maharaj
// @access    public
exports.getAllUnaccepted = async(req, res, next) => {
    await Request.find({accepted: false}, (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json({
                success: true,
                data: result
            });
        }
    })
};


// @desc      User will post a req
// @route     POST /api/v1/req/maharaj
// @access    public
exports.userPostReq = async(req, res, next) => {
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


// @desc      All requests accepted by Maharaj
// @route     GET /api/v1/req/maharaj/:maharaj_id
// @access    private
exports.getAllAccepted = async(req, res, next) => {
    const maharajId = req.params.maharaj_id;

    await Request.find({ acceptedBy: maharajId }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          success: true,
          data: result,
        });
      }
    });
};


// @desc      Accept a request by Maharaj
// @route     PUT /api/v1/req/maharaj/:request_id
// @access    private
exports.acceptReq = async(req, res, next) => {
    const request_id = req.params.request_id;
    const user = await User.findOne({ name: req.body.acceptedBy});

    const fieldsToUpdate = {
        accepted: true,
        acceptedBy: user._id
    }

    const request = await Request.findByIdAndUpdate(request_id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: request,
    });
};


// @desc      Start the request
// @route     PUT /api/v1/req/user/:request_id/ongoing
// @access    private
exports.startUserReq = async(req, res, next) => {
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
// @route     GET /api/v1/req/user/:request_id/ongoing
// @access    private
exports.getOngoingUserReq = async(req, res, next) => {
    const request = await Request.findById(req.params.request_id);

    res.status(200).json({
      success: true,
      data: request,
    });
};


// @desc      User declares that the request has been fulfilled
// @route     PUT /api/v1/req/user/:request_id/past
// @access    public
exports.completeUserReq = async(req, res, next) => {
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

// @desc      Register User
// @route     GET /api/v1/req/user/:request_id/past
// @access    public
exports.getPastUserReq = async(req, res, next) => {
    const request = await Request.findById(req.params.request_id);

    res.status(200).json({
      success: true,
      data: request,
    });
};


// @desc      Admin can see all requests
// @route     GET api/v1/req/admin
// @access    private
exports.adminGetAll = async(req, res, next) => {
    await Request.find({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          success: true,
          data: result,
        });
      }
    });
};