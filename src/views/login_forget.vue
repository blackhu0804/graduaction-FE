<template>
  <h1 @click="check">忘记密码</h1>
</template>

<script>
import * as account from "../api/account.js";

export default {
  methods: {
    check() {
      account.isLogin().then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style>
</style>
