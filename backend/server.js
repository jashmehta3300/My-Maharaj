const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookie = require('cookie-parser');
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const cors = require("cors");
//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();


const app = express();
app.use(cors())
//Body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//Cookie Parser
app.use(cookie())

//Route files
const auth = require('./routes/auth');
const maharajAuth = require("./routes/maharajAuth");
const req = require('./routes/req');
const maharajReq = require('./routes/maharajReq');
const { upload } = require('./middleware/multer');

//Dev middleware Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    console.log(`${process.env.NODE_ENV} mode running.`);
}

//Mount routers

// app.post("/upload",upload.single('file'),(req,res)=>{

//     console.log(req.body.data)
    
//     console.log(req.file);
//     res.send(req.body.data)
// })

app.use('/api/v1/auth', auth);
app.use('/api/v1/maharajAuth', maharajAuth);
app.use('/api/v1/req', req);
app.use('/api/v1/maharajReq',maharajReq);



//access env vars
const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `The server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
        .brightBlue.bold
    )
);

/**
 * Error handler.
 * Sends 400 for Mongoose validation errors.
 * 500 otherwise.
 * Do all error handling here.
 */
app.use((err, req, res, next) => {
    console.log("Async error handler")
    console.log(err);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json(err.errors);
    }
    
    return res.status(500).json(err);
  });
  

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log("UNHANDLE")
    console.log(`Error: ${err.message}`.red.bold.underline);
    //close server and exit process
    server.close(() => process.exit(1));
});