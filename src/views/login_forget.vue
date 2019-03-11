<template>
  <div class="login-forget">
    <login-box v-if="step === 1" title="找回密码">
      <el-form
        :hide-required-asterisk="true"
        trim
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="90px"
      >
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
          <label for></label>
          <el-input
            v-model="ruleForm.numberCode"
            placeholder="输入验证码"
            class="input-normal"
          ></el-input>
        </el-form-item>
        <el-row type="flex" class="btn-content">
          <el-button @click="next('ruleForm')" class="btn submit-button"
            >下一步</el-button
          >
          <el-button @click="cancel" class="btn cancel-button">关闭</el-button>
        </el-row>
      </el-form>
    </login-box>

    <login-box v-if="step === 2" title="找回密码">
      <el-form
        :hide-required-asterisk="true"
        trim
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules2"
        label-width="100px"
      >
        <el-form-item
          label="输入新密码"
          class="form-item align-center send"
          type="flex"
          prop="password"
        >
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="输入新密码"
            class="input-normal"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          class="form-item align-center"
          type="flex"
          prop="password2"
        >
          <el-input
            type="password"
            v-model="ruleForm.password2"
            placeholder="再次输入密码"
            class="input-normal"
          ></el-input>
        </el-form-item>
        <el-row type="flex" class="btn-content">
          <el-button @click="correct('ruleForm')" class="btn submit-button sure"
            >确定</el-button
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
        email: "",
        numberCode: "",
        password: "",
        password2: ""
      },
      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        numberCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入6位验证码", trigger: "blur" }
        ]
      },
      rules2: {
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
      },
      step: 1
    };
  },
  methods: {
    next(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          account
            .checkCode({
              email: this.ruleForm.email,
              code: this.ruleForm.numberCode
            })
            .then(res => {
              if (res.data.code === 0) {
                this.step = 2;
              }
            });
        } else {
          return false;
        }
      });
    },
    correct(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          account
            .retrieve({
              email: this.ruleForm.email,
              code: this.ruleForm.numberCode,
              password: this.ruleForm.password
            })
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.$router.push({ path: "/login" });
                }
              });
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
        .sendVerifyCode({ email: this.ruleForm.email, type: 1 })
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
.login-forget .send {
  position: relative;
}
.login-forget .get-code {
  position: absolute;
  right: 15px;
  top: 8px;
  color: #ffffff;
  border-radius: 6px;
  background-color: #f48b25;
  border: rgb(245, 120, 3);
}
.login-forget .get-code.is-disabled {
  background-color: #eee;
  color: #aaa;
}
</style>
<style>
.login-forget .el-input__inner {
  height: 45px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px #444;
}
.el-form-item__label {
  line-height: 45px;
}
</style>
