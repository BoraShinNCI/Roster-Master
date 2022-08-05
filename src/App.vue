<template>
  <NavBar @openModal="selectStoreWindow = true" class="mb-5"/>
  <StoreModal
    @closeModal="selectStoreWindow = false"
    :selectStoreWindow="selectStoreWindow"
    :storeInfo="storeInfo"
  />
  <router-view v-if="selectStoreWindow==false" @openModal="selectStoreWindow = true"/>

  <!-- <div>
    <b-button v-b-toggle.sidebar-variant>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-variant" title="Sidebar" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
      </div>
    </b-sidebar>
  </div> -->

</template>

<script>
import NavBar from "./components/NavBar.vue";
import { computed } from "vue";
import StoreModal from "./components/StoreModal.vue";
export default {
  name: "App",
  data() {
    return {
      user: computed(() => this.$store.state.user),
      isLoggedin: computed(() => this.$store.state.isLoggedin),
      selectedStore: computed(() => this.$store.state.selectedStore),
      storeInfo: this.$store.state.storeInfo,
      selectStoreWindow: false,
    };
  },
  components: {
    NavBar: NavBar,
    StoreModal: StoreModal,
  },
  method: {},
};
</script>

<style>
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.btn .btn-primary {
color: green;
}
</style>
