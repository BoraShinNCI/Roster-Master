<template>

  <form class="justify-content-center my-5">
        <h4 class="mt-2">
      Welcome to Roster Master :)
    </h4>
    <div class="form-group col-9 mx-auto">
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email"
        placeholder="Enter email"
      />
      <small id="emailHelp" class="form-text text-muted"
        >We'll never share your email with anyone else.</small
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

    <button type="submit" class="btn btn-primary mt-3" @click="login">
      Login
    </button>

  </form>

  <div class="mt-4">
<h4>
  Don't have an account?
</h4>
    <button class="btn btn-primary mt-3"  @click="$router.push('/signup')">
      Sign Up
    </button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "log-in",
  data() {
    return {
      email: ref(""),
      password: ref(""),
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {email: this.email, password: this.password})
      
    },
  },
};
</script>

<style></style>
