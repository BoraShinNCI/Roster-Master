<template>
  <div class="black-bg" v-if="selectStoreWindow == true">
    <div class="white-bg w-75 m-auto">
      <div v-if="$store.state.storeInfo.length == 0">
        <p>
          You are not registered in any store. <br />Please create a store or
          ask your manager to add you to the store.
        </p>
        <router-link class="btn btn-dark" to="/newStore">
          Create Store</router-link
        ><button class="btn btn-secondary mx-2" @click="$emit('closeModal')">Close</button>
      </div>
      <div v-if="$store.state.storeInfo.length > 0">
        <div>
          <div class="card" v-for="storeInfo in storeInfoList" :key="storeInfo">
            <h5 class="card-header">{{ storeInfo.name }}</h5>
            <div class="card-body">
              <h5 class="card-title">{{ storeInfo.address }}</h5>
              <p class="card-text">
                Business hours: {{ storeInfo.timeStart.hours }}:{{
                  storeInfo.timeStart.minutes
                }}
                - {{ storeInfo.timeFinish.hours }}-{{
                  storeInfo.timeFinish.minutes
                }}
              </p>

              <a
                href="#"
                class="btn btn-dark"
                @click="selectStore(storeInfo), $emit('closeModal')"
                >Select</a
              ><button class="btn btn-secondary mx-2" @click="$emit('closeModal')">Close</button>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "StoreModal",
  data() {
    return {
      storeInfoList: computed(() => this.$store.state.storeInfo),
    };
  },
  props: {
    selectStoreWindow: Boolean,
    storeInfo: Array,
  },
  methods: {
    selectStore(storeInfo) {
      this.$store.commit("selectStore", storeInfo);
    },
  },
};
</script>

<style></style>
