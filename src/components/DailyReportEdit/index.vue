<template>
  <div class="main">
    <div class="daily-content-main-left">
      <el-table :data="dailyReportData">
        <el-table-column prop="content" label="内容" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.edit"
              v-model="scope.row.content"
              placeholder="请输入内容"
            ></el-input>
            <span v-else>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="condition" label="完成情况">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.edit"
              v-model="scope.row.condition"
              placeholder="请输入完成情况"
            ></el-input>
            <span v-else>{{ scope.row.condition }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cause" label="未完成原因">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.edit"
              v-model="scope.row.cause"
              placeholder="请输入未完成原因"
            ></el-input>
            <span v-else>{{ scope.row.cause }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <el-button
              type="primary"
              class="el-icon-plus"
              @click="addData"
              size="mini"
            ></el-button>
          </template>

          <template slot-scope="scope">
            <el-button
              v-if="scope.row.edit"
              type="text"
              size="medium"
              @click="confirmAdd(scope.row)"
            >
              <i class="el-icon-check" aria-hidden="true"></i>
            </el-button>
            <div v-else>
              <el-button type="text" size="medium" @click="editData(scope.row)">
                <i class="el-icon-edit" aria-hidden="true"></i>
              </el-button>
              <el-button
                type="text"
                size="medium"
                @click="deleteData(scope.row, scope.$index)"
              >
                <i class="el-icon-delete" aria-hidden="true"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="daily-content-main-right">
      <h3>存在问题及建议</h3>
      <el-input
        v-model="advice"
        placeholder="存在问题及建议"
        class="advice"
        type="textarea"
        :rows="10"
      ></el-input>
      <h3>明天工作计划</h3>
      <el-input
        v-model="tomorrow_plan"
        placeholder="明天工作计划"
        class="tomorrow-plan"
        type="textarea"
        :rows="10"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dailyReportData: [],
      advice: "",
      tomorrow_plan: "",
    };
  },
  methods: {
    //添加
    addData() {
      this.dailyReportData.push({
        edit: true,
      });
    },
    //确认添加
    confirmAdd(row) {
      row.edit = false;
    },
    //修改
    editData(row) {
      row.edit = true;
    },
    //删除
    deleteData(row, index) {
      this.dailyReportData.splice(index, 1);
    },
  },
  mounted() {
    let day_ = this.$moment().format("YYYY-MM-DD");
    let params = {
      user_id: this.$store.state.userId,
      time: day_,
    };
    this.$axios.get("reports/show", { params }).then((res) => {
      let res_ = res.data;
      if (res_.code === 200) {
        let dailyPlan = res_.data.daily_plan;
        dailyPlan.forEach((p) => {
          p.edit = false;
        });
        this.dailyReportData = dailyPlan;
        this.advice = res_.data.advice;
        this.tomorrow_plan = res_.data.tomorrow_plan;
      }
    });
  },
};
</script>

<style lang="scss"d>
.main {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .daily-content-main-left {
    // padding-left: 0;
    width: 70%;
    border-right: black solid 2px;
  }
  .daily-content-main-right {
    width: 30%;
    h3 {
      margin-top: 40px;
    }
    .advice {
      width: 80%;
    }
    .tomorrow-plan {
      width: 80%;
    }
  }
}
</style>