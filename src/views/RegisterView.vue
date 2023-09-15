<template>
  <div class="max-w-screen-sm mx-auto py-10 px-4">
    <BaseAlert v-if="errorMsg" messageType="danger" class="mb-10">
      {{ errorMsg }}
    </BaseAlert>
    <BaseAlert v-if="successMsg" messageType="success" class="mb-10">
      {{ successMsg }}
    </BaseAlert>
    <div class="p-8 flex flex-col bg-c-light-green bg-opacity-10 rounded-md">
      <form @submit.prevent="register">
        <h1 class="text-3xl text-gray-800 mb-4">Register</h1>
        <div class="flex flex-col mb-3">
          <label for="email" class="mb-1 text-sm text-gray-800">Email</label>
          <input 
            type="email"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="email"
            v-model="email"
          />
        </div>
        <div class="flex flex-col mb-3">
          <label for="password" class="mb-1 text-sm text-gray-800">Password</label>
          <input 
            type="password"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="password"
            v-model="password"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label for="confirmPassword" class="mb-1 text-sm text-gray-800">Confirm Password</label>
          <input 
            type="password"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="confirmPassword"
            v-model="confirmPassword"
          />
        </div>
        <BaseButton :loading="loading">Register</BaseButton>
  
        <p class="text-sm text-center text-gray-800 mt-6">
          Already have an account? 
          <router-link class="text-c-green" :to="{ name:'login' }">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { supabase } from './../lib/supabaseClient';
import { ref } from "vue";
import BaseButton from '../components/BaseButton.vue';

// Create data / vars
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);
const loading = ref(false);

// Register function
const register = async () => {
  if(password.value === confirmPassword.value) {
    loading.value = true;
    try {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      });
      loading.value = false;
      if(error) throw error;
      successMsg.value = 'A verification link has been sent to your email';
      setTimeout(() => {
        successMsg.value = null;
      }, 5000);
    }
    catch(error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }

  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
};
</script>
