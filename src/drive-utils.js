import { getAuthClient, createDriveClient, listFiles } from './google-drive';
import { getImageData } from './image-utils';

const ROOT_FOLDER_NAME = 'Vendme-ic';

async function createFolder(driveClient, name, parentFolderId = null) {
  const folderMetadata = {
    name: name,
    mimeType: 'application/vnd.google-apps.folder'
  };
  if (parentFolderId) {
    folderMetadata.parents = [parentFolderId];
  }

  const response = await driveClient.files.create({
    resource: folderMetadata,
    fields: 'id'
  });

  return response.data.id;
}

async function createRootFolder(driveClient) {
  // Check if root folder exists
  let folderId;
  const query = `mimeType='application/vnd.google-apps.folder' and name='${ROOT_FOLDER_NAME}' and trashed=false`;
  const response = await driveClient.files.list({ q: query, fields: 'nextPageToken, files(id, name)' });
  if (response.data.files.length > 0) {
    folderId = response.data.files[0].id;
  } else {
    // Create root folder if it doesn't exist
    folderId = await createFolder(driveClient, ROOT_FOLDER_NAME);
  }

  return folderId;
}

async function createImageFolder(driveClient, folderName) {
  const rootFolderId = await createRootFolder(driveClient);
  const folderId = await createFolder(driveClient, folderName, rootFolderId);
  return folderId;
}

async function uploadImages(driveClient, folderName, images, label) {
  const folderId = await createImageFolder(driveClient, folderName);

  for (let i = 0; i < images.length; i++) {
    const imageData = await getImageData(images[i]);
    const fileMetadata = {
      name: `${label}_${i}.jpg`,
      parents: [folderId]
    };
    const media = {
      mimeType: 'image/jpeg',
      body: imageData
    };
    await driveClient.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    });
  }
}

async function getLabels(driveClient) {
  const labels = new Set();
  const query = "mimeType='application/vnd.google-apps.folder' and trashed=false";
  const response = await driveClient.files.list({ q: query, fields: 'nextPageToken, files(id, name)' });
  const folders = response.data.files;
  for (const folder of folders) {
    const folderId = folder.id;
    const folderName = folder.name;
    const files = await listFiles(driveClient, folderId);
    files.forEach(file => {
      const name = file.name;
      const label = name.split('_')[0];
      if (label) {
        labels.add(label);
      }
    });
  }
  return Array.from(labels);
}

export {
  getAuthClient,
  createDriveClient,
  createRootFolder,
  createImageFolder,
  uploadImages,
  getLabels
};
