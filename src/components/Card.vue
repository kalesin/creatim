<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Person } from '@/stores/types';
import { deepClone } from '@/utils/helpers';

interface Props {
  person: Person;
  position: 'left' | 'middle' | 'right';
}

const fieldNames = {
  name: 'Name',
  height: 'Height',
  mass: 'Mass',
  hair_color: 'Hair color',
  skin_color: 'Skin color',
  eye_color: 'Eye color',
  birth_year: 'Birth year',
  gender: 'Gender',
};

// Reset the form with fresh data from props
const resetForm = () => {
  editedPerson.value = deepClone(props.person);
};

const props = defineProps<Props>();
const emit = defineEmits(['save', 'switch']);

const isEditing = ref(false);
const editedPerson = ref<Person>(deepClone(props.person));

const handleSave = () => {
  emit('save', editedPerson.value);
  isEditing.value = false;
};

const handleCancel = () => {
  resetForm();
  isEditing.value = false;
};

const openCharacterSwitcher = () => {
  emit('switch', props.position);
};

// Watch for changes in props.person and reset the form if needed
watch(
  () => props.person,
  () => {
    if (!isEditing.value) {
      resetForm();
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="flex-grow h-full rounded-xl overflow-hidden">
    <div
      v-if="!isEditing"
      class="w-full h-full flex flex-col justify-end items-center relative bg-cover bg-center"
      :style="{ backgroundImage: `url('${props.person.image}')` }"
    >
      <!-- Switch Button -->
      <button
        @click="openCharacterSwitcher"
        class="absolute top-2 right-2 p-4 flex justify-center items-center rounded-full bg-gray-800/80 hover:bg-gray-700/90"
      >
        <span class="material-symbols-outlined text-white"> sync </span>
      </button>

      <!-- Display Mode -->
      <div
        class="w-full h-1/3 flex flex-col justify-center text-secondary px-4 bg-primary/50"
      >
        <div v-for="(value, key) in fieldNames" class="flex">
          <div class="mr-2 card-text">{{ value }}:</div>
          <div class="capitalize card-text-bolded">
            {{ props.person[key] }}
          </div>
        </div>
      </div>

      <!-- Edit Button (only shown in display mode) -->
      <button
        v-if="!isEditing"
        @click="isEditing = true"
        class="button-text bg-accent hover:bg-yellow-200 w-[120px] h-[40px] rounded-lg text-primary my-8 flex justify-center items-center"
      >
        Edit
      </button>
    </div>

    <!-- Edit Form -->
    <div
      v-else
      class="w-full h-full flex flex-col justify-between bg-primary isolate p-4"
    >
      <div class="w-full overflow-y-auto">
        <div
          v-for="(value, key) in fieldNames"
          class="w-full flex flex-col mb-2"
        >
          <label class="mb-1 card-text">{{ value }}:</label>
          <input
            v-model="editedPerson[key]"
            class="w-full capitalize card-text bg-secondary bg-opacity-20 text-primary rounded p-1"
          />
        </div>
      </div>

      <div class="flex justify-center gap-4">
        <button
          @click="handleSave"
          class="button-text bg-green-600 hover:bg-green-400 w-[100px] h-[40px] rounded-lg text-primary flex justify-center items-center"
        >
          Save
        </button>
        <button
          @click="handleCancel"
          class="button-text bg-red-600 hover:bg-red-400 w-[100px] h-[40px] rounded-lg text-primary flex justify-center items-center"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
