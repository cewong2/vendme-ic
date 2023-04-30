<template>
    <div>
      <div v-for="(photo, index) in photos" :key="index">
        <img :src="resizedPhotos[index]" :alt="'Photo ' + (index + 1)" />
        <v-btn @click="replacePhoto(index)">Replace</v-btn>
      </div>
      <v-btn @click="onContinue">Continue</v-btn>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { resizeImage } from "@/image-utils";
  import router from "@/router";
  import { createSubFolder } from "@/drive-utils";
  import { uploadFile } from "@/drive-utils";

  //const FOLDER_NAME = "Japanese Vending Machine AI Model";
  const FOLDER_ID = "1YcTWaN7yK7Tb1OvLoxgMXoooAX47UYwf";

  export default {
    setup() {
      const photos = ref([]);
  
      const resizedPhotos = ref([]);
  
      function replacePhoto() {
        // Implement the replace functionality here
      }
  
      async function onContinue() {
        const subFolderName = await router.resolve({
          name: "Label"
        }).href;
        const folderId = await createSubFolder(subFolderName, FOLDER_ID);
        for (let i = 0; i < photos.value.length; i++) {
          const blob = dataURItoBlob(resizedPhotos.value[i]);
          const filename = `${Date.now()}.jpg`;
          const response = await uploadFile(blob, filename, folderId);
          console.log("Upload success:", response);
        }
        router.push({ name: "Label" });
      }
  
      function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeType = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: mimeType });
      }
  
      async function resizePhotos() {
        const promises = photos.value.map((photo) =>
          resizeImage(photo, 224, 224)
        );
        resizedPhotos.value = await Promise.all(promises);
      }
  
      async function loadPhotos() {
        // Fetch the photos from the Google Drive folder and add them to the photos array
        // ...
        await resizePhotos();
      }
  
      loadPhotos();
  
      return {
        photos,
        resizedPhotos,
        replacePhoto,
        onContinue
      };
    }
  };
  </script>
  