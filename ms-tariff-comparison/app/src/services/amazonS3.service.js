const fs = require('fs')
const aws = require('aws-sdk')
const configAws = require('../config/aws.config')
const dotenv = require('dotenv')

dotenv.config()
const s3 = new aws.S3({endpoint: process.env.AWS_S3_ENDPOINT, params:configAws});

exports.uploadFileToProcess = async (fileModel) => {
    fs.writeFile(fileModel.name, fileModel.base64, {encoding: 'base64'}, function (err) {
        if (err) throw err;
    })

    return fs.readFile(fileModel.name, (async (err, data) => {
        if (err) throw err;
        const params = {
            Bucket: process.env.BUCKET_TO_PROCESS,
            Key: fileModel.name,
            Body: data
        }
        return await s3.upload(params).promise();
    }));
}

exports.downloadFileToProcess = async (fileName) => {
    let params = {
        Key: fileName,
        Bucket: process.env.BUCKET_TO_PROCESS
    }
    return await s3.getObject(params).promise()
        .then(value => value)
        .catch(reason => {throw reason})
}

exports.listAllToProcess = async () => {
    const params = {
        Bucket: process.env.BUCKET_TO_PROCESS
    }
    return await s3.listObjects(params).promise()
        .then(value => {
            let files = []
            value.Contents.forEach(f => {
                files.push(f.Key)
            })
            return files
        }).catch(reason => {throw reason})
}

exports.deleteFileById = async (fileName) => {
    let params = {
        Key: fileName,
        Bucket: process.env.BUCKET_TO_PROCESS
    }
    return await s3.deleteObject(params).promise();
}