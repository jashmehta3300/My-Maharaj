const Request = require('../models/Request');
const User = require('../models/User');


// @@@ ALL CONTROLLERS FOR REQUESTS FROM MAHARAJ APP @@@ //


// @desc      Show all unaccepted requests to all Maharaj
// @route     GET /api/v1/maharajReq/
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
// @route     GET /api/v1/maharajReq/:maharaj_id
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
// @route     PUT /api/v1/maharajReq/:request_id
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
