import { createWebHistory, createRouter } from 'vue-router'

import AppHome from './pages/AppHome.vue'
// import AppApartments from './pages/AppApartments.vue'
import AppMessages from './pages/AppMessages.vue'
import AppAdvancedSearch from './pages/AppAdvancedSearch.vue'
import AppApartment from './pages/AppApartment.vue'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    { path: '/', name: 'home', component: AppHome },
    // { path: '/apartments', name: 'apartments', component: AppApartments },
    { path: '/apartments/:id', name: 'apartment.show', component: AppApartment, props: true},
    { path: '/messages/:id', name: 'messages', component: AppMessages, props: true },
    { path: '/advanced-search', name: 'advanced-search', component: AppAdvancedSearch },
    // { path: '/apartment', name: 'apartment', component: AppApartment },


  ]
})

export default router