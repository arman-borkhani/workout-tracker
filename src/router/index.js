import { createRouter, createWebHistory } from 'vue-router';
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
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: "Register",
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: "Login",
      },
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: {
        title: "Create",
      },
    },
    {
      path: "/workout/:workoutId",
      name: "workout",
      component: SingleView,
      meta: {
        title: "Workout",
      },
    },
  ]
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Workout Tracker`;
  next();
});

export default router;
