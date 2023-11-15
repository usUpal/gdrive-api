import drive from "./gconfig";

async function createDirectory() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "test-dir-1", // Specify the name of the new directory
        mimeType: "application/vnd.google-apps.folder",
      },
    });

    console.log("Directory created:", response.data);
  } catch (error) {
    console.error("Error creating directory:", error.message);
  }
}
// createDirectory();

async function createDirectoryStructure() {
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

export default { createDirectoryStructure, createDirectory };
