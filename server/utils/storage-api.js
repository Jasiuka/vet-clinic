import dotenv from "dotenv";

export const getAuthorizationToken = async () => {
  // Gets the authorization token to access storage bucket
  return fetch("https://api.backblazeb2.com/b2api/v3/b2_authorize_account", {
    method: "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.STORAGE_APP_KEY_ID}:${process.env.STORAGE_APP_KEY}`
      ).toString("base64")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        token: data.authorizationToken,
        accountId: data.accountId,
        apiUrl: data.apiInfo.storageApi.apiUrl,
      };
    });
};

export const getUploadUrl = async (token, url) => {
  return fetch(`${url}?bucketId=17841ff8d06bf46788ba0f18`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((data) => {
      console.log(data.message);
      return { uploadUrl: data.uploadUrl, token: data.authorizationToken };
    });
};

export const uploadFile = async (
  uploadUrl,
  token,
  fileName,
  contentType,
  sha1Sum
) => {
  return fetch(uploadUrl, {
    headers: {
      Authorization: token,
    },
    method: "POST",
    body: JSON.stringify({
      "X-Bz-File-Name": fileName,
      "Content-type": contentType,
      "X-Bz-Content-Sha1": sha1Sum,
    }),
  }).then((response) => console.log(response.status));
};
