import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { createStore } from "vuex";
import router from "./router";
import { db } from "./firebase/db";

const auth = getAuth();

const store = createStore({
  state() {
    return {
      user: "",
      selectedStore: "",
      storeInfo: [],
      isLoggedin: false,
      isManager: false,
      isStoreSelected: false,
      employeePool: [],
    };
  },
  mutations: {
    // setting user email
    setUser(state, user) {
      if (user) {
        state.user = {
          employeeID: user.employeeID,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          availability: user.availability,
        };
        console.log("user setting..." + state.user.email);
      }
    },

    // setting login status
    setLogin(state, loggedin) {
      state.isLoggedin = loggedin;
      console.log("User login status " + state.isLoggedin);
    },

    // setting user type
    isManager(state, manager) {
      state.isManager = manager;
    },

    updateEmployeePool(state, storeID) {
      if (storeID) {
        state.employeePool = new Array();
        // reading employee list
        const q = query(
          collection(db, "employees"),
          where("storeID", "array-contains", storeID)
        );

        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const user = {
              employeeID: doc.data().employeeID,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              address: doc.data().address,
              phone: doc.data().phone,
              email: doc.data().email,
              type: doc.data().type,
              availability: doc.data().availability,
            };

            state.employeePool.push(user);
          });
        });
        console.log(
          "updating employee pool successfully " + state.employeePool
        );
      }
    },

    // setting store ID email
    setStoreInfo(state, id) {
      state.storeInfo = new Array();
      try {
        // reading business info of each store
        for (let i = 0; i < id.length; i++) {
          const storeRef = doc(db, "stores", id[i]);
          getDoc(storeRef).then((doc) => {
            const storeData = {
              storeID: id[i],
              name: doc.data().name,
              address: doc.data().address,
              timeStart: doc.data().timeStart,
              timeFinish: doc.data().timeFinish,
            };

            state.storeInfo.push(storeData);
          });
        }
      } catch (e) {
        console.error("error setting store list info (setStoreInfo)", e);
      }
    },

    // selecting store
    selectStore(state, selectedStoreInfo) {
      if (selectedStoreInfo) {
        state.selectedStore = selectedStoreInfo;
        state.isStoreSelected = true;
        console.log("selected? " + state.isStoreSelected);

        store.commit("updateEmployeePool", store.state.selectedStore.storeID);
      } else {
        state.isStoreSelected = false;
        console.log("selected? " + state.isStoreSelected);
      }
    },
  },
  actions: {
    // user sign up
    signup(context, user) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((response) => {
          console.log("user created: " + response.user.email);

          //setting app user to currently signed up user
          context.commit("setUser", auth.currentUser);

          alert(auth.currentUser.email + " Successfully registered!!!");

          //direct to employee contact registration page
          router.push("/account");
        })
        .catch((error) => {
          if (error.code == "auth/invalid-email") {
            alert("Please enter a valid email address.");
          } else if (error.code == "auth/weak-password") {
            alert("Password has to be at least six characters");
          } else if (error.code == "auth/email-already-in-use") {
            alert("Existing user: Please log in.");
            router.push("/login");
          }
          console.log(error.code);
        });
    },

    // user login
    login(context, user) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((response) => {
          //setting app user to currently logged in user
          context.commit("setUser", auth.currentUser);
          alert("Welcome!");
        })
        .catch((error) => {
          if (error.code == "auth/user-not-found") {
            alert("User doesn't exist. Please sign up.");
          } else if (error.code == "auth/invalid-email") {
            alert("Please enter a valid email address.");
          } else if (error.code == "auth/wrong-password") {
            alert("Wrong password!");
          }
          console.log(error.code);
        });
    },

    // user log out
    logout() {
      console.log("signing out the user ...");
      auth.signOut();
    },

    // creating a new row in the employees database
    userRegistration(context, employeeData) {
      // creating document in firebase
      try {
        setDoc(doc(db, "employees", auth.currentUser.email), {
          email: auth.currentUser.email,
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          address: employeeData.address,
          phone: employeeData.phone,
          employeeID: employeeData.employeeID,
          type: employeeData.type,
          storeID: [],
          availability: [],
        });
        console.log("employee added");
        alert("User account successfully registered");
        //direct to home page
        router.push("/");
      } catch (e) {
        console.error("Error adding doc: ", e);
      }
    },

    // creating a new row in the store database
    newStore(context, storeData) {
      // creating document in firebase

      const docRef = collection(db, "stores");

      const data = {
        name: storeData.name,
        address: storeData.address,
        phone: storeData.phone,
        email: storeData.email,
        timeStart: storeData.timeStart,
        timeFinish: storeData.timeFinish,
        employees: [],
      };

      addDoc(docRef, data).then((docRef) => {
        console.log("added store with doc id " + docRef.id);

        // logging the created store ID to the user's
        try {
          store.dispatch("addStoreID", {
            email: auth.currentUser.email,
            storeID: docRef.id,
          });
          console.log("after dispatching addStoreID " + docRef.id);
        } catch (e) {
          console.error(
            "error adding the created storeID to the employee's store list (newStore)",
            e
          );
        }

        // adding the current user in the employees pool under the new store
        try {
          store.dispatch("addEmployee", {
            email: auth.currentUser.email,
            storeID: docRef.id,
          });
          console.log("after dispatching addEmployee " + docRef.id);
        } catch (e) {
          console.error(
            "error adding employee to the store's employee pool (newStore)",
            e
          );
        }
      });

      alert("new store successfully added");

      //direct to employee adding page
      router.push("/list");
    },

    // adding employee to the employee pool in the store database
    addEmployee(context, employee) {
      const storeRef = doc(db, "stores", employee.storeID);
      try {
        updateDoc(storeRef, {
          employees: arrayUnion(employee.email),
        });
      } catch (e) {
        console.error(
          "error adding employee to the store's employee pool (addEmployee)",
          e
        );
      }
    },

    // logging the created store ID to the user's
    addStoreID(context, addStore) {
      console.log("inside addStoreID function");
      try {
        updateDoc(doc(db, "employees", addStore.email), {
          storeID: arrayUnion(addStore.storeID),
        });

        console.log("addStoreID: " + addStore.storeID);
      } catch (e) {
        console.error("Error setting store ID for user", e);
      }
    },

    // creating roster document in firebase
    postRoster(context, shiftDetails) {
      try {
        for (let i = 0; i < shiftDetails.length; i++) {
          setDoc(
            doc(
              db,
              "rosters/" +
                store.state.selectedStore.storeID +
                "/" +
                shiftDetails[i].year +
                "/" +
                shiftDetails[i].month +
                "/" +
                shiftDetails[i].date +
                "/" +
                shiftDetails[i].email
            ),
            {
              email: shiftDetails[i].email,
              firstName: shiftDetails[i].firstName,
              lastName: shiftDetails[i].lastName,
              date:
                shiftDetails[i].date +
                "-" +
                shiftDetails[i].month +
                "-" +
                shiftDetails[i].year,
              timeStart:
                shiftDetails[i].timeStart.hours +
                ":" +
                shiftDetails[i].timeStart.minutes,
              timeFinish:
                shiftDetails[i].timeFinish.hours +
                ":" +
                shiftDetails[i].timeFinish.minutes,
            }
          );
        }
      } catch (e) {
        console.error("Error adding doc: ", e);
      }

      alert("roster successfully added!");
      //direct to login page
      router.push("/roster");
    },

    postRequest(context, requestInfo) {
      try {
        addDoc(
          collection(
            db,
            "stores/" + store.state.selectedStore.storeID + "/requests"
          ),
          {
            timestamp: requestInfo.timestamp,
            email: requestInfo.email,
            requestedBy: requestInfo.requestedBy,
            requestedDate: requestInfo.requestedDate,
            requestType: requestInfo.requestType,
            requestMessage: requestInfo.requestMessage,
            requestStatus: requestInfo.requestStatus,
            approvalMessage: requestInfo.approvalMessage,
          }
        );
      } catch (e) {
        console.error("Error adding doc: ", e);
      }
      alert("request submitted");
    },
    updateRequest(context, approval) {
      try {
        updateDoc(
          doc(
            db,
            "stores/" + store.state.selectedStore.storeID + "/requests",
            approval.id
          ),
          {
            timestamp: approval.timestamp,
            approvalMessage: approval.approvalMessage,
            requestStatus: approval.requestStatus,
          }
        );
        alert("Request is " + approval.requestStatus);
      } catch (e) {
        console.error("Error", e);
      }
    },
  },
});

// checing authentication state
onAuthStateChanged(auth, (user) => {
  try {
    if (user) {
      // login status setting
      store.commit("setLogin", true);
      console.log("auth state changed: User signed in");

      //reading the user type
      const docRef = doc(db, "employees", auth.currentUser.email);
      getDoc(docRef).then((doc) => {
        const user = {
          employeeID: doc.data().employeeID,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          phone: doc.data().phone,
          type: doc.data().type,
          availability: doc.data().availability,
        };

        // user info setting
        store.commit("setUser", user);

        if (doc.data().storeID.length != 0) {
          // reading all the store IDs that the user is registered to
          store.commit("setStoreInfo", doc.data().storeID);
        }

        // if the user is a manager
        if (doc.data().type == "manager") {
          // setting user type: manager
          store.commit("isManager", true);
        }
      });

      //direct to home page
      router.push("/");
    } else {
      console.log("auth state changed: No user is signed in");
      store.commit("setLogin", false);
      store.commit("isManager", false);
      store.commit("setStoreInfo", []);
      store.commit("selectStore");

      //direct to login page
      router.push("/login");
    }
  } catch (e) {
    console.log(e);
  }
});

export default store;
