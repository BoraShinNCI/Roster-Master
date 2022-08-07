<template>
  <div class="new-employee">
    <h1 class="text-center mt-5">Employee Contact Details</h1>
    <section class="vh-100 gradient-custom">
      <div class="container py-4 h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-lg-9 col-xl-7">
            <div
              class="card shadow-2-strong card-registration"
              style="border-radius: 15px"
            >
              <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form>
                  <div class="row">
                    <div class="mb-4">
                      <div class="form-outline">
                        <input
                          disabled
                          type="email"
                          class="form-control form-control-lg"
                          :value=this.$store.state.user.email
                        />
                        <label class="form-label" for="email">Email</label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          v-model="firstName"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="firstName"
                          >First Name</label
                        >
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          v-model="lastName"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="lastName"
                          >Last Name</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          v-model="address"
                        />
                        <label class="form-label" for="address">Address</label>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="tel"
                          v-model="phone"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="phone"
                          >Phone Number</label
                        >
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          v-model="employeeID"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="employeeID"
                          >Employee ID</label
                        >
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <label class="form-label select-label mx-2" for="type"
                        >Please select
                      </label>
                    </div>
                    <div class="col-12">
                      <select v-model="type" class="select form-control-lg">
                        <option value="" selected disabled>
                          Employee Type
                        </option>
                        <option value="staff">Staff</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>

                  <div class="mt-4 pt-2">
                    <input
                      class="btn btn-dark"
                      type="submit"
                      value="Submit"
                      @click="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "new-employee",
  data() {
    return {
      employeeData: {
        employeeID: ref(""),
        firstName: ref(""),
        lastName: ref(""),
        address: ref(""),
        phone: ref(""),
        type: ref(""),
      }
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("userRegistration", {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        phone: this.phone,
        employeeID: this.employeeID,
        type: this.type,
      });
    },
  },


};
</script>

<style></style>
