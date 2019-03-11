import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "登录",
      component: resolve => {
        require(["../views/login.vue"], resolve);
      },
      children: [
        {
          path: "/forget",
          name: "找回密码",
          component: resolve => require(["../views/login_forget.vue"], resolve)
        },
        {
          path: "/register",
          name: "注册",
          component: resolve => require(["../views/register.vue"], resolve)
        }
      ]
    },
    {
      path: "/index",
      name: "首页",
      component: resolve => {
        require(["../views/main_page.vue"], resolve);
      }
    },
    {
      path: "/401",
      name: "无权访问",
      component: resolve => {
        require(["../views/common/401.vue"], resolve);
      }
    },
    {
      path: "/404",
      name: "找不到页面",
      component: resolve => {
        require(["../views/common/404.vue"], resolve);
      }
    }
  ]
});
