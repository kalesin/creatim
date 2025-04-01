<script setup lang="ts">
import { ref } from 'vue';
import type { Person } from '@/stores/types';

interface Props {
  person: Person;
}

const props = defineProps<Props>();
const emit = defineEmits(['save']);

const isEditing = ref(false);
const editedPerson = ref({...props.person});

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

const handleSave = () => {
  emit('save', editedPerson.value);
  isEditing.value = false;
};

const handleCancel = () => {
  editedPerson.value = {...props.person};
  isEditing.value = false;
};
</script>

<template>
  <div
    class="flex-grow h-full bg-primary rounded-xl flex flex-col justify-end items-center z-2 bg-cover bg-center relative"
    :style="{ backgroundImage: `url('${props.person.image}')` }"
  >
    <!-- Display Mode -->
    <div v-if="!isEditing" class="w-full h-1/3 flex flex-col justify-start text-secondary px-4">
      <div v-for="(value, key) in fieldNames" class="flex">
        <div class="mr-2 card-text">{{ value }}:</div>
        <div class="capitalize card-text-bolded">
          {{ props.person[key] }}
        </div>
      </div>
    </div>

    <!-- Edit Form -->
    <div v-else class="h-full bg-primary bg-opacity-50 flex flex-col justify-between rounded-xl p-4 flex-grow">
      <div class="flex-grow overflow-y-auto">
        <div v-for="(value, key) in fieldNames" class="flex items-center mb-2">
          <label class="mr-2 card-text w-1/3">{{ value }}:</label>
          <input
            v-model="editedPerson[key]"
            class="capitalize card-text-bolded bg-secondary bg-opacity-20 text-primary rounded p-1 w-2/3"
          />
        </div>
      </div>
      
      <div class="flex justify-center items-center flex-col gap-4">
        <button
          @click="handleSave"
          class="button-text bg-green-600 w-[120px] h-[40px] rounded-lg text-primary flex justify-center items-center"
        >
          Save
        </button>
        <button
          @click="handleCancel"
          class="button-text bg-red-600 w-[120px] h-[40px] rounded-lg text-primary flex justify-center items-center"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Edit Button (only shown in display mode) -->
    <button
      v-if="!isEditing"
      @click="isEditing = true"
      class="button-text bg-accent w-[120px] h-[40px] rounded-lg text-primary my-8 flex justify-center items-center"
    >
      Edit
    </button>
  </div>
</template>