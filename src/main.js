import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import createServer from './mock'

createApp(App).mount('#app')

if (process.env.NODE_ENV === 'development') {
    createServer();
}