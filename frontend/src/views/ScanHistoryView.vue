<script lang="ts"></script>
<script setup lang="ts">
const scans = ref();

onMounted(() => {
  try {
    scans.value = await axios.get(
      `http://${import.meta.env.VITE_APP_LOCAL_NETWORK}:${import.meta.env.VITE_APP_PORT}/data`
    );
  } catch (err) {
    console.error("Failed to fetch scan history!", err.message);
  }
});
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
