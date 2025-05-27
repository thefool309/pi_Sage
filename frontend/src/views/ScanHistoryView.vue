<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ScanDetailModal from "@/components/ScanDetailModal.vue";
import type { ScanResult } from "@/components/ScanResultWindow.vue";

import ScanCard from "@/components/ScanCard.vue";

const scans = ref<ScanResult[]>([]);
const selectedScan = ref<ScanResult | null>(null);
const isModalOpen = ref(false);
function openModal(scan: ScanResult) {
  console.log("Open Modal function hit");
  //console.log(JSON.stringify(scan));
  selectedScan.value = scan;
  isModalOpen.value = true;
}
function closeModal() {
  isModalOpen.value = false;
  selectedScan.value = null;
}
onMounted(async () => {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_APP_LOCAL_NETWORK}:${import.meta.env.VITE_APP_PORT}/data`
    );
    scans.value = response.data;
  } catch (err) {
    console.error("Failed to fetch scan history!", err);
  }
});
</script>
<template>
  <ScanDetailModal
    v-if="isModalOpen && selectedScan"
    :scan="selectedScan"
    @close="closeModal"
  />
  <div v-if="scans?.length" class="card-list">
    <h1>Scan History</h1>
    <ScanCard
      v-for="scan in scans.slice(0, 10)"
      :key="scan.id"
      :scan="scan"
      @select="openModal"
    />
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
h1 {
  grid-column: 1 / -1;
  text-align: center;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>
