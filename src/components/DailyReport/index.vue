<template>
  <div class="daily-content">
    <div class="daily-content-header">
      <div v-show="!editDailyReport">
        <el-input
          v-model="searchInput"
          placeholder="请输入编号或姓名"
        ></el-input>
        <el-button type="primary" @click="editDailyReport = !editDailyReport"
          >填写日报</el-button
        >
        <el-button type="primary" @click="downloadAll">全部下载</el-button>
      </div>
      <div v-show="editDailyReport">
        <div class="returnButton">
          <el-button type="primary" @click="editDailyReport = !editDailyReport">
            <i class="el-icon-arrow-left" />
            返回
          </el-button>
        </div>
        <div class="saveButton">
          <el-button type="primary" @click="submitData">保存</el-button>
        </div>
      </div>
    </div>
    <div class="daily-content-main">
      <DailyContentShow
        v-bind:searchInput="searchInput"
        v-show="!editDailyReport"
        ref="dailyContent"
      ></DailyContentShow>
      <DailyReportEdit
        v-show="editDailyReport"
        ref="reportData"
      ></DailyReportEdit>
    </div>
  </div>
</template>

<script>
import DailyContentShow from "@/components/DailyContentShow";
import DailyReportEdit from "@/components/DailyReportEdit";
export default {
  components: {
    DailyContentShow,
    DailyReportEdit,
  },
  data() {
    return {
      searchInput: "",
      editDailyReport: false,
    };
  },
  methods: {
    downloadAll() {
      window.open("http://127.0.0.1:5000/reports/download");
    },
    submitData() {
      //   let params = this.$refs.reportData.dailyReportData;
      let this_ = this.$refs.reportData;
      let dailyReportData = this_.dailyReportData;
      let dailyReportData_ = [];
      let flag = false;

      dailyReportData.forEach((p) => {
        if ((p.content && p.condition) || p.cause) {
          delete p.edit;
          p.cause = p.cause ? p.cause : "";
          dailyReportData_.push(p);
        } else {
          this.$message({
            message: "请将内容及完成情况填写完整",
            type: "error",
          });
          flag = true;
        }
      });
      if (flag) {
        return;
      }

      if (dailyReportData_.length == 0) {
        this.$message({
          message: "请填写日报",
          type: "error",
        });
        return;
      }

      let params = {
        user_id: this.$store.state.userId,
        daily_plan: dailyReportData_,
        advice: this_.advice,
        tomorrow_plan: this_.tomorrow_plan,
      };
      this.$axios
        .post("http://127.0.0.1:5000/reports/", params)
        .then((_) => {
          this.$axios.get("http://127.0.0.1:5000/users/").then((response) => {
            let res = response.data;
            if (res.code == 200) {
              this.$refs.dailyContent.tableData = res.data;
            }
          });
          this.editDailyReport = !this.editDailyReport;
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/daily_report";
</style>