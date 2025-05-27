<template>
  <div class="container">
    <h1>Nmap Scan Results</h1>
    <div class="scan-output">
      <ScanResultWindow v-if="scanData" :scan="scanData" />
      <div v-else-if="errorMsg" class="error">{{ errorMsg }}</div>
      <div v-else class="loading">Waiting for scan…</div>
    </div>
    <div class="button-group">
      <div
        class="refresh-div"
        @click="startPolling"
        :class="{ disabled: isPolling }"
      >
        {{ isPolling ? "Polling..." : "Start Scan Polling" }}
      </div>
      <div
        class="stop-div"
        @click="stopPolling"
        :class="{ disabled: !isPolling }"
      >
        Stop Polling
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import axios from "axios";
import ScanResultWindow from "./ScanResultWindow.vue";
import type { ScanResult } from "./ScanResultWindow.vue";
const scanData = ref<ScanResult | null>(null);
const errorMsg = ref<string | null>(null);
const isPolling = ref(false);
let pollingInterval: number | null = null;

const fetchScanData = async () => {
  errorMsg.value = null;
  try {
    await axios.post(
      `http://${import.meta.env.VITE_APP_LOCAL_NETWORK}:${import.meta.env.VITE_APP_PORT}/scan`
    );
    const { data } = await axios.get(
      `http://${import.meta.env.VITE_APP_LOCAL_NETWORK}:${import.meta.env.VITE_APP_PORT}/data/latest`
    );

    scanData.value = data;
  } catch (error) {
    console.error("Error running scan: ", error);
    if (error instanceof Error) {
      errorMsg.value = error.message;
    } else {
      errorMsg.value = String(error);
    }
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

onMounted(() => {});

onUnmounted(() => {
  stopPolling();
});
</script>

<style lang="css" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

h1 {
  text-align: center;
  color: var(--color-text);
  margin-bottom: 20px;
}

.scan-output {
  background: #1e1e1e;
  color: #00ff00;
  border: 1px solid #333;
  padding: 1rem 1rem 1.2rem;
  border-radius: 5px;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.7);
  white-space: pre-wrap;
  font-size: 14px;
  font-family: "Courier New", monospace;
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

.loading,
.error {
  font-style: italic;
  text-align: center;
  padding: 1rem 0;
}

.error {
  color: #ff5555;
}
</style>
