<template>
  <h3 class="my-5">Weekly Roster</h3>

  <!-- select week to view roster -->
  <div class="w-50 m-auto mb-3">
  <Datepicker v-model="date" weekPicker autoApply @update:model-value="callSched" />
  </div>

  <!-- roster table -->
  <TableView
    v-if="scheduleFetched == true"
    :Mon="Mon"
    :Tue="Tue"
    :Wed="Wed"
    :Thu="Thu"
    :Fri="Fri"
    :Sat="Sat"
    :Sun="Sun"
    :scheduleFetched="scheduleFetched"
    :week="week"
  />
</template>

<script>
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import TableView from "./RosterTable.vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { db } from "../firebase/db";
import { collection, getDocs, doc } from "firebase/firestore";
export default {
  setup() {
    // On selection, it will be the first and the last day of the week
    const date = ref(new Date());

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekDate = (date) => {
      const weekSched = [];

      for (let i = 0; i < 7; i++) {
        const day = new Date(date[0].getTime() + 1000 * 60 * 60 * 24 * i);

        weekSched.push({ schedWeek: days[i], date: day });
      }

      return weekSched;
    };

    return {
      days,
      date,
      weekDate,
    };
  },

  data() {
    return {
      week: "",

      // shifts: { Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] },
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
      scheduleFetched: false,
    };
  },
  components: {
    Datepicker,
    TableView,
  },
  methods: {
    callSched() {
      this.week = this.weekDate(this.date);

      const weekDates = this.week;

      this.Mon = new Array();
      this.Tue = new Array();
      this.Wed = new Array();
      this.Thu = new Array();
      this.Fri = new Array();
      this.Sat = new Array();
      this.Sun = new Array();

      let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      try {
        for (let i = 0; i < 7; i++) {
          getDocs(
            collection(
              db,
              "rosters/" +
                this.$store.state.selectedStore.storeID +
                "/" +
                weekDates[i].date.getFullYear() +
                "/" +
                (weekDates[i].date.getMonth() + 1) +
                "/" +
                weekDates[i].date.getDate()
            )
          ).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var shift = {
                email: doc.data().email,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                date: doc.data().date,
                timeStart: doc.data().timeStart,
                timeFinish: doc.data().timeFinish,
              };

              switch (days[i]) {
                case "Mon":
                  this.Mon.push(shift);
                  break;
                case "Tue":
                  this.Tue.push(shift);
                  break;
                case "Wed":
                  // this.Wed= new Array();
                  this.Wed.push(shift);
                  break;
                case "Thu":
                  this.Thu.push(shift);
                  break;
                case "Fri":
                  this.Fri.push(shift);
                  break;
                case "Sat":
                  this.Sat.push(shift);
                  break;
                case "Sun":
                  this.Sun.push(shift);
                  break;
                default:
                  alert("error!");
              }
            });
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.scheduleFetched = true;
      }
    },

    // fetch weekly roster
    fetchRoster(weekDates) {},
  },
};
</script>

<style></style>
