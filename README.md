<div align="center">

# 🎓 ALUMNI MANAGEMENT PORTAL

**A modern, full-stack, distributed platform designed to connect graduates, build networks, and foster career growth.**

[![Status](https://img.shields.io/badge/Status-Active-success.svg)]()
[![Frontend](https://img.shields.io/badge/Frontend-Vanilla%20JS%20%7C%20Glassmorphism-blue)]()
[![Backend](https://img.shields.io/badge/Backend-Django%20%7C%20REST%20Framework-green)]()
[![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)]()

**[⭐ View Repository](https://github.com/kulkarnishub377/Alumni_Management_portal)** &nbsp;&bull;&nbsp; **[🚀 Open Live Demo](https://kulkarnishub377.github.io/Alumni_Management_portal/)**

</div>

---

## ⚡ Overview

The **Alumni Management Portal** is a production-ready Web Application engineered to handle the complexities of a multi-tiered academic networking platform. It utilizes lightning-fast Vanilla CSS/JS for the frontend, perfectly decoupled and linked to a robust **Python Django REST API** operating on a **PostgreSQL** relational database.

Whether a user is a new graduate seeking mentorship, or a faculty administrator tracking departmental placement analytics, this application scales fluidly.

## ✨ Key Features

- 🎭 **5-Tier Role-Based Workspaces**: Five distinct user scopes (`Admin`, `SuperAdmin`, `Alumni`, `Coordinator`, `Mentor`) equipped with customized dashboard logics and specialized APIs.
- 🐍 **Advanced Python API**: Django REST Framework (DRF) powers page-wise optimized API aggregations, reducing frontend load times.
- 🔒 **Secure Authorization**: Employs enterprise-grade SimpleJWT for JSON Web Token payload generation.
- 🎨 **Premium UI/UX System**: Features glassmorphism, responsive grid layouts, automated scroll intersection animations, and carefully curated typography.
- 📱 **Mobile-First Responsive**: All components, from complex masonry galleries to dense administrative data tables, degrade flawlessly to mobile views.
- 💬 **Interactive Pipelines**: Built-in interactive models for Job Applications, Direct Mentorship networking pipelines, and Activity feeds.

---

## 📂 Complete Project Structure

```text
📦 Alumni_Management_portal
 ┣ 📂 backend                     # ⚙️ Python Django Backend API
 ┃ ┣ 📂 api                       # REST Endpoint Logic (Views, Serializers, Models)
 ┃ ┣ 📂 config                    # Core Django Configurations
 ┃ ┣ 📜 manage.py                 # Backend Entrypoint
 ┃ ┗ 📜 requirements.txt          # Python Dependencies
 ┣ 📂 docs                        # 📚 Advanced Technical Documentation
 ┃ ┣ 📜 API_REFERENCE.md          # Complete Endpoint Catalog
 ┃ ┣ 📜 BACKEND_SETUP.md          # Python setup and migration instructions
 ┃ ┗ 📜 DATABASE_SCHEMA.md        # Relational mapping definitions
 ┣ 📂 database                    # 🗄️ SQL and Schema exports
 ┃ ┗ 📜 schema.sql
 ┣ 📜 index.html                  # Core Landing Page / Hero Section
 ┣ 📂 assets                      # Global Frontend Assets
 ┃ ┣ 📂 css                       # Vanilla Styling
 ┃ ┣ 📂 js                        # Component Engine
 ┃ ┗ 📂 images                    # Static Imagery
 ┗ 📂 pages                       # 🛡️ Role-Based Sandboxes
   ┣ 📂 admin                     # 👑 Superuser UI privileges
   ┣ 📂 alumni                    # 🎓 Standard portal logic
   ┣ 📂 coordinator               # ⚙️ Mid-level moderation 
   ┣ 📂 mentor                    # 💡 Specialized Mentorship boards
   ┗ 📂 auth                      # 🔓 Public Gateways
```

---

## 🛠️ Technology Stack

| Architecture     | Technology                 | Rationale                                                                      |
|------------------|----------------------------|----------------------------------------------------------------------------------|
| **Frontend**     | HTML5, CSS3, Vanilla JS    | Zero dependency overhead; raw DOM speeds combined with customized glassmorphism. |
| **Backend API**  | Python, Django 5.2         | Robust Object-Relational Mappings natively equipped with a web Back-Office.      |
| **REST Router**  | Django REST Framework      | Swift serialization of complex Nested Payloads with Token-based protection.      |
| **Database**     | PostgreSQL                 | ACID compliant relations required for linking complex User/Mentorship timelines. |

---

## 🚀 Getting Started

### 1. Frontend Execution
The UI evaluates dynamically in the browser utilizing lightweight native DOM operations.
```bash
git clone https://github.com/kulkarnishub377/Alumni_Management_portal.git
cd Alumni_Management_portal
# Run through any simple server:
npx serve .
```

### 2. Backend Execution
To initialize the robust Django Pipeline locally, please refer to `/docs/BACKEND_SETUP.md` for virtual environment setup, package installations, and initial Postgres table migrations.

---

## 🗺️ Completed Roadmap
- ✅ **Phase 1: Visual Structure** - Designed the complete decoupled Glassmorphic HTML5 Sandboxed Frontend.
- ✅ **Phase 2: Database Schema** - Conceptualized the robust normalized database required for networking workflows.
- ✅ **Phase 3: Python API Backend** - Deployed complete Django Rest Framework pipeline with Role-based validations and interactive Actions.
- 🔜 **Phase 4: Frontend API Integration** - Connect the `assets/js` engines to the Django routing layer explicitly via fetch payloads.

<p align="center">Engineered with ❤️ to build next-generation Alumni Communities.</p>
