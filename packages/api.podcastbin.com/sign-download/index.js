import { signS3 } from "../common/s3";

export default async (req, res) => {
  if (req.method === "OPTIONS") {
    res.send();
  } else if (req.method === "POST") {
    const { filename } = req.body;
    const url = await signS3("getObject", { Key: filename });
    res.json({ url });
  }

  res.status(401).send();
};
