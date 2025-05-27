<script setup lang="ts">
import { ScanResult } from "./ScanResultWindow";
const { scan } = defineProps<{ scan: ScanResult }>();
onMounted(() => {});
</script>

<template>
  <div class="card">
    <h2 class="scan-id">Scan # {{ scan.id }}</h2>
    <div class="scan-stats">
      <p class="stat up">Hosts Up: {{ scan.host_up }}</p>
      <p class="stat down">Hosts Down: {{ scan.host_down }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition:
    transform 0,
    2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.card h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: --color-text;
}

.card p {
  font-size: 0.95rem;
  color: --color-text;
  margin: 0.25rem;
}
.scan-id {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #f0f0f0;
}
.scan-stats {
  display: flex;
  justify-content: space-between;
}
.stat {
  margin: 0;
  font-size: 0.95rem;
  color: #ccc;
}
.stat.up {
  color: #4caf50;
}
.stat.down {
  color: #f44336;
}
</style>
