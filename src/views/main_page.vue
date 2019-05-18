<template>
  <div class="main-page">
    <header>
      <div class="flex-row content">
        <h1><i class="el-icon-bell"></i> 数据可视化展示平台</h1>
        <el-dropdown trigger="click" @command="navAction" class="navAction">
          <span class="el-dropdown-link">
            <p>{{ username }}</p>
          </span>
          <el-dropdown-menu slot="dropdown" class="nav">
            <el-dropdown-item
              title="首页"
              :command="{
                name: '首页',
                nav: { name: '首页', link: '', type: 'isLink' }
              }"
              >首页</el-dropdown-item
            >
            <el-dropdown-item
              title="数据管理"
              :command="{
                name: '数据管理',
                nav: { name: '数据管理', link: '', type: 'isLink' }
              }"
              >数据管理</el-dropdown-item
            >
            <el-dropdown-item
              title="退出"
              :command="{
                name: 'logout',
                nav: { name: 'logout', link: '', type: 'isMethod' }
              }"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>

    <div class="data-center" v-if="$route.path === '/index'">
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
                <p>{{ nowCity }}</p>
              </div>
              <div class="work-sum">
                <span>当前城市职位总数：</span>
                <p>{{ nowCityWorkCount }}</p>
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
              <h2 class="title l">全国热门城市职位分布</h2>
            </div>
            <div
              v-if="pieData"
              id="work-map"
              class="bd flex-1 chart-content"
            ></div>
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
            <div class="hd fix city-salary">
              <h2 class="title l">当前城市公司情况分布</h2>
            </div>
            <div
              v-if="companyStatus"
              id="company-info"
              class="bd flex-1 chart-content"
            ></div>
          </div>
          <div
            class="comBox block block-6"
            :class="{
              'animated fadeInUp delay2': animation == true,
              'animated fadeOutUp': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix down-menu">
              <h2 class="title l">学历及工作年限分布</h2>
              <el-select
                v-model="selectName"
                size="mini"
                @change="this.getEduOrExpCount"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div
              v-if="eduOrExpData"
              id="work-wordcloud"
              class="bd flex-1 chart-content"
            ></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <router-view v-else />
  </div>
</template>

<script>
import * as util from "../assets/utils.js";
import echarts from "echarts";
import "echarts/map/js/china.js";
import location from "../assets/location.js";
import { setInterval } from "timers";
import * as getCityData from "../api/data.js";
import * as account from "../api/account.js";
export default {
  data() {
    return {
      username: "",
      nowCity: "北京",
      nowCityWorkCount: "",
      animation: true,
      time: new Date(),
      location: location.data,
      pieData: [],
      cityWorkCount: [],
      companyStatus: [],
      companyStatusCount: [],
      options: [
        {
          value: 1,
          label: "学历要求"
        },
        {
          value: 2,
          label: "工作经验"
        }
      ],
      selectName: 1,
      eduOrExpData: [],
      eduOrExpValue: []
    };
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "fetchData"
  },
  methods: {
    navAction: function(command) {
      let { name, nav } = command;
      switch (nav.type) {
        case "isLink":
          this.$router.replace({ name: name });
          break;
        case "isMethod":
          if (name == "logout") {
            this.logout();
          }
          break;
        default:
          this.$router.push({ name: name });
      }
    },
    logout: function() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          account.signOut().then(res => {
            this.$router.replace({ path: "/login" });
          });
        })
        .catch(() => {});
    },
    // 当前城市职位分析
    initWorkSum() {
      var myChart = echarts.init(document.getElementById("work-sum"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: this.pieData
          }
        ]
      });
    },

    // 地图城市职位分布
    initWorkMap() {
      let geoCoordMap = this.location;
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i]._id];
          if (geoCoord) {
            res.push({
              name: data[i]._id,
              value: geoCoord.concat(data[i].count)
            });
          }
        }
        return res;
      };
      let data = this.cityWorkCount;
      let option = {
        title: {
          text: "全国热门城市职位数量分布",
          subtext: "data from Boss直聘",
          x: "center",
          textStyle: {
            color: "#ccc"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.data.name + " : " + params.data.value[2];
          }
        },
        visualMap: {
          min: 0,
          max: 1500,
          calculable: true,
          inRange: {
            color: ["#50a3ba", "#eac736", "#d94e5d"]
          },
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false
            }
          },
          zoom: 1.2,
          itemStyle: {
            normal: {
              areaColor: "#235182",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#1f4873"
            }
          }
        },
        series: [
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data.sort(function(a, b) {
                return b.value - a.value;
              })
            ),
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            symbolSize: function(val) {
              return val[2] / 50;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                color: "#f4e925",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      };
      var chartMap = echarts.init(document.getElementById("work-map"));
      chartMap.setOption(option);

      chartMap.on("click", params => {
        if (params.data.name) {
          this.nowCity = params.data.name;
          this.getCityWorkCount();
          this.getCompanyCount();
          this.getEduOrExpCount();
        }
      });
    },

    // 城市公司情况分布
    initCompanyCount() {
      var salaryChart = echarts.init(document.getElementById("company-info"));

      salaryChart.setOption({
        textStyle: {
          color: "#fff"
        },
        color: "#61a0a8",
        xAxis: {
          type: "category",
          data: this.companyStatus,
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: "value",
          name: "公司数量",
          nameTextStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            data: this.companyStatusCount,
            type: "bar"
          }
        ]
      });
    },

    // 工作经验和学历要求分析
    initEduOrExpCount() {
      var wordcloud = echarts.init(document.getElementById("work-wordcloud"));
      wordcloud.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          left: "left",
          data: this.eduOrExpData,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.eduOrExpValue,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },

    getCityWorkCount() {
      getCityData.getCityWorkCount({ city: this.nowCity }).then(res => {
        this.nowCityWorkCount = res.data.data.workCount;
        this.pieData = res.data.data.classify;
        this.initWorkSum();
      });
    },

    getMapCityWorkCount() {
      getCityData.getMapWorkCount().then(res => {
        this.cityWorkCount = res.data.data.result;
        this.initWorkMap();
      });
    },

    getCompanyCount() {
      this.companyStatus = [];
      this.companyStatusCount = [];
      getCityData.getCompanyCount({ city: this.nowCity }).then(res => {
        let data = res.data.data.sortRet;
        data.forEach(item => {
          this.companyStatus.push(item._id);
          this.companyStatusCount.push(item.count);
        });
        this.initCompanyCount();
      });
    },

    getEduOrExpCount() {
      this.eduOrExpData = [];
      this.eduOrExpValue = [];
      if (this.selectName === 1) {
        getCityData.getEduData({ city: this.nowCity }).then(res => {
          let result = res.data.data.result;
          result.forEach(item => {
            this.eduOrExpData.push(item._id);
            this.eduOrExpValue.push({ name: item._id, value: item.count });
          });
          this.initEduOrExpCount();
        });
      } else if (this.selectName === 2) {
        getCityData.getExpData({ city: this.nowCity }).then(res => {
          let result = res.data.data.result;
          result.forEach(item => {
            this.eduOrExpData.push(item._id);
            this.eduOrExpValue.push({ name: item._id, value: item.count });
          });
          this.initEduOrExpCount();
        });
      }
    },

    fetchData() {
      if (this.$route.path === "/index") {
        this.getCityWorkCount();
        this.getMapCityWorkCount();
        this.getCompanyCount();
        this.getEduOrExpCount();
      }
    }
  },
  created() {
    this.username = util.storage("user");
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.fetchData();
  }
};
</script>

