<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" aria-current="page">
        Roster Master
      </router-link>

      <div class="d-flex justify-content-end">
        <p class="m-auto me-4 text-white" >
          <span v-if="$store.state.isRegistered == true" >
            <img
              src="../public/user.png"
              alt=""
              height="20"
              
            />
            Hi, {{ $store.state.user.firstName }}!
          </span>
          <span v-if="$store.state.isStoreSelected == false && $store.state.isRegistered == true" @click="selectStoreWindow = true">Select Store</span>
          <span v-if="$store.state.isStoreSelected == true && $store.state.isRegistered == true" @click="selectStoreWindow = true"
            >{{ $store.state.selectedStore.name }} ({{
              $store.state.selectedStore.address
            }})</span
          >
        </p>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link active"
              aria-current="page"
              href="#"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/roster" class="nav-link" href="#"
              >Rosters</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Store Management
            </a>
            <ul
              class="dropdown-menu w-50 m-auto"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <router-link to="/newStore" class="dropdown-item" href="#"
                  >New Store</router-link
                >
              </li>
              <li>
                <router-link
                  to="/list"
                  class="dropdown-item"
                  v-if="$store.state.isManager == true"
                  >Employees List</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              My Schedule
            </a>
            <ul
              class="dropdown-menu w-50 m-auto"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <router-link to="/available" class="dropdown-item"
                  >Availability</router-link
                >
              </li>
              <li>
                <router-link to="/request" class="dropdown-item"
                  >Request</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown" v-if="$store.state.isManager == true">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Roster Management
            </a>
            <ul
              class="dropdown-menu w-50 m-auto"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <router-link to="/create" class="dropdown-item"
                  >Create Roster</router-link
                >
              </li>
              <li>
                <router-link to="/approve" class="dropdown-item"
                  >Request Approval</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a
              v-if="$store.state.isLoggedin == true"
              class="nav-link"
              @click="$store.dispatch('logout')"
              >Sign Out</a
            >
            <router-link
              to="/login"
              v-if="$store.state.isLoggedin == false"
              class="nav-link"
              >Log In</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <StoreModal
    @closeModal="selectStoreWindow = false"
    :selectStoreWindow="selectStoreWindow"
    :storeInfo="storeInfo"
  />
  <router-view
    v-if="selectStoreWindow == false"
    @openModal="selectStoreWindow = true"
  />
</template>

<script>
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
</style>
