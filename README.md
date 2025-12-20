# SpendWise — Personal Expense Tracker

SpendWise is a simple expense tracker application where users can record expenses and view basic summaries.
This project is built to demonstrate DevOps practices: Docker containerization, Docker Compose orchestration, CI/CD automation, and Kubernetes deployment with persistent data using PostgreSQL.

---

## Overview
**Main features**
- Create an expense (write to DB)
- List expenses (read from DB)
- Filter expenses by month (`YYYY-MM`)
- Health endpoint (`/health`) for readiness/liveness probes

---

## Architecture

### Services
- **API (Node.js + Express)**: REST endpoints for expenses
- **Database (PostgreSQL)**: persistent storage for expenses

### Architecture diagram (Compose)
```text
+--------------------+        HTTP         +----------------------+
|  Client (Postman)  |  ---------------->  |  API (Express)       |
|  http://localhost  |                    |  Port: 3000          |
+--------------------+                    +----------+-----------+
                                                   |
                                                   | SQL (internal Docker network)
                                                   v
                                        +--------------------------+
                                        | PostgreSQL (db)          |
                                        | Persistent Volume:       |
                                        | db-data                  |
                                        +--------------------------+
---                                        

## Run with Docker Compose

### Prerequisites
- Docker
- Docker Compose

---

### 1) Create environment file

Copy the example file and adjust if needed:

```powershell
Copy-Item .env.example .env
