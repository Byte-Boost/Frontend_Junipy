import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(Toast, toastOptions);
app.mount("#app");
