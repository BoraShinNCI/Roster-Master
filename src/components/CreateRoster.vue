<template>
  <div class="container-fluid mt-5">
    <!-- select week to create roster -->
    <div class="w-50 m-auto">
      <Datepicker
        v-model="date"
        weekPicker
        autoApply
        @update:model-value="testing"
        :minDate="new Date()"
      />
    </div>
    <table
      class="table table-bordered table-hover"
      v-if="this.openCalendar == true"
    >
      <thead>
        <tr>
          <th>
            <p>Employees</p>
          </th>
          <th v-for="days in calendarDays" :key="days">
            <p>
              {{ days.weekday }}
            </p>

            <p :value="days.weekdate">
              {{ days.weekdate.getDate() }}/{{ days.weekdate.getMonth() + 1 }}
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employeeInfo, i) in employeePool" :key="i">
          <td>
            {{ employeeInfo.lastName.substring(0, 1) }},
            {{ employeeInfo.firstName }}
          </td>
          <td v-for="(days, i) in calendarDays" :key="i">

              <span v-for="(shift, i) in employeeInShiftList" :key="i">
                <p
                  v-if="
                    shift.email == employeeInfo.email &&
                    shift.rawDate == days.weekdate
                  "
                >
                  {{ shift.timeStart.hours }}:{{ shift.timeStart.minutes }} -
                  {{ shift.timeFinish.hours }}:{{ shift.timeFinish.minutes }}
                </p>
              </span>

            <button
              :id="`${employeeInfo.email}${days}`"
              class="btn btn-dark btn-sm"
              type="button"
              data-bs-toggle="modal"
              :data-bs-target="`#${employeeInfo.firstName}${employeeInfo.lastName}${i}`"
            >
              add
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              :id="`${employeeInfo.firstName}${employeeInfo.lastName}${i}`"
              tabindex="-1"
              aria-labelledby="newShiftLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="newShiftLabel">
                      {{ employeeInfo.firstName }}
                      {{ employeeInfo.lastName }} ({{
                        days.weekdate.getDate()
                      }}/{{ days.weekdate.getMonth() + 1 }})
                    </h5>

                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <!-- selecting shift -->
                    <div class="form-group m-auto w-75">
                      <div class="p-3 mx-auto row">
                        <div class="col-md-6">
                          <p>Start</p>
                          <Datepicker v-model="timeStart" timePicker />
                        </div>
                        <div class="col-md-6">
                          <p>Finish</p>
                          <Datepicker v-model="timeFinish" timePicker />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-dark"
                      data-bs-dismiss="modal"
                      @click="addShift(employeeInfo, days.weekdate)"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-dark mt-3" @click="postRoster">Post</button>
  </div>

</template>

<script>
import { ref, computed } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
// import AvailabilityModal from "../components/AvailabilityModal.vue";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  setup() {
    const date = ref(new Date());

    const timeStart = ref();

    const timeFinish = ref();

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekDate = (date) => {
      const weekSched = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(date[0].getTime() + 1000 * 60 * 60 * 24 * i);

        weekSched.push({ weekday: days[i], weekdate: day });
      }

      return weekSched;
    };

    // In case of a range picker, you'll receive [Date, Date]
    const dateFormat = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return day + "-" + month + "-" + year;
    };

    return {
      days,
      date,
      dateFormat,
      weekDate,
      timeStart,
      timeFinish,
    };
  },
  data() {
    return {
      employeePool: computed(() => this.$store.state.employeePool),
      employeeInShiftList: [],
      employeeInShift: ref(""),
      calendarDays: computed(() => this.weekDate(this.date)),
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
      openCalendar: false,
    };
  },
  components: {
    Datepicker,
    // AvailabilityModal,
  },
  methods: {
    testing() {
      this.openCalendar = true;
    },
    addShift(employeeInfo, selectedDate) {
      const shift = {
        email: employeeInfo.email,
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        date: selectedDate.getDate(),
        rawDate: selectedDate,
        timeStart: this.timeStart,
        timeFinish: this.timeFinish,
      };

      this.employeeInShiftList.push(shift);
    },
    postRoster() {
// console.log(this.employeeInShiftList.length)
      if(this.employeeInShiftList.length == 0){
        alert("Please create roster first")
      }else{
        this.$store.dispatch("postRoster", this.employeeInShiftList);
      }
    },
  },
};
</script>

<style></style>
