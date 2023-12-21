// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import axios from './axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line to import Bootstrap styles

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.mount('#app');
