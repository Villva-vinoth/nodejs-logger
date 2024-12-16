const multer = require('multer');
const fs = require('fs')
const path = require('path');

const uploadDir = path.join(__dirname,'../public','uploads')
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{ recursive: true });
}

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,uploadDir)
    },
    filename : function(req,file,cb){
        console.time("answer time")
        cb(null,file.originalname)
    }
})

const uploads = multer({ 
    storage : storage
})

module.exports = {uploads}