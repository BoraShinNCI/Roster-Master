<template>
  <div class="new-store">
    <h1 class="text-center mt-5">New Store</h1>
    <section class="vh-100 gradient-custom">
      <div class="container py-4 h-100">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-lg-9 col-xl-7">
            <div
              class="card shadow-2-strong card-registration"
              style="border-radius: 15px"
            >
              <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Store Information</h3>
                <form>
                  <div class="row">

                    <div class="mb-4">
                      <div class="form-outline">
                        <input
                          type="text"
                          v-model="name"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="Name">Store Name</label>
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
                    <div class="mb-4">
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
                  </div>
                  <div class="mb-4">
                    <div class="form-outline">
                      <input
                        type="email"
                        v-model="email"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="email">Email</label>
                    </div>
                  </div>
                  <div class="mb-4 row">
                    <p>Business Hours</p>
                    <div class="col-md-6">
                      <Datepicker v-model="timeStart" timePicker />
                      <p>Start</p>
                    </div>
                    <div class="col-md-6">
                      <Datepicker v-model="timeFinish" timePicker />
                      <p>Finish</p>
                    </div>
                  </div>

                  <div class="mt-4 pt-2">
                    <input
                      class="btn btn-primary"
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
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  setup() {
    const timeStart = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });

    const timeFinish = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });

    return {
      timeStart,
      timeFinish,
    };
  },
  data() {
    return {
      storeData: {
        name: ref(""),
        address: ref(""),
        phone: ref(""),
        email: ref(""),
      },
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    submit() {
      this.$store.dispatch("newStore", {
        name: this.name,
        address: this.address,
        phone: this.phone,
        email: this.email,
        timeStart: this.timeStart,
        timeFinish: this.timeFinish,
      });
    },
  },
};
</script>

<style></style>
