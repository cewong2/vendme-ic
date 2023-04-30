<template>
    <div>
      <v-autocomplete
        v-model="label"
        :items="labels"
        @change="onLabelChange"
        label="Label"
        clearable
        outlined
        return-object
      ></v-autocomplete>
      <v-btn @click="createNewLabel">Create new label</v-btn>
    </div>
  </template>
  
  <script>
  import { gapi } from "gapi";
  import { createSubFolder } from "@/google-drive";
  
  export default {
    data() {
      return {
        label: null,
        labels: [],
      };
    },
    methods: {
      async onLabelChange() {
        if (this.label) {
          // Perform the action when a label is selected
        }
      },
      async fetchLabels() {
        const response = await gapi.client.drive.files.list({
          q: `'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
          fields: "nextPageToken, files(id, name)",
        });
  
        this.labels = response.result.files;
      },
      async createNewLabel() {
        const name = prompt("Enter the new label name:");
        if (name) {
          const folderId = await createSubFolder(name);
          this.labels.push({ id: folderId, name });
        }
      },
    },
    async created() {
      await this.fetchLabels();
    },
  };
  </script>
  