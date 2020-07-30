const Request = require("../models/requestModel");
const User = require("../models/userModel");


// @@@ ALL CONTROLLERS FOR REQUESTS FROM MAHARAJ APP @@@ //


// @desc      Show all unaccepted requests to all Maharaj
// @route     GET /api/v1/maharajReq/allreq
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

// @desc      All requests accepted by Maharaj
// @route     GET /api/v1/maharajReq/myreq
// @access    private
exports.getAllAccepted = async(req, res, next) => {

  await Request.find({
    acceptedBy: req.user._id,
    status: 'accepted',
  }, (err, result) => {
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
// @route     PUT /api/v1/maharajReq/:request_id
// @access    private
exports.acceptReq = async(req, res, next) => {
    const request_id = req.params.request_id;

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      req.user.orders.push(request_id),
      {
        new: true,
        runValidators: true,
      }
    );

    const fieldsToUpdate = {
        accepted: true,
        status: 'accepted',
        acceptedBy: req.user._id
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

// @desc      Return all past requests by maharaj
// @route     GET /api/v1/maharajReq/past
// @access    private
exports.getPastReq = async (req, res, next) => {

  const request = await Request.find({
    acceptedBy: req.user._id,
    status: 'completed',
  });

  res.status(200).json({
    success: true,
    data: request,
  });
};


// @desc      Admin can see all requests
// @route     GET api/v1/maharajReq/admin
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

// @desc      Accept/Reject a modified request
// @route     PUT /api/v1/maharajReq/modify/:request_id
// @access    private
exports.acceptModifiedReq = async (req, res, next) => {
  const request_id = req.params.request_id;

  console.log(req.body.acceptChanges)

  console.log("Hi")

  if (req.body.acceptChanges === true){
    const fieldsToUpdate = {
      modified: false
    }
    console.log("Hello")

    const request = await Request.findByIdAndUpdate(request_id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    console.log("Bye")

    res.status(200).json({
      success: true,
      data: request,
    });
  }

  if (req.body.acceptChanges === false){
    console.log("here")
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      req.user.orders.remove(request_id),
      {
        new: true,
        runValidators: true,
      }
    );

    const fieldsToUpdate1 = {
      modified: false,
      accepted: false,
      acceptedBy: null
    }

    const request1 = await Request.findByIdAndUpdate(request_id, fieldsToUpdate1, {
      new: true,
      runValidators: true,
    });
    console.log("not here")


    res.status(200).json({
      success: true,
      data: request1,
    });
  }
};
