import { google } from "googleapis";

// Function to create a subfolder in Google Drive
export async function createSubFolder(folderName, parentFolderId) {
  const drive = google.drive({ version: "v3" });
  const fileMetadata = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder",
    parents: [parentFolderId],
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    fields: "id, name",
  });

  console.log(`Folder has been created with Name: ${response.data.name} and URL: https://drive.google.com/drive/folders/${response.data.id}`);

  return response.data;
}

// Function to upload a file to Google Drive
export async function uploadFile(file, folderId, fileName) {
  const drive = google.drive({ version: "v3" });
  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };
  const media = {
    mimeType: file.type,
    body: file,
  };
  const res = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id, name",
  });

  console.log(`File has been uploaded with Name: ${res.data.name} and URL: https://drive.google.com/file/d/${res.data.id}`);

  return res.data;
}
