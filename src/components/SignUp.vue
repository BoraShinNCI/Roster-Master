<template>
  <form class="justify-content-center my-5">
    <h4 class="mt-2">Sign Up</h4>
    <div class="form-group col-9 mx-auto">
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email"
        placeholder="Enter email"
      />
         <small v-if="password.length < 6 && password.length>0" id="emailHelp" class="form-text text-danger"
        >Password length is too short</small
      >
    </div>
    <div class="form-group col-9 mx-auto">
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        v-model="password"
        placeholder="Password"
      />
    </div>

    <button type="submit" class="btn btn-dark mt-3" @click="signup">
      Sign Up
    </button>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "sign-up",
  data() {
    return {
      email: ref(""),
      password: ref(""),
    };
  },
  methods: {
    signup() {
      this.$store.dispatch("signup", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
