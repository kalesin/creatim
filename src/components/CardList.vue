<script setup lang="ts">
import Card from './Card.vue';

import { usePeopleStore } from '@/stores/people';
import { storeToRefs } from 'pinia'

const peopleStore = usePeopleStore();

const { displayedPeople } = storeToRefs(peopleStore);

</script>

<template>
  <div class="w-full flex flex-grow justify-center items-center">
    <div class="relative w-2/3 h-2/3 flex justify-center items-center">
      <!-- Glow effect (centered behind cards) -->
      <div class="absolute w-1/3 h-0 card-list-shadow"></div>

      <!-- Cards -->
      <Card
        v-for="(person, index) of displayedPeople"
        :key="index"
        class="w-1/3"
        :class="{
          'ml-8': index != 0,
        }"
        :person="person"
      />
    </div>
  </div>
</template>
