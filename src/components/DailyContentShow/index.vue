<template>
  <div class="main">
    <div class="daily-content-main-left">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !searchInput ||
              data.index == searchInput ||
              data.name.includes(searchInput)
          )
        "
        stripe
        style="width: 100%"
      >
        <el-table-column prop="index" width="100" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.index }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="260" align="center">
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位"
          width="260"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="state" label="状态" width="240" align="center">
          <template slot-scope="scope">
            <i
              class="el-icon-check"
              v-show="scope.row.state == '已填写'"
              style="color: #00ff0d8a; font-size: 20px"
            ></i>
            <i
              class="el-icon-close"
              v-show="scope.row.state == '未填写'"
              style="color: #ff0000cb; font-size: 20px"
            ></i>
            <span style="margin-left: 10px">{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDownload(scope.row.index)"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="daily-content-main-right">
      <Calendar />
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/RightCalendar";
export default {
  components: {
    Calendar,
  },
  props: {
    searchInput: "",
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    handleDownload(id) {
      window.open("http://127.0.0.1:5000/reports/download/" + id);
    },
  },
  mounted() {
    this.$axios
      .get("http://127.0.0.1:5000/users/")
      .then((response) => {
        let res = response.data;
        if (res.code == 200) {
          this.tableData = res.data;
        }
      })
      .catch(function (error) {
        // 请求失败处理
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
.main {
  height: 100%;
  display: flex;
  justify-content: space-around;
  .daily-content-main-left {
    // padding-left: 0;
    width: 70%;
    border-right: black solid 2px;
  }
  .daily-content-main-right {
    width: 30%;
    .el-table-column {
      text-align: "center";
    }
    .el-calendar {
      height: 200px;
    }
  }
}
</style>