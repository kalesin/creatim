<script setup lang="ts">
import Card from './Card.vue';
import { usePeopleStore } from '@/stores/people';
import { storeToRefs } from 'pinia';
import LoadingSpinner from './LoadingSpinner.vue';
import type { Person } from '@/stores/types';

const peopleStore = usePeopleStore();
const { displayedPeople, isLoading } = storeToRefs(peopleStore);

const handleSave = (updatedPerson: Person) => {
  // Update the person in the store
  peopleStore.updatePerson(updatedPerson);
};
</script>

<template>
  <div class="w-full flex flex-grow justify-center items-center">
    <LoadingSpinner v-if="isLoading"/>
    <div v-else class="relative w-2/3 h-2/3 flex justify-center items-center">
      <!-- Glow effect (centered behind cards) -->
      <div class="absolute w-1/3 h-0 card-list-shadow"></div>

      <!-- Cards -->
      <Card
        class="w-1/3"
        :person="displayedPeople.left"
        @save="handleSave"
      />
      <Card
        class="w-1/3 mx-8"
        :person="displayedPeople.middle"
        @save="handleSave"
      />
      <Card
        class="w-1/3"
        :person="displayedPeople.right"
        @save="handleSave"
      />
    </div>
  </div>
</template>