<template>
  <div class="black-bg" v-if="addEmployeeWindow == true">
    <div class="white-bg">
      <h3>Add Employee Email</h3>

      <div class="form-outline">
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="employeeEmail"
        />
      </div>
      <div class="mt-3">
        <button class="btn btn-primary m-1" @click="add">Add</button>
        <button class="btn btn-secondary m-1" @click="$emit('closeModal')">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "EmployeeModal",
  data() {
    return {
      employeeEmail: ref(""),
    };
  },
  props: {
    addEmployeeWindow: Boolean,
  },
  methods: {
    add() {
      try {
        this.$store.dispatch("addEmployee", {
          email: this.employeeEmail,
          storeID: this.$store.state.selectedStore.storeID,
        });
        this.$store.dispatch("addStoreID", {
          email: this.employeeEmail,
          storeID: this.$store.state.selectedStore.storeID,
        });

        alert("employee " + this.employeeEmail + " successfully added");
      } catch (error) {
        console.error(error);
      }
    },

  },
};
</script>

<style></style>
