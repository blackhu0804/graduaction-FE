<template>
  <div class="comBox flex-1" v-loading="loading">
    <div class="corner"></div>
    <div class="hd">
      <div class="title">职位管理</div>
    </div>
    <div class="bd flex-1 scrollbar">
      <!-- 搜索 -->
      <el-form ref="form" :inline="true" :model="queryParam" size="mini">
        <el-form-item label="职位名称">
          <el-input v-model="queryParam.name"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="queryParam.name"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="queryParam.street" @change="fetchCommunity">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in locationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作经验">
          <el-select v-model="queryParam.community">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in expList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="queryParam.type">
            <el-option label="不限" value=""></el-option>
            <el-option
              v-for="item in eduList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fetchData(true)">查询</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- list -->
      <el-table
        :data="list"
        :height="$root.winHeight - 260"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="职位" width="150" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="公司" width="50" align="center">
        </el-table-column>
        <el-table-column prop="rs_districtcountry" label="薪资" width="200">
        </el-table-column>
        <el-table-column prop="rs_street" label="地点" width="200">
        </el-table-column>
        <el-table-column prop="rs_community" label="工作经验">
        </el-table-column>
        <el-table-column prop="card" label="学历要求" width="200">
        </el-table-column>
        <el-table-column prop="birthday" label="公司融资规模" width="200">
        </el-table-column>
        <el-table-column prop="civil_type" label="公司人数" width="100">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="queryParam.pagesize"
          :current-page="queryParam.p"
          layout="prev, pager, next"
          :total="totalRows"
        >
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      list: [],
      queryParam: {
        p: 1,
        pagesize: 15,
        country: "",
        street: "",
        community: "",
        type: "",
        name: "",
        starttime: "",
        endtime: ""
      },
      totalRows: 0
    };
  }
};
</script>

<style>
.bd {
  overflow-x: hidden;
  overflow-y: auto;
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
</style>