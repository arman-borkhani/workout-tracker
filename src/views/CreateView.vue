<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <BaseAlert v-if="errorMsg" messageType="danger" class="mb-10">
      {{ errorMsg }}
    </BaseAlert>
    <BaseAlert v-if="successMsg" messageType="success" class="mb-10">
      {{ successMsg }}
    </BaseAlert>

    <div class="p-8 flex items-start bg-c-light-green bg-opacity-10 rounded-md">
      <form @submit.prevent="createWorkout" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-2xl text-gray-800">Recode Workout</h1>

        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-gray-800">Workout Name</label>
          <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="workout-name" v-model="workoutName">
        </div>

        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-gray-800">Workout Type</label>
          <select id="workout-type" required class="h-11 p-2 text-gray-500 bg-white focus:outline-none" v-model="workoutType" @change="workoutChange">
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div 
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in exercises"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="strength-exercise" class="mb-1 text-sm text-gray-800">Exercise</label>
              <input id="strength-exercise" type="text" required class="p-2 text-gray-500 focus:outline-none w-full" v-model="item.exercise">
            </div>

            <div class="flex flex-col flex-1">
              <label for="strength-sets" class="mb-1 text-sm text-gray-800">Sets</label>
              <input id="strength-sets" type="text" required class="p-2 text-gray-500 focus:outline-none w-full" v-model="item.sets">
            </div>

            <div class="flex flex-col flex-1">
              <label for="strength-reps" class="mb-1 text-sm text-gray-800">Reps</label>
              <input id="strength-reps" type="text" required class="p-2 text-gray-500 focus:outline-none w-full" v-model="item.reps">
            </div>

            <div class="flex flex-col flex-1">
              <label for="strength-weight" class="mb-1 text-sm text-gray-800">Weight (Kg)</label>
              <input id="strength-weight" type="text" required class="p-2 text-gray-500 focus:outline-none w-full" v-model="item.weight">
            </div>
            <IconBin @click="deleteExercise(item.id)" class="text-c-green absolute -left-6 top-0 cursor-pointer" width="20" height="20"></IconBin>
          </div>
          <BaseButton type="button" @click="addExercise" class="mt-6">Add Exercise</BaseButton>
        </div>

        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div 
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in exercises"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-gray-800">Type</label>
              <select id="cardio-type" class="h-10 p-2 w-full text-gray-500 bg-white focus:outline-none" v-model="item.cardioType">
                <option value="#">Select Type</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
            </div>

            <div class="flex flex-col flex-1">
              <label for="cardio-distance" class="mb-1 text-sm text-gray-800">Distance (km)</label>
              <input id="cardio-distance" type="text" required class="p-2 text-gray-500 focus:outline-none w-full" v-model="item.distance">
            </div>

            <div class="flex flex-col flex-1">
              <label for="cardio-duration" class="mb-1 text-sm text-gray-800">Duration (h)</label>
              <input id="cardio-duration" type="text" required class="p-2 text-gray-500 focus:outline-none w-full" v-model="item.duration">
            </div>

            <div class="flex flex-col flex-1">
              <label for="cardio-pace" class="mb-1 text-sm text-gray-800">Pace (km/h)</label>
              <input id="cardio-pace" type="text" required class="p-2 text-gray-500 focus:outline-none w-full" v-model="item.pace">
            </div>
            <IconBin @click="deleteExercise(item.id)" class="text-c-green absolute -left-6 top-0 cursor-pointer" width="20" height="20"></IconBin>
          </div>
          <BaseButton type="button" @click="addExercise" class="mt-6">Add Exercise</BaseButton>
        </div>
        <BaseButton :loading="loading" type="submit" class="mt-6">Record Workout</BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../components/BaseButton.vue';
import IconBin from '../components/icons/IconBin.vue';
import { supabase } from '../lib/supabaseClient';
import { ref } from 'vue';
import { uid } from 'uid';

// Create data
const workoutName = ref('');
const workoutType = ref('select-workout');
const exercises = ref([]);
const successMsg = ref(null);
const errorMsg = ref(null);
const loading = ref(false);

// Add exercise
const addExercise = () => {
  if(workoutType.value === 'strength') {
    exercises.value.push({
      id: uid(),
      exercise: '',
      sets: '',
      reps: '',
      weight: '',
    });
    return;
  }

  exercises.value.push({
    id: uid(),
    cardioType: '',
    distance: '',
    duration: '',
    pace: '',
  });
}

// Delete exercise
const deleteExercise = (id) => {
  if(exercises.value.length > 1) {
    exercises.value = exercises.value.filter(exercise => exercise.id !== id);
    return;
  }
  errorMsg.value =  'Cannot remove, need to at least have one exercise';
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}

// Listens for chaging of workout type input
const workoutChange = () => {
  exercises.value = [];
  addExercise();
}

// Create workout
const createWorkout = async () => {
  loading.value = true;
  try {
    const { error } = await supabase.from('workouts').insert([
      {
        workoutName: workoutName.value,
        workoutType: workoutType.value,
        exercises: exercises.value,
      },
    ]);
    if(error) throw error;
    loading.value = false;
    successMsg.value = 'Success, Workout Created!';
    workoutName.value = null;
    workoutType.value = 'select-workout';
    exercises.value = [];
    setTimeout(() => {
      successMsg.value = null;
    }, 5000);
  }
  catch(error) {
    errorMsg.value = error.messageg;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
</script>
