import { google } from 'googleapis';
import { config } from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

config();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const filePath = path.join(__dirname, "dog.jpg");

export async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "dog.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath), // read file from local
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
// uploadFile();
export async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "1daOxTt4qCNtIAWni_3zkheZIn9QhXyeB",
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error);
  }
}
// deleteFile();

export async function generatePublicUrl() {
  try {
    const fileId = "1HIz6RMyQ8AiX7G4RhBsQRzo4lD6cQ4oE";
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}
// generatePublicUrl();
export default createDirectory = async (name)  => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: name, // Specify the name of the new directory
        mimeType: "application/vnd.google-apps.folder",
      },
    });

    console.log("Directory created:", response.data);
  } catch (error) {
    console.error("Error creating directory:", error.message);
  }
};
// createDirectory();

export async function createDirectoryStructure() {
  try {
    // Create the main directory "shoot1"
    const mainDirectoryResponse = await drive.files.create({
      requestBody: {
        name: "shoot1",
        mimeType: "application/vnd.google-apps.folder",
      },
    });

    const mainDirectoryId = mainDirectoryResponse.data.id;

    // Create subdirectories "raw" and "edited" inside the main directory
    const rawDirectoryResponse = await drive.files.create({
      requestBody: {
        name: "raw",
        mimeType: "application/vnd.google-apps.folder",
        parents: [mainDirectoryId],
      },
    });

    const editedDirectoryResponse = await drive.files.create({
      requestBody: {
        name: "edited",
        mimeType: "application/vnd.google-apps.folder",
        parents: [mainDirectoryId],
      },
    });

    const rawDirectoryId = rawDirectoryResponse.data.id;
    const editedDirectoryId = editedDirectoryResponse.data.id;

    // Create subdirectories "photo" and "video" inside the "raw" directory
    const rawPhotoDirectoryResponse = await drive.files.create({
      requestBody: {
        name: "photo",
        mimeType: "application/vnd.google-apps.folder",
        parents: [rawDirectoryId],
      },
    });

    const rawVideoDirectoryResponse = await drive.files.create({
      requestBody: {
        name: "video",
        mimeType: "application/vnd.google-apps.folder",
        parents: [rawDirectoryId],
      },
    });

    // Create subdirectories "photo" and "video" inside the "edited" directory
    const editedPhotoDirectoryResponse = await drive.files.create({
      requestBody: {
        name: "photo",
        mimeType: "application/vnd.google-apps.folder",
        parents: [editedDirectoryId],
      },
    });

    const editedVideoDirectoryResponse = await drive.files.create({
      requestBody: {
        name: "video",
        mimeType: "application/vnd.google-apps.folder",
        parents: [editedDirectoryId],
      },
    });

    console.log("Directory structure created successfully!");
  } catch (error) {
    console.error("Error creating directory structure:", error);
  }
}
