# ⚙️ Backend Setup & Execution Guide

This document dictates how to initialize the Python Django backend locally and connect it to a running PostgreSQL instance.

## System Prerequisites
1. **Python 3.11+** installed globally.
2. **PostgreSQL 14+** running locally on port `5432`.
3. Valid permissions to execute shell scripts natively (`Powershell` unblocked or `Bash`).

## 1. Database Configuration
Before booting Django, you must provision an empty database inside your localized Postgres cluster:
1. Open pgAdmin or `psql`.
2. Execute: `CREATE DATABASE alumni_db;`
3. If necessary, alter default passwords inside `backend/config/settings.py` under the `DATABASES` object:
```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "alumni_db",
        "USER": "postgres",
        "PASSWORD": "password", # CHANGE THIS IF NEEDED
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```

## 2. Python Virtual Environment
Navigate to the central backend context and sequester dependencies:
```bash
cd backend
python -m venv venv
```
Activate the environment:
- **Windows**: `.\venv\Scripts\activate`
- **Mac/Linux**: `source venv/bin/activate`

## 3. Installing Packages
Construct the Django ecosystem:
```bash
pip install -r requirements.txt
```
*(If `requirements.txt` does not exist, run: `pip install django djangorestframework psycopg2 djangorestframework-simplejwt django-cors-headers`)*

## 4. Architectural Migrations
Propagate the SQL tables defined in `api/models.py` into your Postgres Cluster:
```bash
python manage.py makemigrations api
python manage.py migrate
```

## 5. Web Administrator Initialization
In order to log into the `/admin` portal or utilize the System APIs, construct a master superuser:
```bash
python manage.py createsuperuser
```
*(Follow prompt instructions for Email and Password).*

## 6. Execution
Run the live internal server:
```bash
python manage.py runserver
```
- **REST APIs**: `http://127.0.0.1:8000/api/`
- **Back-Office**: `http://127.0.0.1:8000/admin/`
