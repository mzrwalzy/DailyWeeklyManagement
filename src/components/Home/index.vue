<template>
  <div>
    <el-row class="home" :getter="20">
      <el-col :span="8" style="margin-top: 30px; margin-left: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userInfo">
              <p class="name">{{ userData.name }}</p>
              <p class="access">{{ userData.position }}</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登陆时间：<span>2022-1-19</span></p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <LineChart v-bind:chartData="chartData" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" style="margin-left: 20px">
        <MainCalendar />
      </el-col>
      <el-col :span="8" style="margin-left: 20px">
        <MainRightDailyReport v-bind:reportData="reportData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart";
import MainCalendar from "@/components/MainCalendar";
import MainRightDailyReport from "@/components/MainRightDailyReport";
export default {
  components: {
    LineChart,
    MainCalendar,
    MainRightDailyReport,
  },
  props: {
    userData: {},
    chartData: {
      editTime: [],
      xLabelTime: [],
    },
    reportData: {
      dailyReportData: [],
      adviceAndTomorrowPlan: [],
    },
  },
  data() {
    return {
      userImg: require("@/assets/images/user.jpg"),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home";
</style>