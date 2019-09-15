import React, { useState, useEffect } from "react";
import Head from "next/head";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import DragDrop from "@uppy/react/lib/DragDrop";
import StatusBar from "@uppy/react/lib/StatusBar";

console.log("NODE_ENV", process.env.NODE_ENV);

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.podcastbin.com"
    : "http://localhost:9000";

const uppy = Uppy({
  meta: {},
  restrictions: { minNumberOfFiles: 1, maxNumberOfFiles: 1 },
  autoProceed: true,
  allowMultipleUploads: false,
  debug: true
});

const getUploadParameters = file =>
  fetch(`${API_URL}/sign-upload`, {
    method: "post",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type
    })
  }).then(response => response.json());

const getDownloadUrl = async filename =>
  fetch(`${API_URL}/sign-download`, {
    method: "post",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({ filename })
  }).then(response => response.json());

uppy.use(AwsS3, { getUploadParameters });

const Example = () => {
  const [url, setUrl] = useState();

  useEffect(() => {
    const onComplete = result => {
      console.log("onComplete", { result });
    };

    const onSuccess = (file, data) => {
      console.log("onSuccess", { file, data });
      uppy.removeFile(file.id);
      const filename = file.data.name;
      getDownloadUrl(filename).then(({ url }) => {
        setUrl(url);
      });
    };

    uppy.on("complete", onComplete);
    uppy.on("upload-success", onSuccess);

    return () => {
      uppy.off("complete", onComplete);
      uppy.off("upload-success", onSuccess);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Example</title>
        <link
          href="https://transloadit.edgly.net/releases/uppy/v1.4.0/uppy.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      <div style={{ color: "green" }}>
        <DragDrop uppy={uppy} />
        <StatusBar uppy={uppy} />
      </div>
      {url != null && <a href={url}>{url}</a>}
    </div>
  );
};

export default Example;
