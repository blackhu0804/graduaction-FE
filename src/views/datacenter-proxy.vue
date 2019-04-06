<template>
  <div class="comBox flex-1" v-loading="loading">
    <div class="corner"></div>
    <div class="hd">
      <div class="title">代理IP管理</div>
    </div>
    <div class="bd flex-1 scrollbar data-mainContent">
      <el-button
        style="margin: 10px 10px;"
        type="primary"
        size="small"
        @click="dialogShow"
        >手动添加代理</el-button
      >
      <el-table
        :data="list"
        stripe
        style="width: 100%;height: 80%;overflow-y:auto;"
        class="scrollbar"
      >
        <el-table-column prop="_id" label="id" align="center">
        </el-table-column>
        <el-table-column prop="proxy" label="代理IP地址" align="center">
        </el-table-column>
        <el-table-column prop="href" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="jumpDetail(scope.row)"
              >修改</el-button
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
    >
      <el-form :model="ipInfo" ref="ipInfo" label-width="80px" :rules="rules">
        <el-form-item label="代理协议" prop="protocol">
          <el-input v-model="ipInfo.protocol"></el-input>
        </el-form-item>
        <el-form-item label="代理IP" prop="ip">
          <el-input v-model="ipInfo.ip"></el-input>
        </el-form-item>
        <el-form-item label="代理端口" prop="port">
          <el-input v-model="ipInfo.port"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProxy('ipInfo')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as dataManage from "../api/datamanage.js";
export default {
  data() {
    var validateIP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("IP地址不能为空"));
      }
      let regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
      if (!regex.test(value)) {
        return callback(new Error("IP地址不合法"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      list: [],
      queryParam: {
        p: 1,
        pageSize: 10
      },
      totalRows: 0,
      dialogFormVisible: false,
      ipInfo: {
        protocol: "",
        ip: "",
        port: ""
      },
      rules: {
        protocol: {
          required: true,
          message: "请输入协议类型",
          trigger: "blur"
        },
        ip: [
          { required: true, message: "请输入IP地址", trigger: "blur" },
          { validator: validateIP, trigger: "blur" }
        ],
        port: { required: true, message: "请输入端口", trigger: "blur" }
      }
    };
  },
  methods: {
    jumpDetail() {},
    dialogShow() {
      this.dialogFormVisible = true;
    },
    getTableData(isReload) {
      if (isReload) {
        this.queryParam.p = 1;
      }
      dataManage.getProxyList(this.queryParam).then(res => {
        this.list = res.data.data.result;
        this.totalRows = res.data.totalRows;
      });
    },
    handleCurrentChange(value) {
      this.queryParam.p = value;
      this.getTableData();
    },
    addProxy(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          dataManage.addProxy(this.ipInfo).then(res => {
            if (res.data.code === 0) {
              this.dialogFormVisible = false;
              this.getTableData();
              Object.keys(this.ipInfo).forEach(key => (this.ipInfo[key] = ""));
              this.$message({
                message: res.data.msg,
                type: "success"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
.el-dialog {
  background: #010c26;
  color: #fff;
  box-shadow: 0 0 12px #3ca7dd inset;
}
.el-dialog .el-pagination .btn-next,
.el-dialog .el-pagination .btn-prev {
  background: transparent;
}
.el-dialog .el-dialog__title {
  font-weight: 700;
  color: #3f87bd;
}
</style>