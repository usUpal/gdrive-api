import fs from "fs/promises";
import path from "path";
import drive from "./gconfig.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
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

export default uploadFile;
