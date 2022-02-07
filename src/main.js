import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "@/store/store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

var app = createApp(App);
// 屏蔽错误信息
// app.config.errorHandler = () => null;
// 屏蔽警告信息
app.config.warnHandler = () => null;
app.use(Quasar, quasarUserOptions).use(store).use(router).mount("#app");
