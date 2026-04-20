-- ==========================================================
-- ALUMNI MANAGEMENT PORTAL - FULL POSTGRESQL SCHEMA
-- ==========================================================
-- This schema maps exactly to the mock data currently used in data.js
-- and fully supports all frontend features and user fields found in the UI.

-- 1. DEPARTMENTS
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'active'
);

-- 2. ROLES (Lookup Table)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL 
    -- e.g., 'admin', 'alumni', 'mentor', 'coordinator'
);

-- 3. USERS (Core Table)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT REFERENCES roles(id),
    department_id INT REFERENCES departments(id),
    batch_year INT,  -- NULL for admins/coordinators
    phone VARCHAR(20),
    avatar_url TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. ALUMNI PROFILES (Detailed personal and professional data)
CREATE TABLE alumni_profiles (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender VARCHAR(20),
    nationality VARCHAR(50),
    degree VARCHAR(100),
    current_address TEXT,
    languages TEXT[], -- Array of strings for spoken languages
    current_company VARCHAR(255),
    current_role VARCHAR(255),
    skills TEXT[], -- Array of technical skills
    bio TEXT,
    resume_file_name VARCHAR(255),
    resume_url TEXT,
    resume_size_kb INT,
    resume_last_updated TIMESTAMP
);

-- 5. USER SOCIAL LINKS (GitHub, LinkedIn, Twitter, Portfolio)
CREATE TABLE user_social_links (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- e.g., 'linkedin', 'github', 'twitter', 'portfolio'
    url TEXT NOT NULL,
    UNIQUE(user_id, platform)
);

-- 6. USER EXPERIENCES (Career Trajectory / Timeline)
CREATE TABLE user_experiences (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL if current job
    description TEXT,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. MENTOR PROFILES
CREATE TABLE mentor_profiles (
    user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    specialization VARCHAR(255),
    max_mentees INT DEFAULT 5,
    active_mentees INT DEFAULT 0
);

-- 8. POSTS / ACTIVITY FEED (Network updates, job shares, announcements)
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    post_type VARCHAR(50) DEFAULT 'update', -- 'update', 'job_share', 'announcement', 'general'
    content TEXT NOT NULL,
    media_url TEXT, -- If they attach an image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. POST LIKES & COMMENTS (For feed interactivity)
CREATE TABLE post_likes (
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (post_id, user_id)
);

CREATE TABLE post_comments (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. JOBS
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    job_type VARCHAR(50), -- 'Full-time', 'Internship', 'Part-time'
    experience_level VARCHAR(50),
    description TEXT,
    posted_by INT REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending_coordinator', -- 'pending_coordinator', 'pending_admin', 'approved'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. EVENTS
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location VARCHAR(255),
    category VARCHAR(50),
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. EVENT ATTENDEES (Many-to-Many mapping)
CREATE TABLE event_attendees (
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    rsvp_status VARCHAR(20) DEFAULT 'attending',
    PRIMARY KEY (event_id, user_id)
);

-- 13. CHAT MESSAGES
-- For direct messaging and group chats
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. NOTIFICATIONS
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    icon VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. GALLERY ITEMS (For the public/alumni campus gallery page)
CREATE TABLE gallery_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(50), -- 'Campus', 'Events', 'Reunion', 'Sports', 'Cultural'
    image_url TEXT NOT NULL,
    uploaded_by INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
