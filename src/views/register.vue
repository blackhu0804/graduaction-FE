<template>
  <div class="register">
    <login-box title="注册">
      <el-form
        :hide-required-asterisk="true"
        trim
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="90px"
      >
        <el-form-item
          label="用户名："
          class="form-item align-center"
          type="flex"
          prop="username"
        >
          <el-input
            v-model="ruleForm.username"
            placeholder="输入用户名"
            class="input-normal"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱："
          class="form-item align-center send"
          type="flex"
          prop="email"
        >
          <el-input
            v-model="ruleForm.email"
            placeholder="输入邮箱"
            class="input-normal"
          ></el-input>
          <el-button
            size="small"
            class="get-code"
            plain
            :disabled="sendMsgInfo.isDisabled"
            @click="sendMsg()"
            >{{ sendMsgInfo.buttonName }}</el-button
          >
        </el-form-item>
        <el-form-item
          label="验证码："
          class="form-item align-center"
          type="flex"
          prop="numberCode"
        >
          <el-input
            v-model="ruleForm.numberCode"
            placeholder="输入验证码"
            class="input-normal"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码："
          class="form-item align-center"
          type="flex"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            placeholder="输入密码"
            class="input-normal"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码："
          class="form-item align-center"
          type="flex"
          prop="password2"
        >
          <el-input
            v-model="ruleForm.password2"
            placeholder="第二次输入密码"
            class="input-normal"
            type="password"
          ></el-input>
        </el-form-item>
        <el-row type="flex" class="btn-content">
          <el-button @click="register('ruleForm')" class="btn submit-button"
            >注册</el-button
          >
          <el-button @click="cancel" class="btn cancel-button">关闭</el-button>
        </el-row>
      </el-form>
    </login-box>
  </div>
</template>

<script>
import * as account from "../api/account.js";
import * as util from "../assets/utils.js";

import loginBox from "../components/login-box";

export default {
  components: {
    loginBox
  },
  data() {
    var checkPassword = (rule, value, callback) => {
      if (this.ruleForm.password !== this.ruleForm.password2) {
        return callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      sendMsgInfo: {
        buttonName: "获取验证码",
        isDisabled: false,
        time: 60
      },
      ruleForm: {
        username: "",
        email: "",
        numberCode: "",
        password: "",
        password2: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        numberCode: [
          { required: true, message: "请输入邮箱验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位验证码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度为 6 到 20 个字符",
            trigger: "blur"
          }
        ],
        password2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "密码长度为 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: checkPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    register(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          account
            .register({
              username: this.ruleForm.username,
              email: this.ruleForm.email,
              code: this.ruleForm.numberCode,
              password: this.ruleForm.password
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.$router.push({ path: "/login" });
                  }
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error",
                  duration: 1500
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    sendMsg() {
      if (this.ruleForm.email === "") {
        this.$message.error("请输入邮箱");
        return false;
      }
      account
        .sendVerifyCode({ email: this.ruleForm.email, type: 0 })
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.msg);
            this.sendMsgInfo.isDisabled = true;
            let timer = window.setInterval(() => {
              this.sendMsgInfo.buttonName =
                this.sendMsgInfo.time + "秒后重新发送";
              --this.sendMsgInfo.time;
              if (this.sendMsgInfo.time < 0) {
                this.sendMsgInfo.buttonName = "发送验证码";
                this.sendMsgInfo.time = 60;
                this.sendMsgInfo.isDisabled = false;
                window.clearInterval(timer);
              }
            }, 1000);
          }
        });
    },
    created() {}
  }
};
</script>

<style scoped>
.tips {
  color: #f99d45;
  font-weight: bold;
  margin-top: -5px;
  margin-left: 100px;
}
.btn-content {
  width: 300px;
  margin-left: 90px;
}
.register {
  margin-top: -50px;
}
.register .send {
  position: relative;
}
.register .get-code {
  position: absolute;
  right: 15px;
  top: 8px;
  color: #ffffff;
  border-radius: 6px;
  background-color: #f48b25;
  border: rgb(245, 120, 3);
  box-shadow: none;
}
.register .get-code.is-disabled {
  background-color: #eee;
  color: #aaa;
}
</style>
<style>
.register .el-input__inner {
  height: 45px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px #444;
}
.el-form-item__label {
  line-height: 45px;
}
</style>
