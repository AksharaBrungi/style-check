# StyleCheck – AI-Powered Fashion & Outfit Analysis Platform

StyleCheck is a premium full-stack SaaS application that operates as an intelligent fashion assistant. It integrates computer vision simulations (YOLO item detection, canvas-based dominant color extraction) with generative AI (Google Gemini) to deliver comprehensive outfit analysis report cards, styling tips, footwear/accessories recommendation grids, and an interactive AI Stylist chatbot workspace.

---

## 🎨 Key Architectural Pillars

### 1. Robust Server-Side Gemini API
All GenAI requests are proxied securely through an Express server-side controller (`server.ts`) using the official `@google/genai` TypeScript SDK. This hides the Gemini API Key completely from the browser, preventing keys leakage.

### 2. High-Performance Build Config
Custom build automation uses `vite` for client-side bundle generation and `esbuild` for server-side bundling into a self-contained CommonJS (`dist/server.cjs`) output. This provides sub-second startup times and native support in standard container engines.

### 3. Dual-State Database Persistence
Utilizes **Firebase Auth** and custom-addressed **Firestore databases** for cloud syncing. To ensure maximum reliability and a bulletproof user experience, the system implements a graceful localStorage fallback—if the user runs in offline demo mode, all features remain 100% operational.

---

## 🚀 Features

*   **Outfit Analyzer (Computer Vision & LLM)**: Drag-and-drop full-body photo upload. Generates a comprehensive Report Card.
*   **Dominant Color Palette Extraction**: Scans canvas colors and presents interactive hexadecimal cards with one-click copy.
*   **Garment Object Detection Table**: Identifies blazers, chinos, shoes, and layers with simulated YOLO confidence bounds.
*   **Style Score Indicator**: A responsive radial SVG progress ring calculating the aesthetic index (0–100).
*   **Bento Recommendation Cards**: Tailored footwear swaps, hairstyle upgrades, strengths/weaknesses logs, and alternative styling.
*   **Occasion Calibration Flow**: If styling choices are ambiguous (confidence < 0.65), the AI flags the card and initiates an interactive dialogue to tune results.
*   **Interactive AI Stylist Chatbot**: A slide-in conversational space pre-conditioned on the active outfit card's parameters.
*   **Device History Vault**: Review, retrieve, or purge past analysis results.
*   **Interactive Prefs Pane**: Toggle fit parameters, color tastes, and simulate premium styling subscription options.

---

## 🛠️ Technology Stack

*   **Frontend**: React (v19) with Vite (v6), Tailwind CSS (v4), and Framer-inspired custom CSS animations.
*   **Backend**: Node.js, Express, tsx.
*   **AI Engine**: Google Gemini API (`gemini-2.5-flash` model), `@google/genai` SDK.
*   **Database**: Firebase Firestore.
*   **Authentication**: Firebase Authentication.

---

## 📂 Project Directory Structure

```text
/
├── server.ts                       # Full-Stack Express and Vite middleware controller
├── README.md                       # Comprehensive startup guide
├── package.json                    # Dependency and script manager
├── index.html                      # Single-page application template
├── tsconfig.json                   # TypeScript parameters
├── vite.config.ts                  # Vite build plugin config
├── src/
│   ├── App.tsx                     # Main orchestrator, toast systems, and routers
│   ├── main.tsx                    # React client entry point
│   ├── index.css                   # Custom global tailwind styles & typography imports
│   ├── types.ts                    # Centralised TypeScript data models
│   ├── lib/
│   │   └── firebase.ts             # Firebase client setup with custom DB address
│   └── components/
│       ├── Header.tsx              # Navigation bar and member indicator
│       ├── AuthModal.tsx           # Email/Password & Anonymous Firebase Auth drawer
│       ├── UploadZone.tsx          # Drag & Drop uploader with built-in Demo Sandbox
│       ├── ReportView.tsx          # Custom progress rings, swatch tables, and recommendations
│       ├── HistoryList.tsx         # Past report list loading from cloud
│       ├── Chatbot.tsx             # Interactive Stylist Conversational Workspace
│       ├── FollowUpModal.tsx       # Occasion Calibration modal
│       └── StyleSettings.tsx       # Preferences dashboard and premium simulator
```

---

## 👨‍💻 Startup & Deployment

### 1. Setup Environment
Rename `.env.example` to `.env` and fill in your Gemini API Key:
```env
GEMINI_API_KEY="AIzaSyYourKeyHere..."
```

### 2. Local Development
Start the full-stack server on local port `3000`:
```bash
npm run dev
```

### 3. Production Compilation
Build both client static files and Node server bundle:
```bash
npm run build
```

### 4. Launch Production Server
```bash
npm run start
```
