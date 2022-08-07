<template>
  <div class="mx-auto container-fluid">
    <h3 class="mt-5">Hello, {{ $store.state.user.firstName }}!</h3>

    <div v-if="$store.state.isStoreSelected == false">
      <p>Please select your store</p>
      <button class="btn btn-dark" @click="$emit('openModal')">Select</button>
    </div>
  </div>
</template>

<script>
import router from "../router.js";
export default {
  name: "home-view",
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style></style>
