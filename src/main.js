import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import createServer from './api/mock'

createApp(App).mount('#app')

// Create a server even if on prod (Netlify).
createServer();
