<template>
  <div class="container">
    <h1>Nmap Scan Results</h1>

    <pre class="scan-output">{{ scanData }}</pre>

    <div class="button-group">
      <div class="refresh-div" @click="startPolling" :class="{ disabled: isPolling }">
        {{ isPolling ? "Polling..." : "Start Scan Polling" }}
      </div>
      <div class="stop-div" @click="stopPolling" :class="{ disabled: !isPolling }">
        Stop Polling
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import axios from 'axios';

const scanData = ref('Waiting for scan...\n');
const isPolling = ref(false);
let pollingInterval: number | null = null;

const fetchScanData = async () => {
  try {
    const response = await axios.get(
      `http://${import.meta.env.VITE_APP_LOCAL_NETWORK}:${import.meta.env.VITE_APP_PORT}/scan`
    );
    scanData.value = response.data;
  } catch (error) {
    console.error("Error fetching scan: ", error);
    scanData.value = "Error fetching scan data. Check logs.";
  }
};

const startPolling = () => {
  if (!isPolling.value) {
    isPolling.value = true;
    fetchScanData(); // Run once immediately
    pollingInterval = window.setInterval(fetchScanData, 5000);
  }
};

const stopPolling = () => {
  if (pollingInterval !== null) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    isPolling.value = false;
  }
};

onUnmounted(() => {
  stopPolling();
});
</script>

<style lang="css" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

h1 {
  text-align: center;
  color: --color-text;
  margin-bottom: 20px;
}

.scan-output {
  background: #000000;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  white-space: pre-wrap;
  font-size: 14px;
  font-family: monospace;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.refresh-div,
.stop-div {
  cursor: pointer;
  background-color: hsla(150, 40%, 70%, 1);
  color: #333333;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.refresh-div:hover,
.stop-div:hover {
  background-color: #abe4fa;
}

.disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>