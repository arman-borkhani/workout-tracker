import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import BaseButton from './components/BaseButton.vue';
import BaseAlert from './components/BaseAlert.vue';

const app = createApp(App);

app.component('BaseButton', BaseButton);
app.component('BaseAlert', BaseAlert);

app.use(router);
app.mount('#app');
