

<template>
<h1>Nmap Scan Results</h1>
<pre>{{ scanData }}</pre>
<button @click="fetchScanData">RefreshScan now </button>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import axios from 'axios';

  const scanData = ref('Loading scan data...\n This may take a moment.\n')
  let pollingInterval: number;

  const fetchScanData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/scan`
      );
      scanData.value = response.data;
    }catch (error){
      console.error("Error fetching scan: ", error);
      scanData.value = "Error fetching scan data. Check logs."
    }
  }

  onMounted(() =>{
    fetchScanData(); // initial fetch
    pollingInterval = window.setInterval(fetchScanData, 5000);
  })

  onUnmounted(() => {
    clearInterval(pollingInterval);
  })


</script>

<style lang="css" scoped>

</style>
