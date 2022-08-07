<template>
  <h1 class="text-center my-5">Employees List</h1>

  <div class="w-75 m-auto">
    <table class="table table-striped m-auto">
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
  </div>
  <button
    class="btn btn-dark mt-3"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#employeeModal"
  >
    Add employee
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="employeeModal"
    tabindex="-1"
    aria-labelledby="newRequestLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newRequestLabel">Find Employee</h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <input
            type="email"
            class="form-control form-control-lg"
            v-model="employeeEmail"
          />
        </div>
        <div class="form-group m-auto w-75">
          {{ employeeName }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="search">
            search
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="add"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { ref } from "vue";
import { db } from "../firebase/db";
import { getDoc, doc } from "firebase/firestore";
export default {
  name: "list-employee",
  data() {
    return {
      employeePool: computed(() => this.$store.state.employeePool),
      addEmployeeWindow: false,
      employeeEmail: ref(""),
      employeeName: "",
    };
  },
  components: {},
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
    search() {
      console.log(this.employeeEmail);
      getDoc(doc(db, "employees", this.employeeEmail)).then((doc) => {
        this.employeeName = doc.data().lastName + ", " + doc.data().firstName;
      });
    },
  },
};
</script>

<style>
div {
  box-sizing: border-box;
}
</style>
