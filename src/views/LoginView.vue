<template>
  <div class="max-w-screen-sm mx-auto py-10 px-4">
    <BaseAlert v-if="errorMsg" messageType="danger" class="mb-10">
      {{ errorMsg }}
    </BaseAlert>
    <div class="p-8 flex flex-col bg-c-light-green bg-opacity-10 rounded-md">
      <form @submit.prevent="login">
        <h1 class="text-3xl text-gray-800 mb-4">Login</h1>
        <div class="flex flex-col mb-3">
          <label for="email" class="mb-1 text-sm text-gray-800">Email</label>
          <input 
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="email"
            v-model="email"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label for="email" class="mb-1 text-sm text-gray-800">Password</label>
          <input 
            type="password"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="password"
            v-model="password"
          />
        </div>
        <BaseButton :loading="loading">Login</BaseButton>
  
        <p class="text-sm text-center text-gray-800 mt-6">
          Don't have an account?
          <router-link class="text-c-green" :to="{ name:'register' }">Register</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";
import { ref } from "vue";

// Create data / vars
const router = useRouter();
const email = ref(null);
const password = ref(null);
const errorMsg = ref(null);
const loading = ref(false);

// Login function
const login = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
    loading.value = false;
    if(error) throw error;
    router.push({ name: 'home' });
  }
  catch(error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>
