<div align="center">

# 🎓 Alumni Management Portal

**An enterprise-grade, full-stack ecosystem engineered specifically for complex, role-based academic networking, targeted mentorship, and institutional career growth.**

[![Status](https://img.shields.io/badge/Status-Active-success.svg)]()
[![Frontend](https://img.shields.io/badge/Frontend-ES6%20Vanilla%20JS%20%7C%20Glassmorphism-blue)]()
[![Backend](https://img.shields.io/badge/Backend-Django%205.2%20%7C%20REST%20Framework-green)]()
[![Authentication](https://img.shields.io/badge/Auth-SimpleJWT%20Tokens-purple)]()
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20(15%20Tables)-blue)]()

**[⭐ View Repository](https://github.com/kulkarnishub377/Alumni_Management_portal)** &nbsp;&bull;&nbsp; **[🚀 Open Frontend Demo](https://kulkarnishub377.github.io/Alumni_Management_portal/)**

</div>

---

## 🧠 Problem Statement

Most universities completely lose track of the granular technical skillsets, career trajectories, and networking power of their graduates. Traditional directories are static "Black Holes." Consequently:
1. Current students lack direct, structured mentorship from industry veterans.
2. Coordinators and faculty cannot easily track longitudinal placement statistics.
3. Alumni miss out on peer-to-peer job sharing because the platform lacks interactive social layers.

---

## 💡 Solution

The **Alumni Management Portal** solves this by operating entirely as a **unified, interactive 15-table relational application**. 

By natively sandboxing users into deeply segregated workflows right at registration—**Alumni, Mentors, Coordinators, and SuperAdmins**—the platform ensures extreme dashboard relevance. It actively drives engagement through custom Job Application endpoints, workload-balanced mentorship pipelines, and deeply nested user experience timelines mimicking global professional networks.

---

## 🎯 Value Proposition

* **Lightning-Fast Decoupled UI (Zero Bloat)**: Engineered exclusively with ES6 Vanilla JavaScript and modular DOM injections. We completely bypass heavy JavaScript framework (React/Vue) initial load times while retaining complex state management via isolated custom `apiFetch` engines.
* **Aggregated API Master-Endpoints**: Dramatically reduced frontend DOM waterfall-loading constraints. Our custom `HomepageAPIView` combines dynamic University Stats, Top Mentor Listings, Job limits, and Live Events instantly into **one secure JSON payload**.
* **Constraint-Based Logic**: Mentorship is serious. Mentors define granular `max_mentees` constraints in the PostgreSQL backend which our Django Views rigorously enforce upon application.

---

## 🖼️ Demo / Preview

**[🚀 Experience the Live Frontend Demo Here!](https://kulkarnishub377.github.io/Alumni_Management_portal/)**

*(Navigate safely via our `Mock Demo Fallback` logic baked into our `/assets/js/modules/api.js` gateway even if the backend spins down!)*

---

## ⚙️ How It Works (Deep Dive)

1. **Authentication Gateway**: Users authenticate via the `/auth/token/` DRF SimpleJWT pipeline. The frontend global wrapper (`apiFetch`) intercepts and mounts `Bearer` tokens securely to `localStorage`, protecting all HTTP instances.
2. **Dynamic UI Rendering**: Upon verifying roles (`role: 'alumni' | 'mentor' | 'admin'`), the user's dashboard requests specific aggregated payloads. 
3. **Integrated Action Layers**: When a user applies for a job naturally in the UI, a custom Django `@action(methods=['post'])` named `apply()` catches it, seamlessly attaching the user's relational `cover_letter` directly to their pre-uploaded PostgreSQL `resume_url` profile blob.
4. **Resilient Error Catching**: Core UI features auto-refresh locally but immediately intercept `401 Unauthorized` API responses to safely flush auth and re-route intelligently.

---

## ✨ Exhaustive Features Breakdown

### 👑 SuperAdmin Interface & Database Management
* **Platform Health & Metrics**: Direct live calculations charting system engagement.
* **Verification Queues**: Registrants remain in strict `pending` sandbox phases until manually verified and categorized by department IDs.

### 🎓 Alumni Experience Hub
* **Interactive Activity Feed (`posts`, `post_likes`, `post_comments`)**: A robust social wall where users publish multimedia datasets. Engaging with a post triggers seamless backend boolean toggles to maintain state dynamically.
* **Advanced Portfolio Structure**: Users define deeply nested `user_experiences` maps and scalable technical `skills` arrays, establishing enterprise profiles.
* **Native Job Application Engine**: Instantly track and apply to `Full-time`, `Part-time`, or `Internship` opportunities explicitly targeted by recruiters.

### 💡 Mentor Command Center
* **Kanban Workload Board**: Automatically halts applications if a mentor hits their `max_mentees` threshold. 
* **Dual Action Pipelines**: Accepting a mentee dynamically constructs a mapped relationship inside `MentorshipRequests`, initiating permissions for localized direct 1-to-1 communication channels.

### ⚙️ Coordinator Workflow
* **Institution-Wide Moderation**: Job postings intentionally fall into a `pending_coordinator` state. Only upon faculty approval do jobs hit global API distribution.
* **Department-Locked Scopes**: Coordinators view analytics constrained strictly to their own faculty (e.g., Computer Science placements vs. Mechanical placements).

---

## 🧱 Comprehensive Tech Stack

### Frontend Architecture
* **Core Engine**: HTML5 Semantic structuring with raw modular `.css` Glassmorphism stylesheets.
* **Logic/State Module**: **Vanilla ES6 JavaScript** securely interacting with the backend via a centralized `api.js` fetch-wrapper factory.

### Backend Infrastructure
* **API Framework**: Python 3.11+ running **Django 5.2** connected flawlessly to **Django REST Framework (DRF)**.
* **Business Logic Mapping**: Extensive custom `APIView` sets combining `@action` decorators and `@method_decorator(cache_page)` for massive data caching optimizations.
* **Security Layer**: `djangorestframework-simplejwt` handling rigid `IsAuthenticated` ViewSet protection.

### Database Architecture
* **PostgreSQL (15 Highly Relational Tables)**: Designed strictly around ACID architecture mapping arrays natively. Key tables encompass:
  * **Core**: `users`, `departments`, `roles`.
  * **Profiles**: `alumni_profiles`, `mentor_profiles`, `user_experiences`, `user_social_links`.
  * **Engagement**: `posts`, `post_likes`, `post_comments`, `messages`, `notifications`, `gallery_items`.
  * **Institution**: `jobs`, `events`, `event_attendees`, `job_applications`.

---

## 🚀 Installation & Setup

### 1. Requirements Prep
* **Node.js** (v18.0+)
* **Python** (v3.11+)
* **PostgreSQL Engine** (Running locally on default Port 5432)

### 2. Full-Stack Initialization
```bash
# 1. Clone the master repository
git clone https://github.com/kulkarnishub377/Alumni_Management_portal.git
cd Alumni_Management_portal

# 2. Install general scripts and NPM dependencies (Used for CLI tooling)
npm install

# 3. Secure backend setup (Generates a Python `venv` & installs `requirements.txt`)
npm run setup:backend

# 4. Generate the massive 15-Table Schema on PostgreSQL 
# Ensure a database named `alumni_db` exists on your system!
npm run db:migrate

# 5. Bootstrap your SuperAdmin account to take executive control
npm run db:admin
```

---

## ▶️ Usage Execution

Booting the entire platform is handled cleanly through `concurrently` using our NPM scripting:

```bash
# Spin up both frontend (Port 3000) and backend (Port 8000) instantly
npm run dev

# Or spin them individually:
npm run backend
npm run frontend
```

Navigate to `http://localhost:3000/` to log in via your newly minted SuperAdmin!

---

## 🔐 Environment & Config Mapping

For secure execution, verify your Database configuration aligns. Either implement a `.env` in the `./backend/` directory or assert settings explicitly:

```env
# Database Credentials Expected
DB_NAME=alumni_db
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=127.0.0.1
DB_PORT=5432
```

---

## 📁 System Architecture Structure

```bash
📦 Alumni_Management_portal
 ┣ 📂 assets/           # ✨ UI Glassmorphism (css/) & logic modules (js/) via api.js
 ┣ 📂 backend/          # ⚙️ Django API Gateway
 ┃ ┣ 📂 api/            # Complete Logic (views.py, serializers.py, models.py)
 ┃ ┣ 📂 config/         # Systemwide endpoints (urls.py) and core Settings
 ┣ 📂 database/         # 🗄️ Raw schema.sql 15-table architecture definitions
 ┣ 📂 docs/             # 📚 Advanced Technical documentation directories
 ┣ 📂 pages/            # 🛡️ Role-Based Segregation UI Sandbox Views
 ┣ 📜 index.html        # App Landing Context
 ┗ 📜 package.json      # NPM Runner script definitions
```

---

## 🐛 Core Engineering Challenges Faced

1. **API Waterfall Latency Saturation**: 
   * **Problem**: Initially, populating massive dashboards caused the frontend to shoot off 5-8 unique GET requests instantly, destroying render speeds.
   * **Solution**: Engineered combined Django endpoint logic like `HomepageAPIView`. It executes batch Queries returning complex nested JSON matrices (Top Alumni + Limits + Feeds + Jobs) all efficiently packed into a single network cycle.
   
2. **Mentorship Load Balancing Escalation**: 
   * **Problem**: Popular Mentors were getting spammed with 100+ requests. 
   * **Solution**: Developed dynamic API constraints directly connected to a Mentor's `max_mentees` payload. The `MentorshipRequestViewSet.approve()` custom action actively verifies limits before modifying PostgreSQL relationships.

3. **Vanilla JS Authentication Resiliency**: 
   * **Problem**: Managing rigid JWT expiries without heavy generic Webpack libraries.
   * **Solution**: Configured the central `apiFetch` in `api.js` to catch any `401` gracefully across every module ping, natively clear the DOM `localStorage`, and instantly revert the UI to the explicit `/pages/auth/login.html` directory context.

---

## 🧪 Testing Validation

The platform's relational logic allows easy local manual visual verification. However, to debug complex permission flows quickly across roles:
```bash
# Force-flush the whole PostgreSQL map for an instantaneous clean slate
npm run db:flush
```

---

## 🗺️ Roadmap / Future Improvements

* **[ ] Bi-Directional WebSockets**: Graduate the current HTTP-based polling of the `messages` Relational table into true WebSockets for absolute Live notifications.
* **[ ] Seamless WebRTC API Expansion**: Direct deep-link API connections allowing mentors & mentees to spin up WebRTC video conferences exclusively from the pipeline instead of relying on generic Zoom URLs. 
* **[ ] AI Resume Extractor**: Attach an orchestration pipeline using basic LLM toolsets on the `resume_url` input sequence, automatically filling the `alumni_profiles` DB values and `skills` Arrays without manual data entry.

---

## 🤝 Contributing Architecture

We adore scalable contributions designed properly. 
1. **Fork** via GitHub.
2. Initialize an isolated **Feature Branch** (`git checkout -b build/SuperFeature`).
3. Commit logical units securely (`git commit -m 'Added the backend route for SuperFeature'`).
4. **Push** into the origin Branch (`git push origin build/SuperFeature`).
5. Transmit an official open **Pull Request**.

---

## 📜 Legal License

Managed directly under the **MIT License**. Examine `LICENSE` deeply for structural distributions. 

---

## 🙌 Dedicated Acknowledgements

* Core architectural capabilities generated through **Django Core Documentation**.
* Structuring elements via modern ES6 paradigms. 
* Beautiful aesthetics born natively via the rise of zero-framework **Glassmorphism CSS**.

---

## 📞 Platform Engineering Authors

* **Core Developers**: Shubham Kulkarni, Yadnynesh Dhangar, and Aniket Gudgal
* **GitHub Operations**: [@kulkarnishub377](https://github.com/kulkarnishub377)
* **Direct Network**: kulkarnishub377@gmail.com
* **Official Repository**: [Alumni Management Portal](https://github.com/kulkarnishub377/Alumni_Management_portal)

---

<p align="center"><b>Engineered systematically with ❤️ to build robust, scalable Alumni Network Operations.</b></p>
