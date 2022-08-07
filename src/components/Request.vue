<template>
  <h3>Your Requests</h3>
  <table class="table table-striped w-75 m-auto">
    <thead>
      <tr>
        <th>#</th>
        <th>Request Type</th>
        <th>Request Date</th>
        <th>Status</th>
        <th>Last Updated</th>
        <th>Manager's message</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(myRequest, i) in myRequestList" :key="i">
      <td>{{i}}</td>
        <td>{{ myRequest.requestType }}</td>
        <td>{{ myRequest.requestedDate }}</td>
        <td>{{ myRequest.requestStatus }}</td>
        <th>{{ myRequest.timestamp }}</th>
        <td>{{myRequest.approvalMessage}}</td>
      </tr>
    </tbody>
  </table>
  <button
    type="button"
    class="btn btn-dark mt-3"
    data-bs-toggle="modal"
    data-bs-target="#newRequest"
  >
    New Request
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="newRequest"
    tabindex="-1"
    aria-labelledby="newRequestLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newRequestLabel">New Request</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="requestType">Request Type</label>
              <select
                multiple
                class="form-control"
                id="requestType"
                v-model="requestType"
              >
                <option value="Shift Change">Shift Change</option>
                <option value="Extra Hours">Extra Hours</option>
                <option value="Day Off">Day Off</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div class="mt-3">
              <p>Requesting Date</p>
              <Datepicker
                v-model="date"
                :format="dateFormat"
                :enableTimePicker="false"
                autoApply
                :minDate="new Date()"
              />
            </div>

            <div class="form-group mt-3">
              <label for="messageToManager">Message to the manager</label>
              <textarea
                class="form-control"
                id="messageToManager"
                rows="3"
                v-model="message"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-dark" data-bs-dismiss="modal" @click="submit">
            submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { db } from "../firebase/db";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
export default {
  name: "request-view",
  setup() {
    const date = ref(new Date());
    const dateFormat = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return day + "-" + month + "-" + year;
    };

    return {
      date,
      dateFormat,
    };
  },
  data() {
    return {
      message: ref(""),
      requestType: ref(""),
      timestamp: "",
      myRequestList: [],
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    submit() {
      const today = new Date();
      const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;

      this.$store.dispatch("postRequest", {
        timestamp: this.timestamp,
        email: this.$store.state.user.email,
        requestedBy:
          this.$store.state.user.firstName +
          " " +
          this.$store.state.user.lastName,
        requestedDate: this.dateFormat(this.date),
        requestType: this.requestType[0],
        requestMessage: this.message,
        requestStatus: "pending",
        approvalMessage: "",
      });
    },
  },
  created() {
    const q = query(
      collection(
        db,
        "stores/" + this.$store.state.selectedStore.storeID + "/requests"
      ),
      where("email", "==", this.$store.state.user.email)
    );

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const myRequest = {
          timestamp: doc.data().timestamp,
          requestedDate: doc.data().requestedDate,
          requestType: doc.data().requestType,
          requestMessage: doc.data().requestMessage,
          requestStatus: doc.data().requestStatus,
          approvalMessage: doc.data().approvalMessage
        };

        this.myRequestList.push(myRequest);
      });
    });
  },
};
</script>

<style></style>
