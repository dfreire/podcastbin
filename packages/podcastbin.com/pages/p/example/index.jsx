import React, { useEffect } from "react";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { DragDrop } from "@uppy/react";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.podcastbin.com"
    : "http://localhost:9000";

const uppy = Uppy({
  meta: {},
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
  allowMultipleUploads: false,
  debug: true
});

const getUploadParameters = file => {
  return fetch(`${API_URL}/sign`, {
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
};

uppy.use(AwsS3, { getUploadParameters });

const Example = () => {
  useEffect(() => {
    const onComplete = result => {
      console.log("onComplete", { result });
    };

    const onSuccess = (file, data) => {
      console.log("onSuccess", { file, data });
    };

    uppy.on("complete", onComplete);
    uppy.on("upload-success", onSuccess);

    return () => {
      uppy.off("complete", onComplete);
      uppy.off("upload-success", onSuccess);
    };
  });

  return (
    <div>
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            dropHereOr: "Drop here or %{browse}",
            browse: "browse"
          }
        }}
      />
    </div>
  );
};

export default Example;
