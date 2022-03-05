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

// Receives a file and a string with the name of a directory that
// represents the environment where the function will be used

const uploadInBucket = (file, directoryNameInBucket) => {
  if (typeof file !== 'object' || Array.isArray(file)) throw new Error('The first parameter has to be an object');
  if (typeof directoryNameInBucket !== 'string') throw new Error('The second parameter has to be a string');
  // Using the library that is with this code we look for the file that we
  // need to send to the Body parameter
  const Body = Object.values(file).find((value) => Buffer.isBuffer(value));
  if (!Body) throw new Error('The file is invalid');

  return storage
    .upload({
      Bucket: bucketName, // Bucket Name
      Key: `${directoryNameInBucket}/${file.name}`, // The Key is the value with which it is saved in the Bucket
      Body, // The Body receives the binary information from the file
    })
    .promise(); // return as promise
};

module.exports = { uploadInBucket };
