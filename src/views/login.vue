<template>
  <div class="main-content">
    <header>
      <h1>
        <div>
          <p class="header-title">爬虫数据的可视化展示平台</p>
          <p class="shadow-item shadow-before"></p>
          <p class="shadow-item shadow-after"></p>
        </div>
        <p class="shadow"></p>
      </h1>
    </header>
    <div class="login flex-row align-center justify-center">
      <div class="content" v-if="$route.path === '/login'">
        <div class="map">
          <div class="location">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
          <div class="location location-1">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
          <div class="location location-2">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
          <div class="location location-3">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
          <div class="location location-4">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
          <div class="location location-5">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
          <div class="location location-6">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
          <div class="location location-7">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
          <div class="location location-8">
            <div class="border"></div>
            <div class="border1"></div>
            <img src="../assets/img/mp.png" alt="" />
          </div>
        </div>
        <div class="login-content">
          <h2 class="flex-row align-center">
            <span>用户登录</span>
            <p>Login</p>
          </h2>
          <el-form
            ref="validForm"
            :model="queryParam"
            :rules="rules"
            class="login-form"
          >
            <el-form-item class="form-item" prop="username">
              <el-input
                class="form-input"
                :autofocus="true"
                placeholder="输入用户名"
                v-model="queryParam.username"
              ></el-input>
              <p class="icon">
                <i class="iconfont">&#xe6a3;</i>
              </p>
            </el-form-item>
            <el-form-item class="form-item" prop="password">
              <el-input
                class="form-input"
                placeholder="输入密码"
                type="password"
                v-model="queryParam.password"
              ></el-input>
              <p class="icon">
                <i class="iconfont">&#xe663;</i>
              </p>
            </el-form-item>
            <div class="wjmm flex-row">
              <p class="register">还没有账号?点击注册</p>
              <p @click="forget" class="forget">忘记密码？</p>
            </div>
            <el-form-item class="submit-item">
              <el-button
                class="submit-button"
                @click="login"
                type="primary"
                :loading="loading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>

      <router-view v-else />
    </div>
  </div>
</template>

<script>
import * as account from "../api/account.js";

export default {
  data() {
    return {
      loading: false,
      queryParam: {
        username: "",
        password: ""
      },
      remember: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      account.login(this.queryParam).then(res => {
        // console.log(res.data.data.attemps.id);
        if (res.data.data.attemps.username) {
          // this.$router.replace("/forget");
        }
      });
    },
    forget() {
      this.$router.push({ path: "/forget" });
    }
  }
};
</script>

