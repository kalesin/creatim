<script setup lang="ts">
import CardList from '@/components/CardList.vue';
import Navbar from '@/components/Navbar.vue';
import { usePeopleStore } from '@/stores/people';
import { onMounted } from 'vue';

const peopleStore = usePeopleStore();

onMounted(async () => {
  await peopleStore.fetchAllPages();
});
</script>

<template>
  <div class="w-full h-full flex justify-start items-center flex-col">
    <Navbar />
    <CardList />
  </div>
</template>
