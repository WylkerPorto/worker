import './assets/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import DefaultLayout from '@/components/layouts/Default.vue'
import EmptyLayout from '@/components/layouts/Empty.vue'
import DashboardLayout from '@/components/layouts/Dashboard.vue'

const app = createApp(App)

app.component('DefaultLayout', DefaultLayout)
app.component('EmptyLayout', EmptyLayout)
app.component('DashboardLayout', DashboardLayout)

app.use(createPinia())
app.use(router)

app.mount('#app')
