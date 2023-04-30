import { gapi } from "gapi";

const FOLDER_ID = '1YcTWaN7yK7Tb1OvLoxgMXoooAX47UYwf';
const FOLDER_NAME = 'Japanese Vending Machine AI Model';

export async function createSubFolder(name) {
  const folderMetadata = {
    name,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [FOLDER_ID],
  };

  const response = await gapi.client.drive.files.create({
    resource: folderMetadata,
    fields: 'id',
  });

  return response.result.id;
}

export async function uploadImageToDrive(base64Data, fileName, folderId) {
  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };

  const response = await gapi.client.drive.files.create({
    resource: fileMetadata,
    media: {
      mimeType: 'image/jpeg',
      body: base64DataToBlob(base64Data),
    },
    fields: 'id',
  });

  return response.result.id;
}

function base64DataToBlob(base64Data) {
  // Convert base64 data to ArrayBuffer
  const byteString = atob(base64Data.split(',')[1]);
  const buffer = new ArrayBuffer(byteString.length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < byteString.length; i++) {
    view[i] = byteString.charCodeAt(i);
  }

  // Create Blob from ArrayBuffer
  const mimeType = base64Data.split(',')[0].split(':')[1].split(';')[0];
  return new Blob([buffer], { type: mimeType });
}
