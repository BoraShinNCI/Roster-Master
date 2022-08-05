<template>

  <div class="w-50 m-auto">
    <form>

      <div class="form-group">
        <label for="requestType">Request Type</label>
        <select multiple class="form-control" id="requestType">
          <option>Shift Change</option>
          <option>Extra Hours</option>
          <option>Day Off</option>
          <option>Sick Leave</option>
          <option>Others</option>
        </select>
      </div>
      <div class="form-group">
        <label for="messageToManager">Message to the manager</label>
        <textarea
          class="form-control"
          id="messageToManager"
          rows="3"
          v-model="message"
        ></textarea>
      </div>
      <button class="btn btn-primary mt-2" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  name: "request-view",
  data() {
    return {
        message: ref(""),
    };
  },
  methods:{
    submit(){
        console.log(this.message)
    }
  }
};
</script>

<style></style>
