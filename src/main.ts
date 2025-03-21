import './assets/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import snotify from 'vue3-snotify'
import 'vue3-snotify/style'
import 'vue3-snotify/theme/material'

import DefaultLayout from '@/components/layouts/Default.vue'
import EmptyLayout from '@/components/layouts/Empty.vue'
import adminDashboardLayout from '@/components/layouts/AdminDashboard.vue'
import userDashboardLayout from '@/components/layouts/UserDashboard.vue'
import recruterDashboardLayout from '@/components/layouts/RecruterDashboard.vue'

const app = createApp(App)

const options = {
  toast: {
    position: 'rightTop', // Use string value directly
  },
}

app.use(snotify, options)
app.provide('snotify', app.config.globalProperties.$snotify)

app.component('DefaultLayout', DefaultLayout)
app.component('EmptyLayout', EmptyLayout)
app.component('adminDashboardLayout', adminDashboardLayout)
app.component('userDashboardLayout', userDashboardLayout)
app.component('recruterDashboardLayout', recruterDashboardLayout)

app.use(createPinia())
app.use(router)

app.mount('#app')
