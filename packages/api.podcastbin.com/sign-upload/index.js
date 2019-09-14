import { signS3 } from "../common/s3";

export default async (req, res) => {
  if (req.method === "OPTIONS") {
    res.send();
  } else if (req.method === "POST") {
    const { contentType, filename } = req.body;
    const url = await signS3("putObject", {
      Key: filename,
      ContentType: contentType
    });
    res.json({
      method: "put",
      url,
      fields: []
    });
  }

  res.status(401).send();
};
