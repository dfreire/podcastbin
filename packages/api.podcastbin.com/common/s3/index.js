const AWS = require("aws-sdk");

const {
  MY_ACCESS_KEY,
  MY_SECRET_ACCESS_KEY,
  MY_REGION,
  MY_BUCKET
} = process.env;

const signatureVersion = "v4";

AWS.config.update({
  accessKeyId: MY_ACCESS_KEY,
  secretAccessKey: MY_SECRET_ACCESS_KEY,
  region: MY_REGION,
  signatureVersion
});

const s3 = new AWS.S3({
  region: MY_REGION,
  signatureVersion
});

export default s3;
