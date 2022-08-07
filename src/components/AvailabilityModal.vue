<template>

  <table class="table table-striped mx-auto w-50">
    <thead>
      <th>Day</th>
      <th>From</th>
      <th>To</th>
    </thead>
    <tbody>
      <tr v-for="(available, i) in availability" :key="i">
        <td>{{ available.week }}</td>
        <td>
          {{ available.fromHours.hours }}: {{ available.fromHours.minutes }}
        </td>
        <td>{{ available.toHours.hours }}: {{ available.toHours.minutes }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from "vue";
export default {
  name: "availability-modal",
  data() {
    return {
      availability: computed(() => this.$store.state.user.availability),
    };
  },
};
</script>

<style></style>
