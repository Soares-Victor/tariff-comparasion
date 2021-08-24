require("dotenv").config();
const fs = require("fs");
const aws = require("aws-sdk");
const configAws = require("./aws.config");
const s3 = new aws.S3({
  endpoint: process.env.AWS_S3_ENDPOINT,
  s3ForcePathStyle: true,
  params: configAws,
});

exports.uploadUserPhoto = async (filename, base64) => {
  return fs.writeFile(filename, base64,
    {encoding: "base64"}, function(err) {
      if (err) throw err;
      return fs.readFile(filename, (async (err, data) => {
        if (err) throw err;
        const params = {
          Bucket: process.env.BUCKET_USER_PHOTOS,
          Key: filename,
          Body: data,
        };
        return await s3.upload(params).promise();
      }));
    });
};

exports.downloadUserPhotoByFileName = async (fileName) => {
  const params = {
    Key: fileName,
    Bucket: process.env.BUCKET_USER_PHOTOS,
  };
  return await s3.getObject(params).promise()
    .then((value) => value)
    .catch((reason) => {
      throw reason;
    });
};
