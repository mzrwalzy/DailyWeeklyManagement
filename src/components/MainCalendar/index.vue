<template>
  <div>
    <el-calendar :first-day-of-week="7">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p
          :class="data.isSelected ? 'is-selected' : ''"
          @click="sendDay(data.day)"
        >
          {{ data.day.split("-").slice(2).join("") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";
export default {
  data() {
    return {
      value: new Date(),
    };
  },
  methods: {
    sendDay(d) {
      eventBus.$emit("day", d);
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