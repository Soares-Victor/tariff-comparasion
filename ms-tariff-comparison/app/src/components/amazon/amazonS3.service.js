require("dotenv").config();
const fs = require("fs");
const aws = require("aws-sdk");
const configAws = require("./aws.config");
const s3 = new aws.S3({
  endpoint: process.env.AWS_S3_ENDPOINT,
  s3ForcePathStyle: true,
  params: configAws,
});

exports.deleteFiles = async (fileNames) => {
  const objects = [];

  fileNames.forEach((fileName) => {
    objects.push({Key: fileName});
  });

  const params = {
    Bucket: process.env.BUCKET_TO_PROCESS,
    Delete: {
      Objects: objects,
    },
  };
  return await s3.deleteObjects(params).promise();
};

exports.uploadFileToProcess = async (fileModel) => {
  return fs.writeFile(fileModel.name, fileModel.base64,
    {encoding: "base64"}, function(err) {
      if (err) throw err;
      return fs.readFile(fileModel.name, (async (err, data) => {
        if (err) throw err;
        const params = {
          Bucket: process.env.BUCKET_TO_PROCESS,
          Key: fileModel.name,
          Body: data,
        };
        return await s3.upload(params).promise();
      }));
    });
};

exports.downloadFileToProcess = async (fileName) => {
  const params = {
    Key: fileName,
    Bucket: process.env.BUCKET_TO_PROCESS,
  };
  return await s3.getObject(params).promise()
    .then((value) => value)
    .catch((reason) => {
      throw reason;
    });
};

exports.listAllToProcess = async () => {
  const params = {
    Bucket: process.env.BUCKET_TO_PROCESS,
  };
  return await s3.listObjects(params).promise()
    .then((value) => {
      const files = [];
      value.Contents.forEach((f) => {
        files.push(f.Key);
      });
      return files;
    }).catch((reason) => {
      throw reason;
    });
};

exports.deleteFileById = async (fileName) => {
  const params = {
    Key: fileName,
    Bucket: process.env.BUCKET_TO_PROCESS,
  };
  return await s3.deleteObject(params).promise();
};
