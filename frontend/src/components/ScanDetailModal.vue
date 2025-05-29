<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="$emit('close')">x</button>
        <ScanResultWindow :scan="scan" />
        <div class="export-controls">
          <button @click="exportJson">Export JSON</button>
          <button @click="exportCsv">Export CSV</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import ScanResultWindow from "./ScanResultWindow.vue";
import type { ScanResult } from "./ScanResultWindow.vue";

const { scan } = defineProps<{ scan: ScanResult }>();
defineEmits<{
  (e: "close"): void;
}>();

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportJson() {
  const json = JSON.stringify(scan, null, 2);
  download(
    new Blob([json], { type: "application/json" }),
    `scan-${scan.id}.json`
  );
}

function exportCsv() {
  type K = keyof ScanResult;
  const headers = Object.keys(scan) as K[];
  const row = headers
    .map((h) => JSON.stringify((scan as ScanResult)[h] ?? ""))
    .join(",");
  const csv = [headers.join(","), row].join("\n");
  download(new Blob([csv], { type: "text/csv" }), `scan-${scan.id}.csv`);
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90vw;
  max-width: 600px;
  max-height: 90vh;
  max-height: 800px;
  overflow: auto;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
  cursor: pointer;
}
.modal-close:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}
.modal-close:focus {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
.export-controls {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
</style>
