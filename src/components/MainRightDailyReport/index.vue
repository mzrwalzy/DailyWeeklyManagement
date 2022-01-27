<template>
  <div>
    <el-table :data="dailyReportData" :height="300" style="margin-top: 1px">
      <el-table-column
        property="content"
        label="内容"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        property="condition"
        label="完成情况"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        property="cause"
        label="未完成原因"
        align="center"
      ></el-table-column>
    </el-table>
    <el-table :data="adviceAndTomorrowPlan" :height="175">
      <el-table-column
        property="advice"
        label="存在问题及建议"
        width="400"
        align="center"
      ></el-table-column>
      <el-table-column
        property="tomorrow_plan"
        label="明天工作计划"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";
export default {
  props: {
    reportData: {
      dailyReportData: [],
      adviceAndTomorrowPlan: [],
    },
  },
  data() {
    return {
      dailyReportData: [],
      adviceAndTomorrowPlan: [],
    };
  },
  watch: {
    reportData: {
      //   handler(newValue, oldValue) {
      //     console.log(newValue);
      //     this.updateLineChart(newValue);
      //   },
      handler: function (newVal, oldVal) {
        // console.log(newVal);
        this.dailyReportData = newVal.dailyReportData;
        this.adviceAndTomorrowPlan = newVal.adviceAndTomorrowPlan;
      },
      deep: true,
    },
  },
  created() {
    eventBus.$on("day", (d) => {
      let params = {
        user_id: this.$store.state.userId,
        time: d,
      };
      this.$axios.get("reports/show", { params }).then((res) => {
        let _data = res.data;
        if (_data.code === 200) {
          this.dailyReportData = _data.data.daily_plan;
          let advice_ = _data.data.advice;
          let tomorrow_plan_ = _data.data.tomorrow_plan;
          this.adviceAndTomorrowPlan = [];
          if (advice_ != "" || tomorrow_plan_ != "") {
            this.adviceAndTomorrowPlan = [
              {
                advice: advice_,
                tomorrow_plan: tomorrow_plan_,
              },
            ];
          }
        }
      });
      //   console.log(this.name);
    });
  },
  mounted() {},
};
</script>

<style>
</style>