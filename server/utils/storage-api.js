import dotenv from "dotenv";
import { google } from "googleapis";
import { Readable } from "stream";

const keyFile = "vet-clinic-405920-db0f00b05e16.json";
const scopes = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes,
});

const drive = google.drive({ version: "v3", auth });

// Lists all google drive files
export const listFiles = async () => {
  try {
    // const response = await drive.files.list({});
    const response = await drive.files.list({
      // Filter to get only folders
      fields: "files(id, name)",
    });
  } catch (err) {
    console.error("ERROR:", err);
  }
};

// Deletes google drive file by fileId
export const deleteFile = async (fileID) => {
  try {
    const response = await drive.files.delete({
      fileId: fileID,
    });
  } catch (err) {
    console.error("ERROR:", err);
  }
};

// Creates new file in google drive
export const createFile = async (file) => {
  try {
    const folderId = process.env.STORAGE_FOLDER_ID;
    const fileMetadata = {
      name: file.originalname,
      parents: [folderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    const { id } = response.data;
    return id;
  } catch (error) {
    console.error(error);
  }
};

// Gets download link for file by fileId
export const downloadFileById = async (fileId) => {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      fields: "webContentLink",
    });

    const webContentLink = response.data.webContentLink;
    return webContentLink;
  } catch (error) {
    console.error(error);
  }
};
