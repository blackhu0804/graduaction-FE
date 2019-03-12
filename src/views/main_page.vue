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
      <el-row :gutter="20" class="data-container">
        <el-col :span="5" class="el-col-block1">
          <div
            class="comBox block block-1"
            :class="{
              'animated fadeInLeft delay2': animation == true,
              'animated fadeOutLeft': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix">
              <h2 class="title l">1</h2>
            </div>
          </div>
          <div
            class="comBox block block-2"
            :class="{
              'animated fadeInUp delay2': animation == true,
              'animated fadeOutUp': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix">
              <h2 class="title l">2</h2>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div
            class="comBox block block-3"
            :class="{
              'animated fadeInDown delay2': animation == true,
              'animated fadeOutDown': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix">
              <h2 class="title l">3</h2>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div
            class="comBox block block-4"
            :class="{
              'animated fadeInRight delay2': animation == true,
              'animated fadeOutRight': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix">
              <h2 class="title l">4</h2>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as util from "../assets/utils.js";
export default {
  data() {
    return {
      username: "",
      animation: true
    };
  },
  methods: {},
  created() {
    this.username = util.storage("user");
  }
};
</script>

<style>
.main-page header {
  height: 70px;
  line-height: 70px;
  overflow: hidden;
  color: #fff;
}
.main-page header .content {
  justify-content: space-between;
  padding: 0 20px;
}
.main-page header .content h1 {
  color: #396b9e;
  text-shadow: 0.1em 0.1em 0.05em #293944;
}
.data-center {
  height: calc(100% - 70px);
}
.data-center .data-container {
  height: 100%;
}
.data-center .el-col-block1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.data-center .el-col {
  height: 100%;
}
.data-center .block-1 {
  width: 100%;
  height: 35%;
}
.data-center .block-2 {
  width: 100%;
  height: 60%;
}
.data-center .block-3 {
  width: 100%;
  height: 680px;
}
.data-center .block-4 {
  width: 100%;
  height: 100%;
}
</style>
