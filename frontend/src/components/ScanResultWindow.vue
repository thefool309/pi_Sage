<script lang="ts">
export interface Port {
  id: number;
  portNumber: number;
  protocol: string;
  state: string;
  service_name?: string;
  reason?: string;
  reason_ttl?: number;
  service_product?: string;
  service_version?: string;
}
export interface Host {
  id: number;
  addr: string;
  status: string;
  mac_addr?: string;
  vendor?: string;
  reason?: string;
  reason_ttl?: number;
  ports: Port[];
}
export interface ScanResult {
  id: number;
  date: string;
  host_up: number;
  host_down: number;
  hosts: Host[];
}
</script>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  scan: ScanResult;
}>();
</script>

<template>
  <div class="terminal">
    <h2>Scan #{{ scan.id }} @ {{ new Date(scan.date).toLocaleString() }}</h2>
    <h2>Hosts Scanned {{ scan.hosts.length }}</h2>
    <h3>Hosts with "up" status: {{ scan.host_up }}</h3>
    <ul>
      <li
        v-for="host in scan.hosts.filter((h) => h.status === 'up')"
        :key="host.id"
      >
        <strong>Local IP Address: {{ host.addr }} </strong>
        <p>Status: {{ host.status }}</p>
        <p v-if="host.mac_addr">MAC Address: {{ host.mac_addr }}</p>
        <p v-if="host.vendor">Vendor: {{ host.vendor }}</p>
        <p v-if="host.reason">Reason: {{ host.reason }}</p>
        <ul v-if="host.ports.filter((p) => p.state === 'open').length > 0">
          <li
            v-for="port in host.ports.filter((p) => p.state === 'open')"
            :key="port.id"
          >
            Port {{ port.portNumber }}/{{ port.protocol }} - {{ port.state }}
          </li>
        </ul>
        <p v-else>No open ports to display!</p>
      </li>
    </ul>
    <h3>Number of Hosts with "down" status: {{ scan.host_down }}</h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.terminal h1,
.terminal h3 {
  text-align: left;
}

@media (min-width: 1024px) {
  .terminal h1,
  .terminal h3 {
    text-align: left;
  }
}
</style>
