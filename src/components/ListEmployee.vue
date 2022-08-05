<template>
  <div class="list-employee" v-if="addEmployeeWindow == false">
    <h1 class="text-center mt-5">Employees List</h1>
    <h4>[Store Name: {{ $store.state.selectedStore.name }}]</h4>
    <table class="table table-striped mx-2 my-4">
      <thead>
        <th>Type</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Email</th>
      </thead>
      <tbody>
        <tr v-for="(employee, i) in employeePool" :key="i">
          <td>{{ employee.type }}</td>
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.address }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ employee.email }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary" @click="addEmployeeWindow = true">
      Add employee
    </button>
  </div>

  <EmployeeModal
    @closeModal="addEmployeeWindow = false"
    :addEmployeeWindow="addEmployeeWindow"
  />
</template>

<script>
import { computed } from "vue"
import EmployeeModal from "./EmployeeModal.vue";
export default {
  name: "list-employee",
  data() {
    return {
      employeePool: computed(()=>this.$store.state.employeePool),
      addEmployeeWindow: false,
    };
  },
  components: {
    EmployeeModal: EmployeeModal,
  },

};
</script>

<style>
div {
  box-sizing: border-box;
}
</style>
