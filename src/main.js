import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './vuetify'
import { createDriveClient } from './drive-utils'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'vue-image-crop-upload/upload.css';
import 'vuetify/dist/vuetify.min.css'

Vue.use(vuetify)

Vue.config.productionTip = false

const script = document.createElement('script');
script.src = 'https://apis.google.com/js/api.js';
script.onload = () => {
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
        mounted () {
          const setDynamic = (Vue) => {
            Vue.mixin({
              beforeCreate () {
                const options = this.$options
                if (options.dynamicProps) {
                  const data = options.data
                  options.data = function () {
                    return {
                      ...(typeof data === 'function' ? data.call(this) : data),
                      propsData: {}
                    }
                  }
                  options.computed = options.computed || {}
                  Object.keys(options.dynamicProps).forEach(key => {
                    options.computed[key] = function () {
                      return this.propsData[key] !== undefined
                        ? this.propsData[key]
                        : options.dynamicProps[key]
                    }
                  })
                }
              },
              mounted () {
                const propsData = {}
                const options = this.$options
                Object.keys(options.dynamicProps || {}).forEach(key => {
                  propsData[key] = this[key]
                  delete this[key]
                })
                this.propsData = propsData
              }
            })
          }

          setDynamic(Vue)

          // Render app
          this.$mount('#app')
        },
        render: h => h(App, { props: { driveClient } })
      })
    })
  })
};
document.head.appendChild(script);
