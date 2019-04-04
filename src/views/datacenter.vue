<template>
  <div class="flex-row data-content">
    <div class="side comBox flex-col">
      <div class="corner"></div>
      <div class="hd">
        <div class="title">数据管理</div>
      </div>
      <div class="flex-1 list scrollbar">
        <ul>
          <li
            v-for="item in catList"
            :key="item.cid"
            :class="{ active: activeCat === item.cid }"
            @click="activeCat = item.cid"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <component class="flex-1" :is="'list' + activeCat"></component>
  </div>
</template>

<script>
export default {
  components: {
    list1: resolve => require(["./datacenter-work"], resolve),
    // list2: resolve => require(["./datacenter-city"], resolve),
    list3: resolve => require(["./datacenter-proxy"], resolve),
    list4: resolve => require(["./datacenter-user"], resolve)
  },
  data() {
    return {
      catList: [
        {
          name: "职位管理",
          cid: 1
        },
        // {
        //   name: "城市管理",
        //   cid: 2
        // },
        {
          name: "代理IP管理",
          cid: 3
        },
        {
          name: "用户管理",
          cid: 4
        }
      ],
      activeCat: 1,
      dialogFormVisible: false,
      form: {
        name: ""
      }
    };
  },
  methods: {},
  created: function() {
    if (this.$route.query.activeCat) {
      this.activeCat = this.$route.query.activeCat;
    }
  }
};
</script>

<style scoped>
.data-content {
  height: calc(100% - 50px);
}
.side {
  width: 200px;
  margin-right: 10px;
  overflow: hidden;
}
.list {
  overflow-x: hidden;
  overflow-y: auto;
}
.list ul {
  padding: 8px;
}
.list li {
  position: relative;
  height: 80px;
  line-height: 80px;
  color: #2bb1ed;
  padding-left: 20px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
}
.list li:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #081d3e;
}
.list li:hover:before,
.list li.active:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #1e4772;
  box-shadow: 0 0 12px #1e4772 inset;
}
</style>
