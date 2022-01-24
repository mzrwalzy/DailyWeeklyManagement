<template>
  <el-menu
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 style="color: white">系统</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in menu"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i class="el-icon-menu"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          url: "Home",
        },
        {
          path: "/daily",
          name: "daily",
          label: "日报管理",
          url: "DailyReport",
        },
        {
          path: "/weekly",
          name: "weekly",
          label: "用户管理",
          url: "WeeklyReport",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({ name: item.name });
    },
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
}

.el-menu h3 {
  color: #ffffff;
  text-align: center;
  line-height: 48px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>