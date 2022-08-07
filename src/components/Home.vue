<template>
  <div class="mx-auto container-fluid">
    <h3 class="mt-5">Hello, {{$store.state.user.firstName}}!</h3>

    <div v-if="$store.state.storeInfo.length == 0 && $store.state.isLoggedin">
      <p>
        You are not registered in any store. <br />Please create a store or ask
        your manager to add you to the store.
      </p>
      <router-link class="btn btn-dark" to="/newStore"> Create Store</router-link>
    </div>

    <div
      v-if="
        $store.state.storeInfo.length > 0 &&
        $store.state.isStoreSelected == false"
    >
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

<style>
</style>
