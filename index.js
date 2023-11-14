const { google } = require("googleapis");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

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

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const filePath = path.join(__dirname, "dog.jpg");

async function uploadFile() {
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
}
// uploadFile();
async function deleteFile() {
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

async function generatePublicUrl() {
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
generatePublicUrl();
