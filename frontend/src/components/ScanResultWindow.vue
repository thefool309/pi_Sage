<script lang="ts">
export interface Port {
  id: number;
  portNumber: number;
  protocol: string;
  state: string;
  service_name?: string;
}
export interface Host {
  id: number;
  addr: string;
  status: string;
  ports: Port[];
}
export interface ScanResult {
  id: number;
  date: string;
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
  <div class="greetings">
    <h2>Hosts Scanned {{ scan.hosts.length }}</h2>
    <h3>Hosts with "up" status</h3>
    <ul>
      <li
        v-for="host in scan.hosts.filter((h) => h.status === 'up')"
        :key="host.id"
      >
        <strong>{{ host.addr }} => {{ host.status }}</strong>
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

.greetings pre,
.greetings h3 {
  text-align: left;
}

@media (min-width: 1024px) {
  .greetings pre,
  .greetings h3 {
    text-align: left;
  }
}
</style>
