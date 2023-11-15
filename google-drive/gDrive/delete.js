import drive from "./gconfig.js";

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

export default deleteFile;
