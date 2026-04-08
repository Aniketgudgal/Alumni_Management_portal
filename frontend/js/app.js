document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const viewContainer = document.getElementById('view-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Initialize
    renderView('dashboard');

    // Navigation setup
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.currentTarget.getAttribute('data-route');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Render view
            renderView(route);
            
            // On mobile, might want to scroll top or close sidebar
            window.scrollTo(0, 0);
        });
    });

    // View Router
    function renderView(route) {
        // Clear container and trigger reflow for animation
        viewContainer.style.animation = 'none';
        viewContainer.offsetHeight; /* trigger reflow */
        viewContainer.style.animation = 'fadeIn 0.4s ease-out forwards';
        
        switch(route) {
            case 'dashboard':
                viewContainer.innerHTML = generateDashboardUI();
                break;
            case 'directory':
                viewContainer.innerHTML = generateDirectoryUI();
                break;
            case 'events':
                viewContainer.innerHTML = generateEventsUI();
                break;
            case 'mentorship':
                viewContainer.innerHTML = generateMentorshipUI();
                break;
            case 'gallery':
                viewContainer.innerHTML = generateGalleryUI();
                break;
            case 'jobs':
                viewContainer.innerHTML = generateJobsUI();
                break;
            default:
                viewContainer.innerHTML = generateDashboardUI();
        }
    }

    // Generators
    function generateDashboardUI() {
        return `
            <div class="dashboard-header">
                <h1>Welcome back, Admin 👋</h1>
                <p>Here's what is happening in your alumni network today.</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class='bx bxs-user-detail'></i></div>
                    <div class="stat-info">
                        <h3>${MOCK_DATA.stats.totalAlumni.toLocaleString()}</h3>
                        <p>Total Registered Alumni</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class='bx bxs-group'></i></div>
                    <div class="stat-info">
                        <h3>${MOCK_DATA.stats.activeMentors}</h3>
                        <p>Active Mentors</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class='bx bxs-calendar-star'></i></div>
                    <div class="stat-info">
                        <h3>${MOCK_DATA.stats.upcomingEvents}</h3>
                        <p>Upcoming Events</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class='bx bxs-briefcase-alt-2'></i></div>
                    <div class="stat-info">
                        <h3>${MOCK_DATA.stats.jobPostings}</h3>
                        <p>Active Job Postings</p>
                    </div>
                </div>
            </div>
            <div class="module-header">
                <h2>Recent Alumni Registrations</h2>
                <button class="btn-primary" onclick="document.querySelector('[data-route=\\'directory\\']').click()">View All <i class='bx bx-right-arrow-alt'></i></button>
            </div>
            <div class="alumni-grid">
                ${MOCK_DATA.alumni.slice(0, 3).map(alumnus => createAlumniCard(alumnus)).join('')}
            </div>
        `;
    }

    function generateDirectoryUI() {
        return `
            <div class="module-header">
                <div>
                    <h1>Alumni Directory</h1>
                    <p style="color: var(--text-muted); margin-top: 4px;">Search, filter, and connect with graduates across the globe.</p>
                </div>
                <button class="btn-primary"><i class='bx bx-plus'></i> Invite Alumni</button>
            </div>
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                <div style="flex: 1;" class="search-bar">
                    <input type="text" placeholder="Search by name, company, or role...">
                </div>
                <select style="padding: 10px; border-radius: var(--radius-md); border: 1px solid var(--border); outline: none;">
                    <option>All Batches</option>
                    <option>2020-2024</option>
                    <option>2015-2019</option>
                </select>
            </div>
            <div class="alumni-grid">
                ${MOCK_DATA.alumni.map(alumnus => createAlumniCard(alumnus)).join('')}
            </div>
        `;
    }

    function generateEventsUI() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        return `
            <div class="module-header">
                <div>
                    <h1>Events & Meetups</h1>
                    <p style="color: var(--text-muted); margin-top: 4px;">Host and manage upcoming alumni gatherings.</p>
                </div>
                <button class="btn-primary"><i class='bx bx-calendar-plus'></i> Create Event</button>
            </div>
            <div class="events-list">
                ${MOCK_DATA.events.map(event => {
                    const d = new Date(event.date);
                    return `
                        <div class="event-card">
                            <div class="event-date">
                                <span class="day">${String(d.getDate()).padStart(2, '0')}</span>
                                <span class="month">${months[d.getMonth()]}</span>
                            </div>
                            <div class="event-details">
                                <h3 class="event-title">${event.title}</h3>
                                <div class="event-meta">
                                    <span><i class='bx bx-time-five'></i> ${event.time}</span>
                                    <span><i class='bx bx-map'></i> ${event.location}</span>
                                    <span><i class='bx bx-user-check'></i> ${event.attendees} Attending</span>
                                </div>
                                <div class="event-actions">
                                    <button class="btn-outline">Edit</button>
                                </div>
                            </div>
                        </div>
                    `
                }).join('')}
            </div>
        `;
    }

    function generateMentorshipUI() {
        return `
            <div class="module-header">
                <div>
                    <h1>Mentorship Program</h1>
                    <p style="color: var(--text-muted); margin-top: 4px;">Connect experienced alumni with current students.</p>
                </div>
                <button class="btn-primary"><i class='bx bx-user-plus'></i> Assign Mentor</button>
            </div>
            <div class="placeholder-msg">
                <i class='bx bxs-network-chart'></i>
                <h3>Mentorship dashboard is in development</h3>
                <p style="margin-top: 8px;">Phase 2 will integrate dynamic mentor-mentee matching algorithms.</p>
            </div>
        `;
    }

    function generateGalleryUI() {
        return `
            <div class="module-header">
                <div>
                    <h1>Photo Gallery</h1>
                    <p style="color: var(--text-muted); margin-top: 4px;">Memories from past events and convocations.</p>
                </div>
                <button class="btn-primary"><i class='bx bx-upload'></i> Upload Photos</button>
            </div>
            <div class="placeholder-msg">
                <i class='bx bxs-image-add'></i>
                <h3>Gallery module is in development</h3>
                <p style="margin-top: 8px;">Waiting for backend media storage integration.</p>
            </div>
        `;
    }

    function generateJobsUI() {
        return `
            <div class="module-header">
                <div>
                    <h1>Job Board</h1>
                    <p style="color: var(--text-muted); margin-top: 4px;">Opportunities shared by the alumni network.</p>
                </div>
                <button class="btn-primary"><i class='bx bx-briefcase-alt'></i> Post a Job</button>
            </div>
            <div class="placeholder-msg">
                <i class='bx bxs-business'></i>
                <h3>Job board is in development</h3>
                <p style="margin-top: 8px;">Stay tuned for the advanced job matching system.</p>
            </div>
        `;
    }

    // Helper Compnents
    function createAlumniCard(data) {
        return `
            <div class="alumni-card">
                <img src="${data.avatar}" alt="${data.name}" class="alumni-avatar">
                <h3 class="alumni-name">${data.name}</h3>
                <p class="alumni-role">${data.role}</p>
                <p class="alumni-company"><i class='bx bxs-business'></i> ${data.company} • Batch of ${data.batch}</p>
                <div class="alumni-tags">
                    ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="alumni-actions">
                    <button class="btn-primary" style="flex:1; justify-content:center;">View Post</button>
                    <button class="btn-outline"><i class='bx bx-envelope'></i></button>
                </div>
            </div>
        `;
    }
});
