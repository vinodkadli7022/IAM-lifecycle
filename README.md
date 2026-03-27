# Identity Lifecycle Automation Platform (ILAP)

![Hackathon MVP Badge](https://img.shields.io/badge/Status-Hackathon_MVP_Ready-success)
![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js_Express-339933?logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)

An intelligent, conversational Identity and Access Management (IAM) platform built to automate the enterprise **Joiner, Mover, and Leaver (JML)** workflows. 

Designed to completely eliminate the manual overhead, helpdesk tickets, and human-errors associated with employee onboarding and offboarding.

---

## The Problem & The Solution
**The Problem:** In modern enterprises, provisioning a new employee (or revoking an exited employee's access) is a fragmented, week-long process involving multiple IT tickets, disorganized spreadsheets, and serious security vulnerabilities (e.g., forgotten access revocation).

**Our Solution:** ILAP provides a secure, centralized **Conversational Access Chatbot** tied to a robust **Role-Based Access Control (RBAC)** Rules Engine. Managers simply instruct the Chatbot to onboard a user, and the system automatically provisions the account and maps exactly the right permissions instantaneously—logging every action for compliance.

---

## Core Features

*   **Conversational JML Chatbot:** Intelligent workflow automation that guides managers through provisioning (Joiner), role changing (Mover), and secure offboarding (Leaver).
*   **Role Template Engine:** Administrators can bundle logical permissions (e.g., Jira, VPN, Email) into reusable roles like "Backend Developer" or "HR Manager".
*   **Zero-Trust RBAC Authentication:** JWT-secured session management ensures that standard Employees can never access administrative workflows.
*   **Immutable Audit Logging:** Every single identity modification (provisions, revocations, and role alterations) is permanently recorded with timestamps and initiator IPs for SOC2/ISO compliance.
*   **SaaS-Grade UX/UI:** Designed with a modern, high-contrast neobrutalist aesthetic, including smooth micro-animations, real-time validation, and a premium segmented login interface.

---

## Technology Stack

**Frontend (Client)**
*   **React (Vite):** High-performance component rendering.
*   **Tailwind CSS:** Highly optimized, utility-first styling for a hyper-modern aesthetic.
*   **Lucide React:** Sleek, consistent iconography.
*   **React Router:** Secure, declarative client-side routing.

**Backend (Server)**
*   **Node.js & Express.js:** Fast, non-blocking REST API architecture.
*   **MongoDB & Mongoose:** Highly scalable document database for hierarchical Identity tracking.
*   **JSON Web Tokens (JWT) & Bcrypt:** Industry-standard secure authentication and password hashing.

---

## Installation & Setup (Local Development)

To run this application locally for demonstration, you need **Node.js** and **MongoDB Community Server** installed.

### 1. Clone the repository
```bash
git clone https://github.com/vinodkadli7022/IAM-lifecycle.git
cd IAM-lifecycle
```

### 2. Setup the Backend Server
```bash
cd server
npm install
```
*Create a `.env` file in the `server` directory and add your variables:*
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ilap
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```
*Start the server:*
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Setup the Frontend Client
Open a **new** terminal window and run:
```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## How to Demo the Workflows

The platform includes seed data so you can immediately test the RBAC capabilities. 
Navigate to `http://localhost:5173/login`:

1.  **Employee View:** Use the Quick Login toggle to log in as `alice@company.com`. Notice she is securely restricted to a view-only Dashboard displaying her permissions.
2.  **Manager View:** Log in as `manager@company.com`. Access the **Joiner Workflow** and use the Chatbot to "Hire" a new employee. 
3.  **Audit Validation:** After the manager successfully finishes the chatbot flow, navigate to the **Audit Logs** to see the system's automated tracking of the newly minted account.
