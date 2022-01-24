<template>
  <div class="container">
    <el-container>
      <el-aside style="width: auto">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader v-bind:username="username"></CommonHeader>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
  },
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    this.$axios.get("users/me").then((res) => {
      let _data = res.data;
      this.username = _data.data.name;
      this.$store.commit("setUserId");
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh);
  margin: -8px;
}

.el-container {
  height: 100%;
}

.el-header {
  background: grey;
  box-shadow: 5px 5px 5px #000, 5px -5px 5px #000, -5px 5px 5px #000,
    -5px -5px 5px #000;
}

.el-main {
  padding: 0;
  padding-left: 0;
}
</style>