<style>
.main-page header {
  height: 50px;
  line-height: 50px;
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
  height: calc(100% - 50px);
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
  height: 49%;
}
.data-center .block-6 {
  width: 100%;
  height: 50%;
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
.block-3 .chart-content,
.block-4 .chart-content,
.chart-content {
  height: calc(100% - 34px);
}
.down-menu .el-select {
  float: right;
  padding-right: 10px;
  color: #5abaff;
  width: 31%;
}
.down-menu .el-select .el-input input {
  border: #499cd7 1px solid;
  -webkit-box-shadow: #0b2545 0px 0px 20px 8px inset;
  box-shadow: #0b2545 0px 0px 20px 8px inset;
  background: rgba(1, 15, 45, 0.9);
  color: #ccc;
}
.down-menu .el-select:hover .el-input__inner {
  border-color: #409eff;
}
.navAction,
.navAction > span {
  display: block;
  width: 54px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  cursor: pointer;
}
.navAction {
  position: absolute;
  right: 24px;
  top: 0;
  z-index: 2;
}
.navAction .el-dropdown-link {
  font-size: 16px;
  color: #4a9cd8;
  position: relative;
  z-index: 2;
  user-select: none;
}
.el-dropdown-menu.nav {
  width: 120px;
  border: #499cd7 1px solid;
  box-shadow: #0b2545 0px 0px 20px 8px inset;
  background: rgba(1, 15, 45, 0.9);
  padding-top: 0;
  padding-bottom: 0;
}
.el-dropdown-menu.nav .face {
  color: #499cd7;
  text-align: center;
  margin: 0 6px;
  border-bottom: #499cd7 1px solid;
  padding: 7px 0 10px;
  font-size: 14px;
}
.el-dropdown-menu.nav .face .ion {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: #499cd7;
  color: #010e27;
  border-radius: 50%;
  font-size: 18px;
  margin-right: 8px;
}
.el-dropdown-menu.nav .el-dropdown-menu__item {
  color: #ffffff;
  line-height: 24px;
  padding: 4px 23px;
}
.el-dropdown-menu.nav .el-dropdown-menu__item:focus,
.el-dropdown-menu.nav .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #113a5d;
}
.el-dropdown-menu.nav .popper__arrow {
  top: -7px;
}
.el-dropdown-menu.nav .popper__arrow,
.el-dropdown-menu.nav .popper__arrow::after {
  border-bottom-color: #499cd7;
}
</style>
