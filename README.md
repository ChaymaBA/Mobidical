# Mobidacal

**Mobidacal** is an educational mobile application designed to support children with autism in developing cognitive, behavioral, and social skills. The app leverages modern technologies such as **React Native** for cross-platform mobile development and **Artificial Intelligence (AI)** to offer a personalized learning experience tailored to each child's needs and progress.

---

## 🎯 Project Goals

- Provide an engaging and interactive educational tool for children with Autism Spectrum Disorder (ASD).
- Use AI to adapt learning paths to each child's individual profile and learning progress.
- Develop a simple, user-friendly interface that encourages ease of interaction for children and caregivers.

---

## 📁 Project Structure

- /mobidacal-mobile           # React Native mobile application
- /mobidacal-backend          # API and backend services
- /mobidacal-ai               # AI models and scripts
- /mobidacal-backoffice       # Admin panel for managing users, content, and learning progress

---

## 🛠️ Installation Instructions

### ✅ Prerequisites

Before getting started, ensure the following tools are installed on your system:

- **Node.js** (v16 or later)
- **npm** or **yarn** – for dependency management
- **Expo CLI** – for running the mobile app
- **Docker** (optional) – to containerize backend and AI services
- **PostgreSQL** – primary database for the backend

---
### ✅ Rendered Output:

### 1. 🚀 Set Up the Mobile Application
- cd mobidacal-mobile
- npm install        # or yarn install
- npx expo start     # Launch the development server

### 2. 🧩 Set Up the Backend
- `cd mobidacal-backend`
- `cp .env.example .env`    # Fill in environment variables like DB credentials
- `docker-compose up`       # Or run backend manually using Node.js
- `npm run docker-build:staging`     # Build the Docker image for the staging environment
- `npm run docker:migrate staging migration1`     #Run the database migration in the staging environment using the Docker container setup
---

### 3. 🤖 Run the AI Engine



---

### 4. ⚙️ Technologies Used

	•	React Native – cross-platform mobile development
	•	Node.js / Express – backend API
	•	PostgreSQL – database management
	•	Python – AI and machine learning scripts
	•	Docker – containerized services
	•	Expo – app development platform
