<script setup lang="ts">
import type { Person } from '@/stores/types';
import { ref, computed } from 'vue';

interface Props {
  people: Person[];
  show: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['select', 'close']);
const searchQuery = ref('');

const filteredPeople = computed(() => {
  return props.people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSelect = (person: Person) => {
  emit('select', person);
};

const handleClose = () => {
  searchQuery.value = '';
  emit('close');
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50"
    @click.self="handleClose"
  >
    <div class="modal-header">
      <div class="flex mb-4">
        <input
          v-model="searchQuery"
          placeholder="Search people..."
          class="bg-black p-2 mr-2"
          autofocus
        />
        <button @click="handleClose" class="flex items-center">
          <span class="material-symbols-outlined text-xl text-white">
            close
          </span>
        </button>
      </div>
    </div>

    <div class="modal-content w-1/2 h-1/2 overflow-y-auto">
      <div class="grid grid-cols-4 gap-4 overflow-y-auto flex-grow">
        <div
          v-for="person in filteredPeople"
          :key="person.id"
          @click="handleSelect(person)"
          class="flex flex-col items-center cursor-pointer hover:bg-yellow-600 p-2 rounded transition-colors"
        >
          <img
            :src="person.image"
            :alt="person.name"
            class="w-16 h-16 object-cover rounded-full mb-2"
          />
          <span class="text-sm text-center truncate w-full">
            {{ person.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
