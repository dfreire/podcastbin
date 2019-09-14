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

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    res.send();
    return;
  }

  const { filename } = req.body;

  const signedURL = await new Promise((resolve, reject) => {
    const params = {
      Expires: 30 * 60,
      Bucket: MY_BUCKET,
      Key: filename
    };

    const handler = (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    };

    s3.getSignedUrl("getObject", params, handler);
  });

  res.json({ signedURL });
};
