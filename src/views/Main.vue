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
          <router-view
            :userData="userData"
            :chartData="chartData"
            :reportData="reportData"
            :events="events"
          />
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
      userData: {},
      chartData: {
        editTime: [],
        xLabelTime: [],
      },
      reportData: {
        dailyReportData: [],
        adviceAndTomorrowPlan: [],
      },
      events: [],
    };
  },
  mounted() {
    this.$axios.get("users/me").then((res) => {
      let _data = res.data;
      this.userData = _data.data;
      this.username = _data.data.name;
      this.$store.commit("setUserId");
      // 显示近七天日报填写时间
      this.$axios
        .get("reports/time/" + this.$store.state.userId)
        .then((res) => {
          let _data = res.data;
          //   console.log(_data);
          if (_data.code === 200) {
            for (const d of _data.data) {
              this.chartData.editTime.push(d.time);
              this.chartData.xLabelTime.push(d.day);
            }
            // this.drawLineChart();
          }
        });
      let day_ = this.$moment().format("YYYY-MM-DD");
      let params = {
        user_id: this.$store.state.userId,
        time: day_,
      };
      // 日报
      this.$axios.get("reports/show", { params }).then((res) => {
        let _data = res.data;
        if (_data.code === 200) {
          this.reportData.dailyReportData = _data.data.daily_plan;
          let advice_ = _data.data.advice;
          let tomorrow_plan_ = _data.data.tomorrow_plan;
          this.reportData.adviceAndTomorrowPlan = [];
          if (advice_ != "" || tomorrow_plan_ != "") {
            this.reportData.adviceAndTomorrowPlan = [
              {
                advice: advice_,
                tomorrow_plan: tomorrow_plan_,
              },
            ];
          }
        }
      });
      // 周报
      this.$axios
        .get("reports/weekly/" + this.$store.state.userId)
        .then((res) => {
          let _data = res.data;
          if (_data.code === 200) {
            for (const d of _data.data) {
              this.events.push({
                id: d.id,
                title: d.title,
                start: d.start_time,
                end: d.end_time,
              });
            }
          }
        });
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh);
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