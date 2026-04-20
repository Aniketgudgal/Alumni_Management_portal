# 🔌 API Reference Document

This document outlines the core interactions mapping the Vanilla Frontend to the Python Django REST Backend.

## Authentication & Securty
All private endpoints require an `Authorization` header containing a valid Bearer Token.

### Token Generation
**`POST /api/auth/token/`**
- **Payload:** `{ "email": "user@example.com", "password": "secure123" }`
- **Returns:** `{ "access": "eyJhb...", "refresh": "eyJhb..." }`

## 📊 Page-Wise Aggregate Endpoints
Designed specifically to prevent the frontend from executing heavy Promise.all waterfalls.

### `GET /api/pages/homepage/`
**Auth Required:** `False`
**Purpose:** Delivers all variables necessary to hydrate `index.html`.
**Returns:**
```json
{
  "stats": {"totalAlumni": 12500, "studentsPlaced": 8700, ...},
  "topAlumni": [ ... ],
  "jobs": [ ... ],
  "events": [ ... ],
  "testimonials": [ ... ],
  "whyJoin": [ ... ]
}
```

### `GET /api/pages/dashboard/alumni/`
**Auth Required:** `True (Bearer)`
**Purpose:** Hydrates `pages/alumni/dashboard.html` for standard network users.
**Returns:**
```json
{
  "announcements": [...],
  "upcoming_events": [...],
  "recommended_jobs": [...]
}
```

### `GET /api/pages/dashboard/mentor/`
**Auth Required:** `True (Bearer)`
**Purpose:** Hydrates `pages/mentor/dashboard.html` and populates the notification badges.
**Returns:**
```json
{
  "pending_requests_count": 4,
  "active_mentees_count": 12,
  "pending_requests": [...],
  "announcements": [...]
}
```

## 🛠️ Interactive Actions (Business Logic)

### Mentorship Approval Pipeline
**`POST /api/mentorship-requests/`**
- **Payload:** `{ "mentor_id": 4, "message": "I'd love career advice..." }`
- **Result:** Queues request for the mentor.

**`POST /api/mentorship-requests/{id}/approve/`**
- **Auth:** Mentor Only.
- **Result:** Converts pending request to active mentee status and updates counters.

### Job Board Actions
**`POST /api/jobs/{id}/apply/`**
- **Payload:** `{ "cover_letter": "I have 3 years in python..." }`
- **Result:** Generates a JobApplication tied to the authorized user.

### Network Feed
**`POST /api/feed/{id}/like/`**
- **Toggle Endpoint:** Liking an unliked post adds a like. Liking an already liked post removes the like.

## Modifying Existing Objects
Standard CRUD Rest interfaces are exposed for data modification via standard HTTP Verbs (GET, POST, PATCH, DELETE) at the following routings:
- `/api/users/me/`
- `/api/profiles/alumni/`
- `/api/events/`
- `/api/jobs/`
