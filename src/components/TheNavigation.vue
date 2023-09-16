<template>
  <header class="bg-c-green text-white">
    <div class="container">
      <nav class="py-5 px-4 flex flex-col gap-4 items-center sm:flex-row sm:justify-between">
        <div class="flex items-center gap-x-4">
          <IconDumbbell width="56" height="56"></IconDumbbell>
          <h1 class="text-lg">Workout Tracker</h1>
        </div>
        <ul class="flex gap-x-5">
          <router-link class="cursor-pointer p-2" :to="{ name: 'home' }">Home</router-link>
          <router-link class="cursor-pointer p-2" :to="{ name: '' }">Create</router-link>
          <router-link class="cursor-pointer p-2" :to="{ name: 'login' }">Login</router-link>
          <li class="cursor-pointer p-2" @click="logout">Logout</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import IconDumbbell from './icons/IconDumbbell.vue';
import { supabase } from "../lib/supabaseClient";
import { useRouter } from 'vue-router';

// Setup ref to router
const router = useRouter();

// Logout function
const logout = async () => {
  await supabase.auth.signOut();
  router.push({ name: 'home' });
};
</script>
