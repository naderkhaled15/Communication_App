import "./assets/style.css";
import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";
import router from "./router";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";




const app = createApp(App);
const emitter = mitt();
app.provide("emitter", emitter);
app.use(createPinia());
app.use(router);
app.use(BootstrapVue3);

app.mount("#app");
