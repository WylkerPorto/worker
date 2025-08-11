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
import supervisorDashboard from '@/components/layouts/SupervisorDashboard.vue'
import recruiterDashboardLayout from '@/components/layouts/RecruiterDashboard.vue'
import userDashboardLayout from '@/components/layouts/UserDashboard.vue'
import moment from 'moment'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// Define o locale global
moment.locale('pt-br')

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
app.component('supervisorDashboardLayout', supervisorDashboard)
app.component('recruiterDashboardLayout', recruiterDashboardLayout)
app.component('userDashboardLayout', userDashboardLayout)
app.component('QuillEditor', QuillEditor)

app.use(createPinia())
app.use(router)

app.mount('#app')
