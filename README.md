<link rel="stylesheet" href="../src/main/resources/static/assets/styles.css">
 <div class="logo-container">
    <img src="../src/main/resources/static/assets/logo.png" alt="Drones" width=200px class="logo" />
  </div>

# Drone Management Board


**Description:**
-

The *Drone Management System* is a comprehensive solution developed for efficient management and monitoring of drones. This project is a part of the Technical Test solution for Musala Soft. The system aims to optimize drone operations, enhance safety, and improve overall productivity in various sectors, such as logistics, healthcare, and surveillance. The system provides a user-friendly interface for managing a fleet of drones, monitoring their status, and ensuring seamless communication between drones and ground control.

**Technologies Used:**
-
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Frontend:** React.js
- **Database:** H2 inMemory
- **Testing:** JUnit, Mockito for unit testing
- **Deployment:** Docker, Docker Compose for containerization and orchestration

**Requirements**
-
- Local
  - [Node JS ^18](https://nodejs.org/en/download/current)
- Using Docker
  - [Docker Desktop (Recommended)](https://docs.docker.com/desktop/install/windows-install/)
<div class="tip">
    Tip: Ports: 8080 and 4173 most be accessible
</div>

**Key Features:**
-

1. **Drone Fleet Management:**
   - Register new drones in the system, including details like serial number, model, weight capacity, and battery capacity.
   - Categorize drones based on their types and models for streamlined organization.

2. **Real-time Monitoring:**
   - Track drones in real-time on a map interface, allowing users to monitor their locations and activities.
   - View battery levels, current status, and mission progress for each drone.

3. **Medication Delivery Management:**
   - Enable drone load and unload functionality for transporting medications and medical supplies.
   - Manage medication inventory and assign specific medications to drones for delivery.

4. **Automated Audit Logs:**
   - Generate audit logs for every drone activity, providing a detailed history of operations.
   - Monitor drone usage, status changes, and battery levels through comprehensive audit trails.

5. **Automated Lifecycle Simulation:**
   - Simulate drone lifecycle events, including state transitions and battery level changes.
   - Automate state changes based on predefined conditions, ensuring efficient use of drones.

6. **Exception Handling and Notifications:**
   - Implement error handling mechanisms for scenarios like low battery, invalid payloads, or system failures.
   - Send notifications to administrators and operators for critical events, enabling rapid response.

**Installation:**
-

<div class="tip">
    Tip: Commands change due to installed OS
</div>

1. Clone the repository:
   ```bash
   https://github.com/exagonsoft/Drones-Managment-Board.git

   cd <project-folder>
   ```



**Run Instructions:**
-

1. Build the project using NPM:
   ```bash
   .\npm install
   .\npm install -g serve
   ```

2. Run the Spring Boot application using Node:
   ```bash
   .\npm run dev
   ```
   OR

   ```bash
   .\npm start
   ```


3. Access the application in your web browser at `http://localhost:4173`.
    <div class="tip">
        Tip: UI running at http://localhost:4173
    </div>

<br/>

# ANNOTATIONS

<div class="tip">
    Tip: All validations where disabled due to test requirements, all possible errors all be handled by the backend server and notifications will be sent to the user UI interface.
</div>