import { createWebHashHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Signup from "./components/SignUp.vue";
import Home from "./components/Home.vue";
import NewEmployee from "./components/NewEmployee.vue";
import ListEmployee from "./components/ListEmployee.vue";
import NewStore from "./components/NewStore.vue";
import ViewRoster from "./components/ViewRoster.vue";
import CreateRoster from "./components/CreateRoster.vue";
import editAvailability from "./components/Availability.vue";
import Availability from "./components/AvailabilityView.vue";
import RequestView from "./components/Request.vue";
import RequestApproval from "./components/ApproveRequest.vue";

import store from "./store.js";

const routes = [
  {
    path: "/",
    component: Home,
    meta: { isLoggedin: true, isRegistered: true, isHome: true },
  },
  {
    path: "/login",
    component: Login,
    meta: { isLoggedin: false },
  },
  {
    path: "/signup",
    component: Signup,
    meta: { isLoggedin: false },
  },
  {
    path: "/account",
    component: NewEmployee,
    meta: { isLoggedin: false},
  },
  {
    path: "/newStore",
    component: NewStore,
    meta: { isLoggedin: true, isRegistered: true },
  },
  {
    path: "/roster",
    component: ViewRoster,
    meta: { isLoggedin: true, isRegistered: true },
  },

  {
    path: "/available",
    component: Availability,
    meta: { isLoggedin: true, isRegistered: true },
  },
  {
    path: "/editAvailability",
    component: editAvailability,
    meta: { isLoggedin: true, isRegistered: true },
  },
  {
    path: "/request",
    component: RequestView,
    meta: { isLoggedin: true, isRegistered: true },
  },

  {
    path: "/approve",
    component: RequestApproval,
    meta: { isLoggedin: true, isManager: true, isRegistered: true },
  },
  {
    path: "/list",
    component: ListEmployee,
    meta: { isLoggedin: true, isManager: true, isRegistered: true },
  },
  {
    path: "/create",
    component: CreateRoster,
    meta: { isLoggedin: true, isManager: true, isRegistered: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isLoggedin)) {
    if (to.meta.isLoggedin && !store.state.isLoggedin) {
      next({
        name: "login",
      });
    } else if (to.meta.isManager && !store.state.isManager) {
      alert("Unauthorized Access");
    } else if(to.meta.isRegistered && !store.state.isRegistered){
      alert("Please complete the user registration.")
      next('/account');
    }  
    else {
      next();
    }
  } else {
    next();
  }
});

export default router;
