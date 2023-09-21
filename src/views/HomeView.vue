<template>
  <div class="container mt-10 px-4">
    <template v-if="loading">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="h-[276px] bg-gray-100 animate-pulse"></div>
      </div>
    </template>

    <template v-else>
      <!-- No Data -->
      <div v-if="data.length === 0" class="w-full flex flex-col items-center py-32">
        <h1 class="text-2xl mb-4 text-gray-800">Looks empty here...</h1>
        <BaseButton>
          <RouterLink :to="{ name: 'create' }">Create Workout</RouterLink>
        </BaseButton>
      </div>
  
      <!-- Data -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <article 
          class="flex flex-col items-center bg-c-light-green bg-opacity-10 p-8 cursor-pointer relative"
          v-for="(workout, index) in data"
          :key="index" 
        >
          <router-link
            class="absolute inset-0"
            :to="{ name: 'workout', params: { workoutId: workout.id } }"
          ></router-link>
  
          <!-- Cardio Icon -->
    
          <IconRun v-if="workout.workoutType === 'cardio'" class="w-24 h-24 text-c-green"></IconRun>
  
          <!-- Strength Training Icon -->
  
          <IconDumbbell v-else class="w-24 h-24 text-c-green"></IconDumbbell>
  
          <p class="mt-6 py-1 px-3 font-medium text-xs text-white bg-c-green rounded-lg">
            {{ workout.workoutType }}
          </p>
  
          <h3 class="mt-8 mb-2 text-center text-xl text-gray-800">
            {{ workout.workoutName }}
          </h3>
        </article>
      </div>
    </template>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';
import IconDumbbell from '../components/icons/IconDumbbell.vue';
import IconRun from '../components/icons/IconRun.vue';
import BaseButton from '../components/BaseButton.vue';

// Create data / vars
const data = ref([]);
const loading = ref(true);

// Get data
const getData = async () => {
  try {
    const { data: workouts, error } = await supabase.from('workouts').select();
    if (error) throw error;
    loading.value = false;
    data.value = workouts;
  } catch (error) {
    console.warn(error.message);
  }
};

// Run data function
getData();
</script>
