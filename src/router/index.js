import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/401",
      component: resolve => {
        require(["../views/common/401.vue"], resolve);
      }
    },
    {
      path: "/404",
      component: resolve => {
        require(["../views/common/404.vue"], resolve);
      }
    },
    {
      path: "/login",
      component: resolve => {
        require(["../views/login.vue"], resolve);
      }
    }
  ]
});
