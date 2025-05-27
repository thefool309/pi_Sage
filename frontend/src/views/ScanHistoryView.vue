<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const scans = ref<ScanResult[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_APP_LOCAL_NETWORK}:${import.meta.env.VITE_APP_PORT}/data`
    );
    scans.value = response.data;
  } catch (err) {
    console.error("Failed to fetch scan history!", err.message);
  }
});
</script>
<template>
  <div v-if="scans?.length" class="card-list">
    <h1>Scan History</h1>
    <ScanCard v-for="scan in scans" :key="scan.id" :scan="scan" />
  </div>
  <p v-else>Couldn't load scan history</p>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>
