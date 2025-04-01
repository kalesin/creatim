<script setup lang="ts">
import Card from './Card.vue';
import PersonSwitcherModal from './PersonSwitcherModal.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import { storeToRefs } from 'pinia';
import { usePeopleStore } from '@/stores/people';
import type { Person } from '@/stores/types';
import { ref } from 'vue';

const peopleStore = usePeopleStore();
const { displayedPeople, isLoading, people } = storeToRefs(peopleStore);

const handleSave = (updatedPerson: Person) => {
  // Update the person in the store
  peopleStore.updatePerson(updatedPerson);
};

const showSwitcher = ref(false);
const currentCardPosition = ref<'left'|'middle'|'right'|null>(null);

const openSwitcher = (position: 'left'|'middle'|'right') => {
  currentCardPosition.value = position;
  showSwitcher.value = true;
};

const handlePersonSelect = (person: Person) => {
  if (!currentCardPosition.value) {
    return;
  }

  peopleStore.setDisplayedPerson(currentCardPosition.value, person);
  showSwitcher.value = false;
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
        position="left"
        @save="handleSave"
        @switch="openSwitcher"
      />
      <Card
        class="w-1/3 mx-8"
        :person="displayedPeople.middle"
        position="middle"
        @save="handleSave"
        @switch="openSwitcher"
      />
      <Card
        class="w-1/3"
        :person="displayedPeople.right"
        position="right"
        @save="handleSave"
        @switch="openSwitcher"
      />
    </div>
  </div>

  <PersonSwitcherModal
    :people="people"
    :show="showSwitcher"
    @select="handlePersonSelect"
    @close="showSwitcher = false"
  />
</template>