import { createApp, h } from 'vue';
import mitt from 'mitt';
import App from './App.vue';
import router from './router';
import store from './store';

const eventBus = mitt();
const app = createApp({
  render: () => h(App),
});

app.config.globalProperties.eventBus = eventBus;

app.use(router);
app.use(store);
app.mount('#app');
