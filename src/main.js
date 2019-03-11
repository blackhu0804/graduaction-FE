import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import VCharts from "v-charts";
import animate from "animate.css";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.use(VCharts);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
