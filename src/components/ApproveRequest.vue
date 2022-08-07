<template>
  <h3 class="my-5">Approving Request</h3>
  <table class="table table-striped w-75 m-auto">
    <thead>
      <tr>
        <th></th>
        <th>Status</th>
        <th>Request Date</th>
        <th>Employee</th>
        <th>Request Type</th>
        <th>Last Updated</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(requests, i) in requestList" :key="i">
        <td>
          <button
            type="button"
            class="btn btn-sm btn-secondary"
            data-bs-toggle="modal"
            :data-bs-target="`#request${i}`"
          >
            view
          </button>
        </td>
        <td>{{ requests.requestStatus }}</td>
        <td>{{ requests.requestedDate }}</td>
        <td>{{ requests.requestedBy }}</td>
        <td>{{ requests.requestType }}</td>
        <td>{{ requests.timestamp }}</td>

        <!-- Modal -->
        <div
          class="modal fade"
          :id="`request${i}`"
          tabindex="-1"
          aria-labelledby="newRequestLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="newRequestLabel">
                  Request Message ({{ requests.timestamp }})
                </h5>

                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="form-group m-auto w-75">
                  <label for="messageReceived">message</label>
                  <textarea
                    class="form-control"
                    id="messageReceived"
                    rows="3"
                    readonly
                    :value="requests.requestMessage"
                  ></textarea>
                  <label for="messageToManager">comment</label>
                  <textarea
                    class="form-control"
                    id="messageToManager"
                    rows="3"
                    v-model="approvalMessage"
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-dark"
                  data-bs-dismiss="modal"
                  @click="approve(0, requests)"
                >
                  Decline
                </button>
                <button
                  type="button"
                  class="btn btn-dark"
                  data-bs-dismiss="modal"
                  @click="approve(1, requests)"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { db } from "../firebase/db";
import { collection, getDocs, doc } from "firebase/firestore";
import { ref } from "vue";
export default {
  data() {
    return {
      requestList: [],
      approval: "",
      approvalMessage: "",
    };
  },
  methods: {
    approve(approved, requests) {
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
      let message = "";
      if (approved == 0) {
        message = "declined";
      } else if (approved == 1) {
        message = "approved";
      }

      this.$store.dispatch("updateRequest", {
        timestamp: dateTime,
        id: requests.id,
        approvalMessage: this.approvalMessage,
        requestStatus: message,
      });
    },
  },
  created() {
    getDocs(
      collection(
        db,
        "stores/" + this.$store.state.selectedStore.storeID + "/requests"
      )
    ).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const requestInfo = {
          id: doc.id,
          timestamp: doc.data().timestamp,
          email: doc.data().email,
          requestedBy: doc.data().requestedBy,
          requestedDate: doc.data().requestedDate,
          requestType: doc.data().requestType,
          requestMessage: doc.data().requestMessage,
          requestStatus: doc.data().requestStatus,
        };

        this.requestList.push(requestInfo);
      });
    });
  },
};
</script>

<style></style>
