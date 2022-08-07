<template>
<div class="container-fluid my-5">
  <h3>Enter your availability</h3>

  <table class="table table-striped mt-5 mx-auto w-75">
    <thead>
      <th>Week</th>
      <th>Available</th>
      <th>From</th>
      <th>To</th>
    </thead>
    <tbody>
      <tr>
        <td>Monday</td>
        <td>
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            value="monday"
            v-model="availableDays"
          />
        </td>
        <td>
          <Datepicker
            v-model="mondayFrom"
            timePicker
            placeholder="Select Time"
          />
        </td>
        <td>
          <Datepicker v-model="mondayTo" timePicker placeholder="Select Time" />
        </td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td>
          <input
            class="form-check-input"
            type="checkbox"
            value="tuesday"
            id="flexCheckDefault"
            v-model="availableDays"
          />
        </td>
        <td>
          <Datepicker
            v-model="tuesdayFrom"
            timePicker
            placeholder="Select Time"
          />
        </td>
        <td>
          <Datepicker
            v-model="tuesdayTo"
            timePicker
            placeholder="Select Time"
          />
        </td>
      </tr>
      <tr>
        <td>Wednesday</td>
        <td>
          <input
            class="form-check-input"
            type="checkbox"
            value="wednesday"
            id="flexCheckDefault"
            v-model="availableDays"
          />
        </td>
        <td>
          <Datepicker
            v-model="wednesdayFrom"
            timePicker
            placeholder="Select Time"
          />
        </td>
        <td>
          <Datepicker
            v-model="wednesdayTo"
            timePicker
            placeholder="Select Time"
          />
        </td>
      </tr>
      <tr>
        <td>Thursday</td>
        <td>
          <input
            class="form-check-input"
            type="checkbox"
            value="thursday"
            id="flexCheckDefault"
            v-model="availableDays"
          />
        </td>
        <td>
          <Datepicker
            v-model="thursdayFrom"
            timePicker
            placeholder="Select Time"
          />
        </td>
        <td>
          <Datepicker
            v-model="thursdayTo"
            timePicker
            placeholder="Select Time"
          />
        </td>
      </tr>
      <tr>
        <td>Friday</td>
        <td>
          <input
            class="form-check-input"
            type="checkbox"
            value="friday"
            id="flexCheckDefault"
            v-model="availableDays"
          />
        </td>
        <td>
          <Datepicker
            v-model="fridayFrom"
            timePicker
            placeholder="Select Time"
          />
        </td>
        <td>
          <Datepicker v-model="fridayTo" timePicker placeholder="Select Time" />
        </td>
      </tr>
      <tr>
        <td>Saturday</td>
        <td>
          <input
            class="form-check-input"
            type="checkbox"
            value="saturday"
            id="flexCheckDefault"
            v-model="availableDays"
          />
        </td>
        <td>
          <Datepicker
            v-model="saturdayFrom"
            timePicker
            placeholder="Select Time"
          />
        </td>
        <td>
          <Datepicker
            v-model="saturdayTo"
            timePicker
            placeholder="Select Time"
          />
        </td>
      </tr>
      <tr>
        <td>Sunday</td>
        <td>
          <input
            class="form-check-input"
            type="checkbox"
            value="sunday"
            id="flexCheckDefault"
            v-model="availableDays"
          />
        </td>
        <td>
          <Datepicker
            v-model="sundayFrom"
            timePicker
            placeholder="Select Time"
          />
        </td>
        <td>
          <Datepicker v-model="sundayTo" timePicker placeholder="Select Time" />
        </td>
      </tr>
    </tbody>
  </table>
  <button class="btn btn-dark" @click="updateAvailability">Save</button>
  </div>
</template>

<script>
import { db } from "../firebase/db";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";
export default {
  name: "availability-edit",
  setup() {
    const mondayFrom = ref();
    const mondayTo = ref();
    const tuesdayFrom = ref();
    const tuesdayTo = ref();
    const wednesdayFrom = ref();
    const wednesdayTo = ref();
    const thursdayFrom = ref();
    const thursdayTo = ref();
    const fridayFrom = ref();
    const fridayTo = ref();
    const saturdayFrom = ref();
    const saturdayTo = ref();
    const sundayFrom = ref();
    const sundayTo = ref();

    return {
      mondayFrom,
      mondayTo,
      tuesdayFrom,
      tuesdayTo,
      wednesdayFrom,
      wednesdayTo,
      thursdayFrom,
      thursdayTo,
      fridayFrom,
      fridayTo,
      saturdayFrom,
      saturdayTo,
      sundayFrom,
      sundayTo,
    };
  },
  data() {
    return {
      availableDays: [],
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    updateAvailability() {
      try {
        for (let i = 0; i < this.availableDays.length; i++) {
          let day = this.availableDays[i];
          let from = new Date();
          let to = new Date();

          console.log(this.mondayFrom);

          switch (day) {
            case "monday":
              from = this.mondayFrom;
              to = this.mondayTo;
              break;
            case "tuesday":
              from = this.tuesdayFrom;
              to = this.tuesdayTo;
              break;
            case "wednesday":
              from = this.wednesdayFrom;
              to = this.wednesdayTo;
              break;
            case "thursday":
              from = this.thursdayFrom;
              to = this.thursdayTo;
              break;
            case "friday":
              from = this.fridayFrom;
              to = this.fridayTo;
              break;
            case "saturday":
              from = this.saturdayFrom;
              to = this.saturdayTo;
              break;
            case "sunday":
              from = this.sundayFrom;
              to = this.sundayTo;
              break;
            default:
              alert("error!");
          }

          updateDoc(doc(db, "employees", this.$store.state.user.email), {
            availability: arrayUnion({
              week: day,
              fromHours: from,
              toHours: to,
            }),
          });
        }
        alert("Your weekly availability is successfully registered!");
      } catch (e) {
        console.error("Error setting store ID for user", e);
      }
    },
  },
};
</script>

<style></style>
