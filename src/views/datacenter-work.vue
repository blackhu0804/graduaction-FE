<template>
  <div class="comBox flex-1 work" v-loading="loading">
    <div class="corner"></div>
    <div class="hd">
      <div class="title">职位管理</div>
    </div>
    <div class="bd flex-1 scrollbar data-mainContent">
      <el-form ref="form" :inline="true" :model="queryParam" size="mini">
        <el-form-item label="职位名称">
          <el-input v-model="queryParam.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="queryParam.companyName"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="queryParam.city">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作经验">
          <el-select v-model="queryParam.exp">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in expList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="queryParam.edu">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in eduList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getTableData(true)">查询</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- list -->
      <el-table
        :data="list"
        stripe
        style="width: 100%;height: 70%;overflow-y:auto;"
        class="scrollbar"
      >
        <el-table-column prop="jobTitle" label="职位" align="center">
        </el-table-column>
        <el-table-column prop="companyName" label="公司" align="center">
        </el-table-column>
        <el-table-column prop="salary" label="薪资" width="100px">
        </el-table-column>
        <el-table-column prop="workLocation" label="地点" width="100px;">
        </el-table-column>
        <el-table-column prop="workYear" label="工作经验" width="100px;">
        </el-table-column>
        <el-table-column prop="academic" label="学历要求" width="100px;">
        </el-table-column>
        <el-table-column prop="finance" label="公司融资规模"> </el-table-column>
        <el-table-column prop="peopleCount" label="公司人数"> </el-table-column>
        <el-table-column prop="href" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="jumpDetail(scope.row.href)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="queryParam.pageSize"
          :current-page="queryParam.p"
          layout="prev, pager, next"
          :total="totalRows"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      width="30vw"
      title="职位描述"
      class="work-dialog"
    >
      <div v-html="detail"></div>
    </el-dialog>
  </div>
</template>

<script>
import * as dataManage from "../api/datamanage.js";
import { log } from "util";
export default {
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      list: [],
      cityList: [],
      expList: [
        { id: 1, name: "经验不限" },
        { id: 2, name: "应届生" },
        { id: 3, name: "1年以内" },
        { id: 4, name: "1-3年" },
        { id: 5, name: "3-5年" },
        { id: 6, name: "5-10年" }
      ],
      eduList: [
        { id: 1, name: "学历不限" },
        { id: 2, name: "大专" },
        { id: 3, name: "本科" },
        { id: 4, name: "硕士" },
        { id: 5, name: "博士" }
      ],
      queryParam: {
        p: 1,
        pageSize: 10,
        name: "",
        companyName: "",
        city: "",
        exp: "",
        edu: ""
      },
      totalRows: 0,
      detail: undefined
    };
  },
  methods: {
    jumpDetail(href) {
      dataManage.getWorkDetail({url: href}).then( res => {
        this.dialogFormVisible = true
        this.detail = res.data.data.workInfo
      })
      
      // window.open(href);
    },
    getCityList() {
      dataManage.getCityList().then(res => {
        let result = res.data.data.result;
        result.forEach(item => {
          this.cityList.push({ id: item.code, name: item.name });
        });
      });
    },
    getTableData(isReload) {
      if (isReload) {
        this.queryParam.p = 1;
      }
      dataManage.getWorkList(this.queryParam).then(res => {
        this.list = res.data.data.result;
        this.totalRows = res.data.totalRows;
      });
    },
    reset: function() {
      this.$refs.form && this.$refs.form.resetFields();
      Object.assign(this.queryParam, {
        name: "",
        companyName: "",
        city: "",
        exp: "",
        edu: ""
      });
    },
    handleCurrentChange(value) {
      this.queryParam.p = value;
      this.getTableData();
    }
  },
  created() {
    this.getCityList();
    this.getTableData();
  }
};
</script>

<style>
* {box-sizing: border-box;}
.bd {
  overflow-x: hidden;
  overflow-y: auto;
}
.work-dialog .el-dialog__body {
  height: 60vh;
  padding: 5px 15px 20px;
  overflow: auto;
}
.work-dialog .el-dialog__body h3 {
  display: none;
}
.data-mainContent {
  height: 100%;
}
.el-form-item__label {
  color: #499cd7;
}
.el-form-item__label {
  color: #fff;
}
.el-input__inner {
  background: #001224;
  color: #fff;
  border-color: #274f6c;
}
.el-input__inner input {
  background: transparent;
}
.el-date-editor .el-range-input {
  color: #fff;
}
.el-form .el-button--default {
  border-color: #37a2da;
  box-shadow: #0b2545 0px 0px 8px 5px inset;
  background: transparent;
  color: #fff;
}
.el-form .el-button--default:hover {
  background: transparent;
}
.el-table::before {
  display: none;
}
.el-table,
.el-table__expanded-cell,
.el-table th,
.el-table tr {
  background: transparent;
}
.el-table th > .cell {
  color: #3f87bd;
}
.el-table {
  color: #fff;
}
.el-table--striped .el-table__body tr.el-table__row--striped td,
.el-table--enable-row-hover .el-table__body tr:hover > td,
.el-table__header th {
  background: #1b253c;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 0;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #313c4b;
}
.el-pager li,
.el-pagination .btn-next,
.el-pagination .btn-prev {
  background: transparent;
  border: 1px solid #499cd7;
  color: #fff;
  box-shadow: 0 0 32px #3ca7dd inset;
  margin: 0 4px;
}
.el-pager li.active {
  background: #3ca7dd;
  color: #fff;
}
.el-pager li.btn-quicknext,
.el-pager li.btn-quickprev {
  color: #fff;
}
</style>