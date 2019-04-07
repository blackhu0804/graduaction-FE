<template>
  <div class="comBox flex-1" v-loading="loading">
    <div class="corner"></div>
    <div class="hd">
      <div class="title">用户管理</div>
    </div>
    <div class="bd flex-1 scrollbar data-mainContent">
      <el-form ref="form" :inline="true" :model="queryParam" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="queryParam.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="queryParam.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData(true)">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- list -->
      <el-table
        :data="list"
        stripe
        style="width: 100%;height: 80%;overflow-y:auto;"
        class="scrollbar"
      >
        <el-table-column prop="_id" label="id" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | dateformat }}
          </template>
        </el-table-column>
        <el-table-column prop="href" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="jumpDetail(scope.row)"
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
  </div>
</template>

<script>
import * as dataManage from "../api/datamanage.js";
export default {
  data() {
    return {
      loading: false,
      list: [],
      cityList: [],
      queryParam: {
        p: 1,
        pageSize: 10,
        name: "",
        email: ""
      },
      totalRows: 0
    };
  },
  methods: {
    jumpDetail() {},
    getTableData(isReload) {
      if (isReload) {
        this.queryParam.p = 1;
      }
      dataManage.getUserList(this.queryParam).then(res => {
        this.list = res.data.data.result;
        this.totalRows = res.data.totalRows;
      });
    },
    handleCurrentChange(value) {
      this.queryParam.p = value;
      this.getTableData();
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style  >
.bd {
  overflow-x: hidden;
  overflow-y: auto;
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