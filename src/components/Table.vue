<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="days in week" :key="days">
            {{ days.schedWeek }}
          </th>
        </tr>
        <tr>
          <th v-for="days in week" :key="days" :value="days.date">
            {{ days.date.getDate() }}/{{ days.date.getMonth() + 1 }}/{{
              days.date.getFullYear()
            }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, i) in employeePool" :key="i">
          <td v-if="Mon[i] != null">
            <div>{{ Mon[i].timeStart }} - {{ Mon[i].timeFinish }}</div>
            {{ Mon[i].firstName }},
            {{ Mon[i].lastName.substring(0, 1).toUpperCase() }}
          </td>
          <td v-if="Mon[i] == null"></td>
          <td v-if="Tue[i] != null">
            <div>{{ Tue[i].timeStart }} - {{ Tue[i].timeFinish }}</div>
            {{ Tue[i].firstName }},
            {{ Tue[i].lastName.substring(0, 1).toUpperCase() }}
          </td>
          <td v-if="Tue[i] == null"></td>
          <td v-if="Wed[i] != null">
            <div>{{ Wed[i].timeStart }} - {{ Wed[i].timeFinish }}</div>
            {{ Wed[i].firstName }},
            {{ Wed[i].lastName.substring(0, 1).toUpperCase() }}
          </td>
          <td v-if="Wed[i] == null"></td>
          <td v-if="Thu[i] != null">
            <div>{{ Thu[i].timeStart }} - {{ Thu[i].timeFinish }}</div>
            {{ Thu[i].firstName }},
            {{ Thu[i].lastName.substring(0, 1).toUpperCase() }}
          </td>
          <td v-if="Thu[i] == null"></td>
          <td v-if="Fri[i] != null">
            <div>{{ Fri[i].timeStart }} - {{ Fri[i].timeFinish }}</div>
            {{ Fri[i].firstName }},
            {{ Fri[i].lastName.substring(0, 1).toUpperCase() }}
          </td>
          <td v-if="Fri[i] == null"></td>
          <td v-if="Sat[i] != null">
            <div>{{ Sat[i].timeStart }} - {{ Sat[i].timeFinish }}</div>
            {{ Sat[i].firstName }},
            {{ Sat[i].lastName.substring(0, 1).toUpperCase() }}
          </td>
          <td v-if="Sat[i] == null"></td>
          <td v-if="Sun[i] != null">
            <div>{{ Sun[i].timeStart }} - {{ Sun[i].timeFinish }}</div>
            {{ Sun[i].firstName }},
            {{ Sun[i].lastName.substring(0, 1).toUpperCase() }}
          </td>
          <td v-if="Sun[i] == null"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "Table-view",
  data() {
    return {
      employeePool: computed(() => this.$store.state.employeePool),
    };
  },
  props: {
    Mon: Array,
    Tue: Array,
    Wed: Array,
    Thu: Array,
    Fri: Array,
    Sat: Array,
    Sun: Array,
    scheduleFetched: Boolean,
    week: Array,
  },
};
</script>

<style></style>
