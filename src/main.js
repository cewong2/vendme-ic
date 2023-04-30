import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './vuetify'
import { createDriveClient } from './drive-utils'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// define setDynamic() function
const setDynamic = (Vue) => {
  Vue.mixin({
    // ...
  })
}

// call setDynamic() function
setDynamic(Vue)

Vue.config.productionTip = false

// Load Google API client and authorize app
gapi.load('client:auth2', () => {
  gapi.client.init({
    clientId: '633902444937-9h2et3s8rtkd014plld9fueg3lu669qk.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/drive.file'
  }).then(() => {
    // Set up drive client
    const driveClient = createDriveClient()

    // Pass driveClient instance to app
    new Vue({
      router,
      vuetify,
      render: h => h(App, { props: { driveClient } })
    }).$mount('#app')
  })
})
