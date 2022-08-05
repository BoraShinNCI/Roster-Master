<template>
  <ul class="nav nav-tabs" >
    <li class="nav-item">
      <router-link
        v-if="$store.state.isLoggedin"
        to="/"
        class="nav-link active"
        aria-current="page"
      >
      Dashboard
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/roster" class="nav-link">Rosters</router-link>
    </li>

    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-expanded="false"
        >My Account</a
      >
      <ul class="dropdown-menu">
        <li class="nav-item">
          <router-link to="/available" class="dropdown-item">Availability</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/request" class="dropdown-item">Request</router-link>
        </li>
      </ul>
    </li>

    <li class="nav-item dropdown" v-if="$store.state.isManager == true">
      <a
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-expanded="false"
        >Store Manager</a
      >
      <ul class="dropdown-menu">
        <li>
          <router-link to="/create" class="dropdown-item"
            >Create Roster</router-link
          >
        </li>
        <li>
          <router-link to="#" class="dropdown-item"
            >Request Approval</router-link
          >
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <router-link to="/list" class="dropdown-item"
            >Employee List</router-link
          >
        </li>
      </ul>
    </li>

    <li class="nav-item" v-if="$store.state.isLoggedin == true">
      <a class="nav-link" @click="$emit('openModal')"
        >Welcome, {{$store.state.user.firstName}}: Current Store : {{ $store.state.selectedStore.name }}, {{
          $store.state.selectedStore.address
        }}</a
      >
    </li>

    <li v-if="$store.state.isLoggedin == true">
      <button class="btn btn-secondary" @click="$store.dispatch('logout')">
        Sign Out
      </button>
    </li>
  </ul>


  
</template>

<script>

export default {
  data() {
    return {

    };
  },
  components: {

  },
};
</script>

<style></style>
