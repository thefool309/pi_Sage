

<template>
  <div class="container">
    <h1>Nmap Scan Results</h1>
    <pre class="scan-output">{{ scanData }}</pre>
    <div class="refresh-div" @click="fetchScanData">Refresh Scan Now</div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import axios from 'axios';

  const scanData = ref('Loading scan data...\n This may take a moment.\n')
  let pollingInterval: number;

  const fetchScanData = async () => {       
    console.log("fetch scan data hit");
    try {
      const response = await axios.get(       //await on axios to get the response from localhost so we can display it to the dashboard
        `http://${ import.meta.env.VITE_APP_LOCAL_NETWORK }:${ import.meta.env.VITE_APP_PORT }/scan`
      );
      scanData.value = response.data;
    }catch (error){
      console.error("Error fetching scan: ", error);
      scanData.value = "Error fetching scan data. Check logs."    //if we have an error fetching the scan direct user to logs for debugging purposes
    }
  }

  onMounted(() =>{
    fetchScanData(); // initial fetch
    pollingInterval = window.setInterval(fetchScanData, 5000); // retry the request for the scan data every 5 seconds until a response is recieved.
  })                                                           // later we will adapt this so that it will run on a timer all the time. This current solution is not perfect 

  onUnmounted(() => {
    clearInterval(pollingInterval);
  })


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
  color: #333;
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
.refresh-div {
  cursor: pointer;
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.refresh-div:hover {
  background-color: #0056b3;
}
</style>
