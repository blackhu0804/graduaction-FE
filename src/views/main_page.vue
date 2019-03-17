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
            <div id="work-map" class="bd flex-1 chart-content"></div>
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
              <h2 class="title l">当前城市职位薪资分布</h2>
              <el-dropdown>
                <span class="el-dropdown-link">
                  选择职位<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>前端</el-dropdown-item>
                  <el-dropdown-item>后端</el-dropdown-item>
                  <el-dropdown-item>客户端</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div id="work-salary" class="bd flex-1 chart-content"></div>
          </div>
          <div
            class="comBox block block-6"
            :class="{
              'animated fadeInUp delay2': animation == true,
              'animated fadeOutUp': animation == false
            }"
          >
            <div class="corner"></div>
            <div class="hd fix">
              <h2 class="title l">职位词云</h2>
            </div>
            <div id="work-wordcloud" class="bd flex-1 chart-content"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as util from "../assets/utils.js";
import echarts from "echarts";
import "echarts/map/js/china.js";
import location from "../assets/location.js";
import { setInterval } from "timers";
require("echarts-wordcloud");
import * as getCityData from "../api/data.js";
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
      cityWorkCount: []
    };
  },
  methods: {
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
          text: "全国热门城市职位数量",
          subtext: "data from Boss直聘",
          x: "center",
          textStyle: {
            color: "#fff"
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
          max: 600,
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
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 30;
            },
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
            itemStyle: {
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1
              }
            }
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data.sort(function(a, b) {
                return b.value - a.value;
              })
            ),
            symbolSize: function(val) {
              return val[2] / 30;
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
        }
      });
    },

    // 职位薪资分布
    initSalaryChart() {
      var salaryChart = echarts.init(document.getElementById("work-salary"));

      salaryChart.setOption({
        textStyle: {
          color: "#fff"
        },
        color: "#61a0a8",
        xAxis: {
          type: "category",
          data: ["10k", "15k", "20k", "25k", "30k", "以上"],
          name: "薪资",
          nameTextStyle: {
            color: "#fff"
          },
          nameLocation: "middle"
        },
        yAxis: {
          type: "value",
          name: "职位数量",
          nameTextStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110],
            type: "bar"
          }
        ]
      });
    },

    // 词云
    initWordClound() {
      var wordcloud = echarts.init(document.getElementById("work-wordcloud"));
      wordcloud.setOption({
        series: [
          {
            type: "wordCloud",
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: "pentagon",
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            data: [
              {
                name: "Sam S Club",
                value: 10000
              },
              {
                name: "Macys",
                value: 6181
              },
              {
                name: "Amy Schumer",
                value: 4386
              },
              {
                name: "Jurassic World",
                value: 4055
              },
              {
                name: "Charter Communications",
                value: 2467
              },
              {
                name: "Chick Fil A",
                value: 2244
              },
              {
                name: "Planet Fitness",
                value: 1898
              },
              {
                name: "Pitch Perfect",
                value: 1484
              },
              {
                name: "Express",
                value: 1112
              },
              {
                name: "Home",
                value: 965
              },
              {
                name: "Johnny Depp",
                value: 847
              },
              {
                name: "Lena Dunham",
                value: 582
              },
              {
                name: "Lewis Hamilton",
                value: 555
              },
              {
                name: "KXAN",
                value: 550
              },
              {
                name: "Mary Ellen Mark",
                value: 462
              },
              {
                name: "Farrah Abraham",
                value: 366
              },
              {
                name: "Rita Ora",
                value: 360
              },
              {
                name: "Serena Williams",
                value: 282
              },
              {
                name: "NCAA baseball tournament",
                value: 273
              },
              {
                name: "Point",
                value: 273
              },
              {
                name: "Point Break",
                value: 265
              }
            ]
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
    }
  },
  created() {
    this.username = util.storage("user");
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.getCityWorkCount();
    this.getMapCityWorkCount();
  },
  mounted() {
    this.initSalaryChart();
    this.initWordClound();
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
.city-salary .el-dropdown {
  float: right;
  padding-right: 10px;
  color: #5abaff;
}
.el-dropdown-menu {
  border: #499cd7 1px solid;
  -webkit-box-shadow: #0b2545 0px 0px 20px 8px inset;
  box-shadow: #0b2545 0px 0px 20px 8px inset;
  background: rgba(1, 15, 45, 0.9);
}
.el-dropdown-menu li {
  color: #fff;
}
</style>
