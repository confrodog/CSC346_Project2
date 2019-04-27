const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')

const DBinfo = require("./public/connection");
 
aws.config.update({
    accessKeyId: DBinfo.accessKeyID,
    secretAccessKey: DBinfo.secretAccessKey,
    region: "us-west-1"
});

const s3 = new aws.S3({ /* ... */ })
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'cloud-bj-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;