<style scoped>
.header-title {
  color: #4b7692;
  text-shadow: 0.1em 0.1em 0.05em #293944;
}
header h1 {
  text-align: center;
  background-color: rgba(40, 80, 128, 0.5);
  height: 50px;
  position: relative;
}
header h1 span {
  color: #47a7ea;
  text-shadow: 1px 1px 3px #625a5a;
  font-size: 32px;
  padding: 0 20px;
}
header h1 img {
  transform: scale(1.1);
  margin-top: 10px;
}
header h1 div {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 25px;
  z-index: 999;
}
.shadow {
  width: 400px;
  height: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50px;
  background-color: rgba(40, 80, 128, 0.5);
  z-index: 998;
}
.shadow-item {
  width: 0;
  height: 0;
  border-width: 25px 20px;
  border-style: solid;
  position: absolute;
  top: 25px;
}
.shadow-before {
  border-color: rgba(40, 80, 128, 0.5) rgba(40, 80, 128, 0.5) transparent
    transparent;
  left: -72px;
}
.shadow-after {
  border-color: rgba(40, 80, 128, 0.5) transparent transparent
    rgba(40, 80, 128, 0.5);
  right: -72px;
}
.content {
  display: flex;
}
.map {
  width: 600px;
  height: auto;
  background-image: url("../assets/img/login.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
}
.map .location {
  position: relative;
  left: 50px;
  top: 45px;
}
.map .location-1 {
  position: relative;
  left: 185px;
  top: 10px;
}
.map .location-2 {
  position: relative;
  left: 90px;
  top: 80px;
}
.map .location-3 {
  position: relative;
  left: 160px;
  top: 185px;
}
.map .location-4 {
  position: relative;
  left: 275px;
  top: 140px;
}
.map .location-5 {
  position: relative;
  left: 315px;
  top: 60px;
}
.map .location-6 {
  position: relative;
  left: 440px;
  top: 35px;
}
.map .location-7 {
  position: relative;
  left: 380px;
  top: 110px;
}
.map .location-8 {
  position: relative;
  left: 420px;
  top: 185px;
}
.map .location > img {
  position: absolute;
  width: 25px;
  height: 25px;
  left: 3px;
  top: 3px;
}
.map .location > .border {
  position: absolute;
  width: 16px;
  height: 8px;
  border: 1px solid #3fa7ff;
  left: 6px;
  top: 21px;
  border-radius: 8px/5px;
  animation: ani 2s linear infinite;
  box-shadow: inset 1px 1px 8px 1px #3fa7ff;
  opacity: 0;
}
.map .location > .border1 {
  position: absolute;
  width: 32px;
  height: 16px;
  border-radius: 16px/10px;
  left: -2px;
  top: 18px;
  animation: ani 2s linear infinite;
  border: 1px solid #3fa7ff;
  box-shadow: inset 1px 1px 8px 1px #3fa7ff;
  opacity: 0;
}
.map .location > img {
  animation: imgani 2s linear infinite;
  transform: scale(0.6);
}
.map div.location-1 > img {
  animation: imgani 1.8s linear infinite;
}
.map div.location-2 > img {
  animation: imgani 1.5s linear infinite;
}
.map div.location-8 > img {
  animation: imgani 1.3s linear infinite;
}
.map div.location-4 > img,
.map div.location-7 > img {
  animation: imgani 1.6s linear infinite;
}
.map div.location-1 > .border,
.map div.location-1 > .border1 {
  animation: ani 1.8s linear infinite;
}
.map div.location-2 > .border,
.map div.location-2 > .border1 {
  animation: ani 1.5s linear infinite;
}
.map div.location-3 > .border,
.map div.location-3 > .border1,
.map div.location-3 > .img,
.map div.location-8 > .border,
.map div.location-8 > .border1 {
  animation: ani 1.3s linear infinite;
}
.map div.location-4 > .border,
.map div.location-4 > .border1,
.map div.location-7 > .border,
.map div.location-7 > .border1 {
  animation: ani 1.6s linear infinite;
}
@keyframes imgani {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes ani {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
.login-content {
  width: 350px;
  margin-left: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.login-content h2 {
  padding: 8px 16px;
  color: #b4c9fc;
  font-weight: normal;
  background-color: #3f79ff;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  font-size: 18px;
}
.login-content h2 span {
  text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
  font-weight: bold;
}
.login-content h2 p {
  padding-left: 6px;
  font-size: 14px;
  color: #779cff;
  font-weight: bold;
}
.login {
  margin-top: 150px;
  overflow: visible;
}
.login-form {
  padding: 20px 30px 0;
}
.login-form .form-item {
  position: relative;
  height: 45px;
}
.login-form .icon {
  position: absolute;
  left: 1px;
  top: 1px;
  background-color: #cedeff;
  height: 43px;
  width: 43px;
  text-align: center;
  color: #3f79ff;
  font-size: 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.login-form .el-form-item:nth-of-type(3) {
  margin-bottom: 0;
}
.remember {
  color: #fff;
}
.forget,
.register {
  color: #fff;
  cursor: pointer;
  line-height: 20px;
  margin-bottom: 3px;
}
.submit-button {
  height: 45px;
  color: #fff;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  background: linear-gradient(to right, #3f7aff, #4dbbff, #3f7aff);
  border: none;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.wjmm {
  margin-top: -7px;
  padding-bottom: 10px;
  justify-content: space-between;
}
</style>

<style>
.login-form .form-item .el-input__inner {
  height: 45px;
  padding-left: 60px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px #444;
}
.login-form .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #fff;
}
</style>

