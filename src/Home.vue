<template>
    <div class="home">
      <div class="title">VendMe AI Image Capture</div>
      <div class="description">Capture images for the VendMe AI model</div>
      <router-link to="/capture">
        <button type="button" class="btn btn-primary btn-lg">
          Capture Photos
        </button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeView",
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .description {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  </style>
  