const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')

const DBinfo = require("../public/connection");

aws.config.update({
    accessKeyId: DBinfo.accessKeyID,
    secretAccessKey: DBinfo.secretAccessKey,
    region: "us-west-1"
});

const s3 = new aws.S3({ /* ... */ })
 
const fileFilter = function(req,file,cb){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(new Error("Invalid file type, only JPEG or PNG"),false);
    }
}


var upload = multer({
    fileFilter: fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'cloud-bj-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, req.file.filename);
    }
  })
})

module.exports = upload;