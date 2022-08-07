<template>
  <div class="black-bg" v-if="selectStoreWindow == true && $store.state.storeInfo !=null">
    <div class="white-bg w-75 m-auto">
      <div>
        <h3>SELECT STORE</h3>
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
              >
            </div>
          </div>
        </div>

        
              <div
                v-if="
                  $store.state.storeInfo.length == 0 "
              >
                <p>You have no store registered</p>
                 <a
                href="#"
                class="btn btn-primary"
                @click="$emit('closeModal')"
                >Close</a
              >
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
