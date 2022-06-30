import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import "element-plus/theme-chalk/display.css";
import "element-plus/dist/index.css";
import "ant-design-vue/lib/button";
import "ant-design-vue/lib/input";
import "ant-design-vue/dist/antd.css";

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
