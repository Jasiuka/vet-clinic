import { tryCatch } from "../../utils/tryCatch.js";
import pool from "../../../server.js";
import express from "express";
import {
  getAuthorizationToken,
  getUploadUrl,
  uploadFile,
} from "../../utils/storage-api.js";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/api/v1/files/upload",
  upload.single("file"),
  tryCatch(async (request, response) => {
    const file = request.file;

    const sha1Sum = crypto.createHash("sha1");
    sha1Sum.update(file.buffer);
    const sha1Hex = sha1Sum.digest("hex");

    getAuthorizationToken().then(({ token, apiUrl }) =>
      getUploadUrl(token, apiUrl).then(({ uploadUrl, token }) =>
        console.log("UploadUrl:", uploadUrl)
      )
    );

    // getAuthorizationToken().then(({ token }) =>
    //   getUploadUrl(token).then(({ uploadUrl, token }) =>
    //     uploadFile(uploadUrl, token, file.originalname, file.mimetype, sha1Hex)
    //   )
    // );
  })
);

// getAuthorizationToken().then(({ token, accountId, apiUrl }) => {
//   console.log("Token:", token);
//   console.log("Url:", apiUrl);
//   fetch(`${apiUrl}/b2api/v3/b2_list_file_names`, {
//     method: "POST",
//     headers: {
//       Authorization: `${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       bucketId: "17841ff8d06bf46788ba0f18",
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// });

export default router;
