// https://github.com/transloadit/uppy/blob/master/examples/aws-presigned-url/s3-sign.php
// https://softwareontheroad.com/aws-s3-secure-direct-upload/

const AWS = require("aws-sdk");

const {
  MY_ACCESS_KEY,
  MY_SECRET_ACCESS_KEY,
  MY_REGION,
  MY_BUCKET
} = process.env;

const signatureVersion = "v4"; // "latest" ?

AWS.config.update({
  accessKeyId: MY_ACCESS_KEY,
  secretAccessKey: MY_SECRET_ACCESS_KEY,
  region: MY_REGION,
  signatureVersion
});

const s3 = new AWS.S3({
  region: MY_REGION,
  // endpoint: new AWS.Endpoint(`${MY_BUCKET}.s3-accelerate.amazonaws.com`),
  // useAccelerateEndpoint: true,
  signatureVersion
});

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.send();
    return;
  }

  const { contentType, filename } = req.body;

  const signedURL = await new Promise((resolve, reject) => {
    const params = {
      // Expires: 30 * 60, // 30 minutes
      Bucket: MY_BUCKET,
      Key: filename,
      ContentType: contentType
    };

    const handler = (err, data) => {
      console.log("aws data", { data });
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    };

    s3.getSignedUrl("putObject", params, handler);
  });

  res.json({
    method: "put",
    url: signedURL,
    fields: []
    // headers: "headers"
  });
};
