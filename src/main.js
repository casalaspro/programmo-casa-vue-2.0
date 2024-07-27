import { createApp } from 'vue'
import App from './App.vue'
import * as bootstrap from 'bootstrap'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser, faEye } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faUser, faFacebook, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub, faEye)

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
