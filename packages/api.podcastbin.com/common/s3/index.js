import AWS from "aws-sdk";

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

export const signS3 = (command, params) =>
  new Promise((resolve, reject) => {
    const finalParams = {
      Expires: 30 * 60,
      Bucket: MY_BUCKET,
      ...params
    };

    const handler = (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    };

    s3.getSignedUrl(command, finalParams, handler);
  });
