
const {constants} = require("../constants");

const errorHandler =(err,req,res,next)=>{
    const statusCode = res.statusCode?res.statusCode: 500;

    switch(statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed",message: err.message,stackTrace: err.stack}); 
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Unauthorised",message: err.message,stackTrace: err.stack}); 
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidded",message: err.message,stackTrace: err.stack}); 
            break;
        case constants.SERVER_ERROR:
            res.json({title:"Server Error",message: err.message,stackTrace: err.stack}); 
            break;
        default:
            res.json({title:"Forbidded",message: err.message,stackTrace: err.stack}); 
            break;
    }
    
};

module.exports = errorHandler;