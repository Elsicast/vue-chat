import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import "@/svgIcon/index";
import svgIcon from "@/svgIcon/svgIndex.vue";

const app = createApp(App);
app.use(router).use(store);
app.component("svg-icon", svgIcon);
app.mount("#app");
