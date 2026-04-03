# 📊 Stock Analysis Platform - Frontend

Frontend application built with React for a stock analysis platform with technical indicators, alerts, and social features.

---

## 🧠 Overview

This application allows users to:

* Search and visualize stock data
* Apply technical indicators
* Configure alerts
* Share results with other users

---

## 🚀 Tech Stack

* React (Vite)
* Auth0 (Authentication)
* Axios
* Lightweight Charts
* CSS

---

## ⚡ Requirements

Make sure you have Bun installed:

https://bun.sh

Check installation:

```bash
bun --version
```

## 📦 Installation

> ⚠️ This project is configured to run with Bun. Using npm or other package managers may not work as expected.

```bash
git clone https://github.com/FOMO-financial-app/frontend
cd frontend
bun install
bun run dev
```

---

## 🔌 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

```env
VITE_API_URL=
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
```

---

## 🔐 Authentication (Auth0)

This project uses Auth0 for authentication.

https://manage.auth0.com

### Aplication configuration:

* Application type: Single Page Application
* Allowed Callback URLs: http://yourfrontendurl
* Allowed Logout URLs: http://yourfrontendurl
* Allowed Web Origins: http://yourfrontendurl
* Set Idle Refresh Token Lifetime - Enable
* Allow Refresh Token Rotation - Enable

### API configuration:
* JSON Web Token (JWT) Profile: Auth0
* JSON Web Token (JWT) Signing Algorithm: RS256
* Allow Skipping User Consent: Enable

---

## 🔌 API Configuration

The frontend communicates with the backend API.

Set the base URL in:

src/shared/services/api.js

Or preferably via environment variable:

VITE_API_URL=http://yourbackendurl

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── layout/
│   ├── routes/
│   └── SyncUser.jsx
├── assets/
│   └── img/
├── features/
│   ├── board/
│   │   ├── models/
│   │   ├── pages/
│   │   └── services/
│   ├── profile/
│   │   ├── components/
│   │   ├── models/
│   │   ├── pages/
│   │   └── services/
│   ├── stock/
│   │   ├── components/
│   │   ├── models/
│   │   ├── pages/
│   │   └── services/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── models/
│   ├── pages/
│   ├── services/
│   └── utils/
├── App.jsx
└── main.jsx
```

---

## ⚙️ Features

* Stock search
* Interactive charts
* Technical indicators
* Alerts system
* User authentication
* Social board

---

## 📸 Screenshots

> See organization profile for full visual overview

---

## 🚀 Project Status

🟢 Completed (portfolio project)

---
