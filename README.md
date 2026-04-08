# 🎓 Alumni Management Portal

![Alumni Portal Hero]()  <!-- Add absolute repo image link later -->

> A professional, enterprise-grade Alumni Management System designed to connect graduates, facilitate mentorship programs, post jobs, and manage university events through an interactive, multi-page web application.

---

## 🌟 Overview
The **Alumni Management Portal** bridges the gap between past graduates and the educational institution. Designed using a modern tech stack and prepared for integration with robust backend frameworks (Django/Node.js), this platform offers an immersive experience via a glassy, particle-infused UI/UX.

### ✨ Key Features
- **Dynamic Dashboard**: A Multi-Page Application (MPA) frontend featuring 11 distinct interactive modules perfectly segmented for Python template injection.
- **Deep Networking**: Search, filter, and connect with 12,000+ alumni organized by department, batch, and company.
- **Interactive Chat System**: A built-in frontend chat system with UI-reactive feedback (currently mocked for WebSocket integration).
- **Mentorship Tracking**: Visualized mentor assignment boards linking current students with distinguished alumni.
- **Job & Event Boards**: Real-time filtering matrix for campus jobs and upcoming alumni events.
- **Role-Based Views**: Securely segmented interfaces via mocked localStorage bridges for Alumni, Students, and Administrators.

---

## 🚀 Technical Architecture

This repository contains the **Frontend Skeleton**. It has been architected specifically as a **Multi-Page Application (MPA)**.

**Why MPA over SPA?**
By hard-routing every dashboard module to specific HTML endpoints (\pages/alumni/chat.html\, \pages/alumni/jobs.html\), this system can be dragged-and-dropped directly into frameworks like **Django**, **Rails**, or **Express**. The \dashboard.js\ controller intelligently activates logic dynamically based on the \data-page\ attribute, preserving standard server-driven URL navigation while offering SPA-like reactivity.

### Tech Stack
- **Structure**: Vanilla HTML5 (Semantic)
- **Styling**: Pure CSS3 (Custom Properties/Variables, Flexbox/Grid, Glassmorphism)
- **Interactivity**: Vanilla ES6 JavaScript (No React/Vue blobs!)
- **Icons**: BoxIcons Library

---

## 📂 Directory Structure

\\	ext
Alumni_Management_portal/
├── index.html                   # Landing Page (Hero, Stats, About, Top Alumni)
├── README.md                    # You are here!
├── .github/                     # Community health files & templates
├── pages/                       
│   ├── auth/                    # Registration, Login, and Password Recovery
│   └── alumni/                  # Dashboard Modules (MPA Layout)
│       ├── dashboard.html       # Main Overview
│       ├── profile.html         # User Profile & Editor
│       ├── chat.html            # Messaging App UI
│       ├── network.html         # Alumni Directory
│       └── ... (7 more modules)
└── assets/                      
    ├── css/                     
    │   ├── common.css           # Global tokens, typography, navbar, footer
    │   ├── auth.css             # Login & Registration Wizard styling
    │   └── dashboard.css        # Sidebar, Grid layouts, Chat & Job styles
    ├── js/                      
    │   ├── data.js              # Mock database (JSON) simulating a REST API
    │   ├── homepage.js          # Preloader, sliders, parallax logic
    │   └── dashboard.js         # Intelligent module controller & DOM binding
    └── images/                  # Core assets & placeholders
\
---

## 🛠️ Installation & Setup (Local Development)

Because this repository strictly utilizes standard Web APIs with no build-steps (No Webpack, Vite, or npm installs!), it runs cleanly out of the box.

1. **Clone the repository:**
   \\ash
   git clone https://github.com/yourusername/Alumni_Management_portal.git
   cd Alumni_Management_portal
   \
2. **Serve the project:**
   You must serve the directory using a local HTTP server to avoid CORS issues when standard components are fetching assets. Using Python:
   \\ash
   python -m http.server 8000
   \   Or using Node.js:
   \\ash
   npx serve .
   \
3. **Explore:**
   Navigate to \http://localhost:8000\. Start at the landing page, hit **Register**, and explore the Alumni Dashboard ecosystem!

---

## 🛣️ Roadmap
- **Phase 1 (Complete):** High-Fidelity UI/UX Prototyping & Landing Page.
- **Phase 2 (Complete):** Interactive Dashboard transitions, Module splitting (MPA architecture), and Responsive CSS bug-bashes.
- **Phase 3 (Pending):** Backend integration Setup (SQL migrations, Session Auth).
- **Phase 4 (Pending):** REST API pipeline replacing \data.js\.

---

## 🤝 Community & Contributions
Please refer to our community guidelines inside the \.github\ folder if you wish to contribute to the UI polishing or API scaffolding!
- [Contributing Guidelines](.github/CONTRIBUTING.md)
- [Code of Conduct](.github/CODE_OF_CONDUCT.md)
- [Security Policy](.github/SECURITY.md)

---

## 📄 License
This project is licensed under the MIT License.
