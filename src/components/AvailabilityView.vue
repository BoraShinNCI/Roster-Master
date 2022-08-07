<template>
  <h3 class="my-5">Your Available Hours</h3>
  <AvailabilityModal />

  <router-link to="/editAvailability" class="btn btn-dark">
    Edit Availability</router-link
  >
  <router-view></router-view>
</template>
<script>
import AvailabilityModal from "../components/AvailabilityModal.vue";
export default {
  name: "availability-view",
  components: {
    AvailabilityModal,
  },
};
</script>

<style></style>
