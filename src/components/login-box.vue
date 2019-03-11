<template>
  <div class="login-box">
      <h2 class="flex-row align-center">{{title}}</h2>
      <div class="content">
        <slot />
      </div>
  </div>  
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
}
</script>

<style>
  .login-box {width: 470px;background-color: rgba(255, 255, 255, .2);border-radius: 10px;box-shadow:0 5px 3px rgba(0, 0, 0, 0.25);
  border:1px solid rgba(255,255,255,.1);}
  .login-box h2{padding: 8px 16px;color: #B4C9FC;font-weight: normal;background-color: #3F79FF;border-top-right-radius: 8px;border-top-left-radius: 8px;font-size: 18px;text-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);font-weight: bold;justify-content: center;}
  .login-box .content {padding:20px 20px 20px 0px; display: flex;justify-content: center;align-items: center;flex-direction: column;}
  .login-box .content .form-item {margin-bottom: 20px;}
  .login-box .form-item  label {color: #fff;width: 100px;text-align: right;}
  .login-box .input-normal {width: 300px;}
  .login-box .btn {height: 45px; color: #fff;border-radius: 8px;font-size: 16px;border: none;box-shadow: 2px 4px 3px #444;}
  .login-box .submit-button {background: linear-gradient(to right, #3F7AFF,#4DBBFF,#3F7AFF);flex: 5;box-shadow:0 5px 3px rgba(0, 0, 0, 0.25);
  border:1px solid rgba(255,255,255,.1);}
  .login-box .cancel-button {background: #808080;border: none;color: #fff;flex: 3;}
</style>
