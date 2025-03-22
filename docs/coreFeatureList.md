# pi_Sage – Core Feature List

## MVP Features (Research Phase – Assignment 5)

### 1. Network Scanning via Nmap
- Integrate Nmap in the backend to scan a given IP or subnet.
- Capture details such as open ports, protocols, and detected services.

### 2. API Integration (Node.js Backend)
- `POST /scan` – Initiate a new scan with user-defined parameters.
- `GET /scans` – Retrieve a list of previous scans.
- `GET /scan/:id` – Retrieve the details of a specific scan.
- Parse Nmap results into structured JSON.
- Store results in a MySQL database.

### 3. Web-Based Dashboard (Vue.js Frontend)
- Trigger scans through a basic web interface.
- Display recent scan results in a readable format (table or list).
- Include basic filters (IP, port, time, risk level).

### 4. Dockerized Deployment
- Fully containerized setup using Docker Compose.
- Separate containers for:
  - Frontend (Vue.js)
  - Backend (Node.js + Nmap)
  - Database (MySQL)
- Easily deployable on Linux or Raspberry Pi.