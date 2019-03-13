import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import animate from "animate.css";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
// import echarts from "echarts";
// Vue.prototype.$echarts = echarts;
Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
