import drive from "./gconfig";
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

export default generatePublicUrl;
