<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import * as account from "./api/account.js";
export default {
  name: "app",
  methods: {
    checkLogin() {
      account.isLogin().then(res => {
        if (res.data.code === 0) {
          this.$router.replace("/login");
        }
      });
    }
  },
  created() {
    this.checkLogin();
  }
};
</script>

<style>
@import url("./assets/common.css");
</style>
