<template>
  <div id="lineChart" style="width: 500px; height: 300px"></div>
</template>

<script>
import moment from "moment";
const BASE_TIME = "2020-06-20";
export default {
  props: {
    chartData: {
      editTime: [],
      xLabelTime: [],
    },
  },
  data() {
    return {
      lineChart: null,
    };
  },
  watch: {
    chartData: {
      //   handler(newValue, oldValue) {
      //     console.log(newValue);
      //     this.updateLineChart(newValue);
      //   },
      handler: function (newVal, oldVal) {
        // console.log(newVal);
        let yData = this.handleYData(newVal.editTime);
        this.updateLineChart(newVal.xLabelTime, yData);
      },
      deep: true,
    },
  },
  methods: {
    GetOption(xData, yData) {
      let option = {
        title: {
          text: "近7天日报填写时间",
          x: "center",
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "10%",
          height: 200,
          containLabel: true,
        },
        tooltip: {
          transitionDuration: 0,
          trigger: "axis",
          padding: [2, 10],
          textStyle: {
            fontSize: 16,
          },
          formatter: function (params) {
            let p = params[0];
            let state = "";
            if (p.data == BASE_TIME + " e") {
              state = "未填写日报";
            } else {
              state = moment(p.data).format("HH:MM");
            }
            var res = "<div><p>时间：" + p.name + "</p></div>";
            res +=
              '<p><span style="display: inline-block; width: 10px; height: 10px; background-color: ' +
              p.color +
              ';border-radius: 50%"></span>' +
              p.seriesName +
              ": " +
              state +
              "</p>";
            return res;
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            fontSize: 16,
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#aaa",
            },
          },
          //   data: ["03-19", "03-20", "03-21", "03-22", "3-23", "3-24", "03-25"],
          data: xData,
        },
        yAxis: {
          type: "time",
          //   splitLine: {
          //     lineStyle: {
          //       type: "dashed",
          //       color: "#DDD",
          //     },
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: "#333",
          //     },
          //   },
          //   nameTextStyle: {
          //     color: "#303133",
          //     fontSize: 10,
          //   },
          //   splitArea: {
          //     show: false,
          //   },
          min: `${BASE_TIME} 0:00`,
          max: `${BASE_TIME} 23:59`,
          splitNumber: 7,
          axisLabel: {
            formatter: function (value) {
              return moment(value).format("YYYY-MM-DD HH:mm").substr(11, 17);
            },
          },
        },
        series: [
          {
            type: "scatter",
            name: "日报填写时间",
            data: yData,
            // data: [1, 2, 3, 4, 5],
          },
        ],
      };
      return option;
    },
    handleYData(data) {
      let data_ = [];
      for (const d of data) {
        data_.push(
          BASE_TIME + " " + moment(d).format("YYYY-MM-DD HH:mm").substr(11, 17)
        );
      }
      return data_;
    },
    drawLineChart() {
      let yData = this.handleYData(this.chartData.editTime);
      let opt = this.GetOption(this.chartData.xLabelTime, yData);
      let chart = this.$echarts.init(document.getElementById("lineChart"));
      chart.setOption(opt);
    },
    updateLineChart(xData, yData) {
      let opt = this.GetOption(xData, yData);
      let chart = this.$echarts.init(document.getElementById("lineChart"));
      chart.setOption(opt);
    },
  },
  mounted() {
    // this.$axios.get("reports/time/" + this.$store.state.userId).then((res) => {
    //   let _data = res.data;
    //   //   console.log(_data);
    //   if (_data.code === 200) {
    //     for (const d of _data.data) {
    //       this.editTime.push(d.time);
    //       this.xLabelTime.push(d.day);
    //     }

    //   }
    // });
    this.drawLineChart();
  },
};
</script>

<style lang='scss' scoped>
#lineChart {
  margin-top: 30px;
  margin-left: 30%;
}
</style>