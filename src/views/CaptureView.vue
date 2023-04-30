<template>
    <div>
      <image-crop-upload
        v-model="image"
        :width="224"
        :height="224"
        @crop-success="onCropSuccess"
        @crop-upload-success="onCropUploadSuccess"
        @crop-upload-fail="onCropUploadFail"
      >
        <template #capture>
          <v-btn @click="onCaptureButtonClick">Capture</v-btn>
        </template>
        <template #upload>
          <v-btn @click="onUploadButtonClick">Upload</v-btn>
        </template>
      </image-crop-upload>
      <v-btn @click="onFinishedCapture">Finished Capture</v-btn>
    </div>
  </template>
  
  <script>
  import 'vue-image-crop-upload/dist/vue-image-crop-upload.css';
  import { ImageCropUpload } from 'vue-image-crop-upload';

  export default {
    components: {
      ImageCropUpload,
    },
    data() {
      return {
        image: null,
      };
    },
    methods: {
      onCaptureButtonClick() {
        this.$refs.ImageCropUpload.captureImage();
      },
      onCropSuccess(imageDataUrl) {
        this.image = imageDataUrl;
      },
      onCropUploadSuccess(response) {
        console.log('Upload success:', response);
      },
      onCropUploadFail(status) {
        console.log('Upload failed:', status);
      },
      onUploadButtonClick() {
        // Perform the upload action here
      },
      onFinishedCapture() {
        // Navigate to the review screen
      },
    },
  };
  </script>
  