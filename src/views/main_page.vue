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
      <el-row :gutter="10" class="data-container">
        <el-col :span="6" class="el-col-block1">
          <div
            class="comBox block block-1"
            :class="{
              'animated fadeInLeft delay2': animation == true,
              'animated fadeOutLeft': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix">
              <h2 class="title l">
                当前时间
              </h2>
            </div>
            <div class="bd flex-1 block-1-content">
              <h1>
                {{ time | dateformat("ddd HH:mm:ss") }}
              </h1>
              <h1 class="date">
                {{ new Date() | dateformat("YYYY年MM月DD日") }}
              </h1>
            </div>
          </div>
          <div
            class="comBox block block-2"
            :class="{
              'animated fadeInLeft delay2': animation == true,
              'animated fadeOutLeft': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix">
              <h2 class="title l">职位信息</h2>
            </div>
            <div class="bd flex-1 block-2-content">
              <div class="now-city">
                <span>当前城市：</span>
                <p>北京</p>
              </div>
              <div class="work-sum">
                <span>当前城市职位总数：</span>
                <p>12312313</p>
              </div>
            </div>
          </div>
          <div
            class="comBox block block-3"
            :class="{
              'animated fadeInUp': animation == true,
              'animated fadeOutUp': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix">
              <h2 class="title l">当前城市职位分布</h2>
            </div>
            <div id="work-sum" class="bd flex-1 chart-content"></div>
          </div>
        </el-col>
        <el-col :span="12" class="el-col-block1">
          <div
            class="comBox block block-4"
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
        <el-col :span="6" class="el-col-block1">
          <div
            class="comBox block block-5"
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
const echarts = require("echarts");
import { setInterval, setTimeout } from "timers";
export default {
  data() {
    return {
      username: "",
      animation: true,
      time: new Date()
    };
  },
  methods: {
    initWorkSum() {
      var myChart = echarts.init(document.getElementById("work-sum"));
      myChart.setOption({
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ]
          }
        ]
      });
    }
  },
  created() {
    this.username = util.storage("user");
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  },
  mounted() {
    this.initWorkSum();
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
  height: 24%;
}
.data-center .block-2 {
  width: 100%;
  height: 34%;
}
.data-center .block-3 {
  width: 100%;
  height: 40%;
}
.data-center .block-4 {
  width: 100%;
  height: 100%;
}
.data-center .block-5 {
  width: 100%;
  height: 100%;
}
.block-1-content h1.date {
  font-size: 30px;
}
.block-1-content h1 {
  color: #5abaff;
  text-align: center;
  font-size: 30px;
}
.block-2-content {
  padding-left: 10%;
}
.block-2-content .work-sum,
.block-2-content .now-city {
  color: #5abaff;
  margin-top: 12px;
}
.block-2-content span {
  font-size: 16px;
}
.block-2-content p {
  padding-left: 2em;
  font-size: 25px;
}
.chart-content {
  color: #fff;
}
.block-3 .chart-content {
  height: calc(100% - 34px);
}
</style>
