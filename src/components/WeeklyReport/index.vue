<template>
  <div class="weekly-content">
    <div class="weekly-content-header">
      <el-button type="primary" @click="download">下载</el-button>
    </div>
    <div id="calendar" style="margin-top: 100px; margin-left: 15%; width: 70%">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  props: {
    events: [],
  },
  // watch: {
  //   events: {
  //     //   handler(newValue, oldValue) {
  //     //     console.log(newValue);
  //     //     this.updateLineChart(newValue);
  //     //   },
  //     handler: function (newVal, oldVal) {
  //       this.calendarOptions.events = newVal;
  //     },
  //     deep: true,
  //   },
  // },
  data() {
    return {
      calendarOptions: {
        locale: "zh-cn",
        height: "auto",
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "today",
          right: "prev,next",
          center: "title",
        },
        initialView: "dayGridMonth",
        events: this.events,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventChange: this.handleEventChange,
        /* you can update a remote database when these fire:
        eventAdd:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  methods: {
    handleEventChange(events) {
      let params = {
        id: events.event.id,
        user_id: this.$store.state.userId,
        title: events.event.title,
        start_time: events.event.startStr,
        end_time: events.event.endStr,
        update: true,
      };
      this.$axios.post("reports/weekly", params).then((res) => {
        let _data = res.data;
        if (_data.code === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
      });
    },

    handleDateSelect(selectInfo) {
      this.$prompt("请输入日程", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        let calendarApi = selectInfo.view.calendar;
        let title = value;
        calendarApi.unselect(); // clear date selection

        let params = {
          user_id: this.$store.state.userId,
          title: title,
          start_time: selectInfo.startStr,
          end_time: selectInfo.endStr,
        };

        this.$axios.post("reports/weekly", params).then((res) => {
          let _data = res.data;
          if (_data.code === 200) {
            calendarApi.addEvent({
              id: _data.data.id,
              title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay,
            });
          } else {
            this.$message({
              message: "系统错误",
              type: "error",
            });
          }
        });
      });
    },

    handleEventClick(clickInfo) {
      console.log(clickInfo.event.id);
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },

    handleEvents(events) {
      this.currentEvents = events;
    },

    download() {
      console.log("download");
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.weekly-content {
  height: 100%;
  width: 100%;
  &-header {
    height: 8%;
    background-image: linear-gradient(grey, white);
  }
  .el-button {
    margin-top: 1%;
  }
}
</style>