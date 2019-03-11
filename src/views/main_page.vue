<template>
  <div class="main-page">
    <!-- <h1>欢迎{{ username }}</h1> -->
    <header>
      <div class="flex-row content">
        <h1><i class="el-icon-bell"></i> 数据可视化展示平台</h1>
        <p>{{ username }}</p>
      </div>
    </header>

    <div class="data-center">
      <el-row>
        <el-col :span="8"> 8</el-col>
        <el-col :span="16"> 16</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as util from "../assets/utils.js";
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {},
  created() {
    this.username = util.storage("user");
  }
};
</script>

<style>
.main-page {
}
.main-page header {
  height: 70px;
  line-height: 70px;
  overflow: hidden;
  background: #0e2753;
  color: #fff;
  border-bottom: 1px solid #0e2753;
  box-shadow: 3px 1px 4px 0px #104275;
}
.main-page header .content {
  justify-content: space-between;
  padding: 0 20px;
}
.main-page header .content h1 {
  color: #396b9e;
  text-shadow: 0.1em 0.1em 0.05em #293944;
}
</style>
