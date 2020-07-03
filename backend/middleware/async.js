const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(
        res.status(400).json({
            success: false
        })
    );

module.exports = asyncHandler;