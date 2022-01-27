<template>
  <div>
    <el-calendar :first-day-of-week="7">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p
          :class="data.isSelected ? 'is-selected' : ''"
          @click="showDailyReport(data.day)"
        >
          {{ data.day.split("-").slice(2).join("") }}
          <!-- {{ data.isSelected ? "✔️" : "" }} -->
          {{ data.isSelected ? "✔️" : "" }}
        </p>
      </template>
    </el-calendar>

    <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible">
      <el-table :data="dailyReportData">
        <el-table-column
          property="content"
          label="内容"
          width="520"
          align="center"
        ></el-table-column>
        <el-table-column
          property="condition"
          label="完成情况"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          property="cause"
          label="未完成原因"
          align="center"
        ></el-table-column>
      </el-table>
      <el-table :data="adviceAndTomorrowPlan">
        <el-table-column
          property="advice"
          label="存在问题及建议"
          width="520"
          align="center"
        ></el-table-column>
        <el-table-column
          property="tomorrow_plan"
          label="明天工作计划"
          align="center"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      dailyReportData: [],
      dialogTitle: "",
      adviceAndTomorrowPlan: [],
    };
  },

  methods: {
    showDailyReport(day) {
      this.dialogTitle = day + " 日报";
      this.dialogTableVisible = true;
      let params = {
        user_id: this.$store.state.userId,
        time: day,
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
    },
  },
};
</script>

<style lang="scss">
.el-calendar__header {
  padding: 10px 20px;
}

.el-calendar-table .el-calendar-day {
  text-align: left;
  height: 60px;
}

.el-calendar-table tr td:first-child,
.el-calendar-table tr td:last-child {
  background-color: #f9f8fe;
}

.is-selected {
  color: #1989fa !important;
}
</style>