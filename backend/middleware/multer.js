const multer = require("multer");
const path = require("path")

const upload = multer({
    limits:{
        fileSize:2000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})


function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports={upload}