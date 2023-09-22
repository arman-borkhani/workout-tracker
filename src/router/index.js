import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import CreateView from '../views/CreateView.vue';
import SingleView from '../views/SingleView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home",
        auth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: "Register",
        auth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: "Login",
        auth: false,
      },
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: {
        title: "Create",
        auth: true,
      },
    },
    {
      path: "/workout/:workoutId",
      name: "workout",
      component: SingleView,
      meta: {
        title: "Workout",
        auth: false,
      },
    },
  ]
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Workout Tracker`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = store.state.currentUser;
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "login" });
    return;
  }
  next();
});

export default router;
