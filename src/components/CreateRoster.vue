<template>
  <h3 class="py-3">Plan New Roster</h3>

  <!-- selecting employee -->
  <div>
    <select v-model="employeeInShift" class="select form-control-lg">
      <option value="" selected disabled>Select Employee</option>
      <option
        v-for="(employee, i) in employeePool"
        :key="i"
        :value="{
          email: employee.email,
          firstName: employee.firstName,
          lastName: employee.lastName,
        }"
      >
        <p>{{ employee.firstName }} {{ employee.lastName }}</p>
      </option>
    </select>
  </div>
  <div v-if="this.employeeInShift" class="mt-3">
  <h5>Available Schedule</h5>
    <div v-for="(sched, i) in employeePool" :key="i">
          
      <table
        v-if="this.employeeInShift.email == sched.email"
        class="table table-striped w-50 mx-auto"
      >
        <thead>
          <tr>
            <th>Day</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(week, i) in sched.availability" :key="i">
            <td>
              {{ week.week }}
            </td>
            <td>{{ week.fromHours.hours }}:{{ week.fromHours.minutes }}</td>
            <td>{{ week.toHours.hours }}:{{ week.toHours.minutes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- set schedule for the selected employee -->
  <div class="w-75 p-3 mx-auto col-md-6 row">
    <p>Date</p>
    <Datepicker
      v-model="date"
      :format="dateFormat"
      :enableTimePicker="false"
      autoApply
      :minDate="new Date()"
    />
  </div>
  <div class="w-75 p-3 mx-auto row">
    <div class="col-md-6">
      <p>Start</p>
      <Datepicker v-model="timeStart" timePicker />
    </div>
    <div class="col-md-6">
      <p>Finish</p>
      <Datepicker v-model="timeFinish" timePicker />
    </div>
  </div>
  <button class="btn btn-primary m-1" @click="addShift">Add Shift</button>

  <!-- summary of added shift (only appears when there's a shift added) -->
  <div v-if="employeeInShiftList.length > 0">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Employee</th>
          <th>Date</th>
          <th>Starting</th>
          <th>Finishing</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shift, i) in employeeInShiftList" :key="i">
          <td>{{ i }}</td>
          <td>{{ shift.firstName }}, {{shift.lastName.substring(0,1)}}</td>
          <td>{{ shift.date }}-{{ shift.month }}-{{ shift.year }}</td>
          <td>{{ shift.timeStart.hours }}:{{ shift.timeStart.minutes }}</td>
          <td>{{ shift.timeFinish.hours }}:{{ shift.timeFinish.minutes }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary m-1" @click="postRoster">Post Roster</button>
  </div>
  <!-- send shift to database -->
</template>

<script>
import { ref, computed } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  setup() {
    const date = ref(new Date());

    const timeStart = ref();

    const timeFinish = ref();

    // In case of a range picker, you'll receive [Date, Date]
    const dateFormat = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return day + "-" + month + "-" + year;
    };

    return {
      date,
      dateFormat,
      timeStart,
      timeFinish,
    };
  },
  data() {
    return {
      employeePool: computed(() => this.$store.state.employeePool),
      employeeInShiftList: [],
      employeeInShift: ref(""),
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    addShift() {
      const shift = {
        email: this.employeeInShift.email,
        firstName: this.employeeInShift.firstName,
        lastName: this.employeeInShift.lastName,
        year: this.date.getFullYear(),
        month: this.date.getMonth() + 1,
        date: this.date.getDate(),
        timeStart: this.timeStart,
        timeFinish: this.timeFinish,
      };

      console.log(shift.lastName);
      this.employeeInShiftList.push(shift);
    },
    postRoster() {
      this.$store.dispatch("postRoster", this.employeeInShiftList);
    },
  },
};
</script>

<style></style>
