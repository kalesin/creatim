<script setup lang="ts">
import type { Person } from '@/stores/types';

interface Props {
  person: Person
}

const props = defineProps<Props>()

const fieldNames = {
    "name": "Name",
    "height": "Height",
    "mass": "Mass",
    "hair_color": "Hair color",
    "skin_color": "Skin color",
    "eye_color": "Eye color",
    "birth_year": "Birth year",
    "gender": "Gender",
}

console.log(props.person)

</script>

<template>
    <div class="flex-grow h-full bg-primary rounded-xl flex flex-col justify-end items-center z-2">
        <div class="w-full h-1/3 flex flex-col justify-start text-secondary px-8">
            <div v-for="(value, key) in fieldNames" class="flex">
                <div class="mr-2 card-text">
                    {{ value }}:
                </div>
                <div class="capitalize card-text-bolded">
                    {{ props.person[key] }}
                </div>
            </div>
        </div>
        <button class="edit-button bg-accent w-[120px] h-[40px] rounded-lg text-primary my-8 flex justify-center items-center">
            Edit
        </button>
    </div>
</template>