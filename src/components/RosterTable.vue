<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="days in week" :key="days">

            <p >
              {{ days.schedWeek }}
            </p>
        
            <p :value="days.date">
              {{ days.date.getDate() }}/{{ days.date.getMonth() + 1 }}/{{
                days.date.getFullYear()
              }}
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, i) in employeePool" :key="i">
          <td v-if="Mon[i] != null">
            <div>{{ Mon[i].timeStart }} - {{ Mon[i].timeFinish }}</div>
            {{ Mon[i].lastName.substring(0, 1).toUpperCase() }}, 
            {{ Mon[i].firstName }}
          </td>
          <td v-if="Mon[i] == null"></td>
          <td v-if="Tue[i] != null">
            <div>{{ Tue[i].timeStart }} - {{ Tue[i].timeFinish }}</div>
            {{ Tue[i].lastName.substring(0, 1).toUpperCase() }}, 
            {{ Tue[i].firstName }}
          </td>
          <td v-if="Tue[i] == null"></td>
          <td v-if="Wed[i] != null">
            <div>{{ Wed[i].timeStart }} - {{ Wed[i].timeFinish }}</div>
            {{ Wed[i].lastName.substring(0, 1).toUpperCase() }}, 
            {{ Wed[i].firstName }}
          </td>
          <td v-if="Wed[i] == null"></td>
          <td v-if="Thu[i] != null">
            <div>{{ Thu[i].timeStart }} - {{ Thu[i].timeFinish }}</div>
            {{ Thu[i].lastName.substring(0, 1).toUpperCase() }}, 
            {{ Thu[i].firstName }}
          </td>
          <td v-if="Thu[i] == null"></td>
          <td v-if="Fri[i] != null">
            <div>{{ Fri[i].timeStart }} - {{ Fri[i].timeFinish }}</div>
            {{ Fri[i].lastName.substring(0, 1).toUpperCase() }}, 
            {{ Fri[i].firstName }}
          </td>
          <td v-if="Fri[i] == null"></td>
          <td v-if="Sat[i] != null">
            <div>{{ Sat[i].timeStart }} - {{ Sat[i].timeFinish }}</div>
            {{ Sat[i].lastName.substring(0, 1).toUpperCase() }}, 
            {{ Sat[i].firstName }}
          </td>
          <td v-if="Sat[i] == null"></td>
          <td v-if="Sun[i] != null">
            <div>{{ Sun[i].timeStart }} - {{ Sun[i].timeFinish }}</div>
            {{ Sun[i].lastName.substring(0, 1).toUpperCase() }}, 
            {{ Sun[i].firstName }}
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
