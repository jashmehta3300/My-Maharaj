const Hackathon = require('../models/Hackathon');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

// @desc       Show all hackathons
// @route      GET /api/v1/hackathons
// @access     public
exports.getHackathons = async(req, res, next) => {
    try {
        //inintialize var
        let query;

        //Copy queries in a var by using spread operator
        const reqQuery = {...req.query };

        //Field to exclude
        const removeFields = ['page', 'limit'];

        //Loop over remoreFiends and remove them from queries
        removeFields.forEach(param => delete reqQuery[param]);

        //Create query string
        let queryStr = JSON.stringify(reqQuery);

        //Finding resourse
        query = Hackathon.find(JSON.parse(queryStr));

        //
        //Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Hackathon.countDocuments();

        query = query.skip(startIndex).limit(limit);

        //Executing query
        const hackathons = await query;

        //Pagination
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: hackathons.length,
            pagination: pagination,
            data: hackathons
        });
    } catch (err) {
        console.log(err.message.red.underline);
        res.status(400).json({
            success: false
        });
    }
    // res.status(200).json({ success: true, msg: 'show all hackathons' });
};

// @desc       Show a particular hackathon
// @route      GET /api/v1/hackathons/:id
// @access     public
exports.getHackathon = async(req, res, next) => {
    try {
        const hackathonById = await Hackathon.findById(req.params.id);

        if (!hackathonById) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: hackathonById
        });
    } catch (err) {
        console.log(err.message.red.underline);
        res.status(400).json({
            success: false
        });
    }
    // res
    //     .status(200)
    //     .json({ success: true, msg: `show hackathon ${req.params.id}` });
};

// @desc       Add a new hackathon
// @route      POST /api/v1/hackathons
// @access     public
exports.createHackathons = async(req, res, next) => {
    try {
        const hackathon = await Hackathon.create(req.body);
        res.status(201).json({
            success: true,
            data: hackathon
        });
    } catch (err) {
        console.log(err.message.red.underline);
        res.status(400).json({
            success: false
        });
    }

    // console.log(req.body);
    // res.status(200).json({ success: true, msg: 'add new hackathon' });
};

// @desc       Update a particular hackathon
// @route      PUT /api/v1/hackathons/:id
// @access     public
exports.updateHackathon = async(req, res, next) => {
    try {
        const hackathon = await Hackathon.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true,
                runValidators: true //Mongoose validators
            }
        );
        if (!hackathon) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: hackathon
        });
    } catch (err) {
        console.log(err.message.red.underline);
        res.status(400).json({
            success: false
        });
    }

    // res
    //     .status(200)
    //     .json({ success: true, msg: `update hackathon ${req.params.id}` });
};

// @desc       Delete a particular hackathon
// @route      DELETE /api/v1/hackathons/:id
// @access     public
exports.deleteHackathon = async(req, res, next) => {
    try {
        const hackathon = await Hackathon.findByIdAndDelete(req.params.id);
        if (!hackathon) {
            res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        console.log(err.message.red.underline);
        res.status(400).json({
            success: false
        });
    }

    // res
    //     .status(200)
    //     .json({ success: true, msg: `delete hackathon ${req.params.id}` });
};

// @desc      Get hackathon within a radius
// @route     GET /api/v1/hackathon/radius/:zipcode/:distance
// @access    Private
exports.getHackathonsInRadius = async(req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;

    const hackathons = await Hackathon.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [lng, lat], radius
                ]
            }
        }
    });

    res.status(200).json({
        success: true,
        count: hackathons.length,
        data: hackathons
    });
};