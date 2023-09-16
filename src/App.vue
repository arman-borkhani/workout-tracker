<script setup>
import { RouterView } from 'vue-router';
import TheNavigation from './components/TheNavigation.vue';
import { supabase } from './lib/supabaseClient';
import store from './store/index';

// Runs when there is a auth state change
// if user is logged in, this will fire
supabase.auth.onAuthStateChange((_,session) => {
  store.methods.setUser(session);
});
</script>

<template>
  <TheNavigation></TheNavigation>
  <RouterView />
</template>
