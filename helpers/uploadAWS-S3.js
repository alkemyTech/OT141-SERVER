const S3 = require('aws-sdk/clients/s3');

// Environment Variables
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.AWS_NAME_BUCKET;

const storage = new S3({
  // We create an S3 instance passing it the required
  // parameters to establish the connection to AWS S3
  region,
  accessKeyId,
  secretAccessKey,
});

const uploadInBucket = (fileName, body) => storage.upload({
  Bucket: bucketName, // Bucket Name
  Key: fileName, // The Key is the value with which it is saved in the Bucket
  Body: body, // The Body receives the binary information from the file
}).promise(); // return as promise

module.exports = { uploadInBucket };
