<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <router-view :drive-client="driveClient" />
        <div v-if="showText" style="margin: 24px;">
          <label>Enter folder name:</label>
          <input v-model="inputText" />
          <br />
          <v-btn color="primary" @click="createFolder">Create Folder</v-btn>
        </div>
        <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
          {{ snackbar.text }}
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import { createDriveClient } from '@/drive-utils';
import { resizeImage } from '@/image-utils';
import { getLabels, uploadFileToFolder } from '@/google-drive';
import { VApp, VBtn, VContainer, VMain, VSnackbar } from 'vuetify/lib';

export default {
  name: 'App',
  components: {
    VApp,
    VBtn,
    VContainer,
    VMain,
    VSnackbar
  },
  data: () => ({
    showText: false,
    inputText: '',
    snackbar: {
      show: false,
      text: '',
      timeout: 3000
    }
  }),
  methods: {
    ...mapActions(['createFolderAction']),
    createFolder() {
      if (!this.inputText) {
        this.showSnackbar('Folder name is required');
        return;
      }

      this.createFolderAction(this.inputText).then(() => {
        this.showSnackbar(`Folder "${this.inputText}" created successfully`);
        this.inputText = '';
        this.showText = false;
      }).catch((err) => {
        console.error(err);
        this.showSnackbar(`Error creating folder: ${err.message}`);
      });
    },
    showSnackbar(text) {
      this.snackbar.text = text;
      this.snackbar.show = true;
    },
    async getImage() {
      return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
          if (!event.target.files || event.target.files.length === 0) {
            resolve(null);
            return;
          }
          const file = event.target.files[0];
          resolve(file);
        };
        input.click();
      });
    },
    async getLabel() {
      const labelName = await this.$refs.dialog.open();
      let label = this.labels.find((label) => label.name === labelName);
      if (!label) {
        label = await createLabel(labelName, this.driveClient);
      }
      return label;
    },
  },
  computed: {
    async labels() {
      return await getLabels(this.driveClient);
    }
  },
  async mounted() {
    this.driveClient = createDriveClient();

    const imageFiles = [];
    let count = 0;
    while (count < 3) {
      const image = await this.getImage();
      if (!image) {
        break;
      }
      imageFiles.push(image);
      count++;
    }

    for (let i = 0; i < imageFiles.length; i++) {
      let resizedImage = await resizeImage(imageFiles[i]);
      let label = await this.getLabel();
      await uploadFileToFolder(resizedImage.name, resizedImage, label.id, this.driveClient);
    }
  },
};
</script>

<style>
  #app {
    height: 100%;
  }
</style>
