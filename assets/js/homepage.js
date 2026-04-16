// ============================================
// ALUMNI PORTAL - HOMEPAGE ENGINE (Light Theme)
// Uses APP_DATA from data.js as single source of truth
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    var D = window.APP_DATA || {};

    // ===== NAVBAR SCROLL =====
    var navbar = document.getElementById('hpNavbar');
    window.addEventListener('scroll', function() {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
        var st = document.getElementById('hpScrollTop');
        if (st) st.classList.toggle('visible', window.scrollY > 600);
    });

    // ===== MOBILE MENU =====
    window.toggleHpMobile = function() {
        var m = document.getElementById('hpMobileMenu');
        var btn = document.getElementById('hpMobileToggle');
        if (!m || !btn) return;
        m.classList.toggle('open');
        btn.innerHTML = m.classList.contains('open')
            ? "<i class='bx bx-x'></i>"
            : "<i class='bx bx-menu'></i>";
    };

    // ===== HERO STATS (populate from APP_DATA.stats) =====
    if (D.stats) {
        var statEls = {
            hpStatAlumni: { val: D.stats.totalAlumni, suffix: '+' },
            hpStatCompanies: { val: D.stats.companiesHiring, suffix: '+' },
            hpStatMentors: { val: D.stats.activeMentors, suffix: '' }
        };
        Object.keys(statEls).forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.textContent = statEls[id].val.toLocaleString() + statEls[id].suffix;
        });
    }

    // ===== HERO FEED (built from real alumni + activities) =====
    var heroFeed = document.getElementById('hpHeroFeed');
    if (heroFeed && D.activities) {
        var tagColors = {
            purple: { bg: 'rgba(139,92,246,0.1)', fg: '#8b5cf6', label: 'New' },
            green: { bg: 'rgba(16,185,129,0.1)', fg: '#10b981', label: 'Event' },
            blue: { bg: 'rgba(79,70,229,0.1)', fg: '#4f46e5', label: 'Job' },
            amber: { bg: 'rgba(245,158,11,0.1)', fg: '#f59e0b', label: 'Alert' },
            red: { bg: 'rgba(239,68,68,0.1)', fg: '#ef4444', label: 'Chat' }
        };
        heroFeed.innerHTML = D.activities.slice(0, 3).map(function(a) {
            var tc = tagColors[a.color] || tagColors.purple;
            var avatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(a.title.substring(0,2)) + '&background=4f46e5&color=fff';
            // Try to match with a topAlumni avatar
            if (D.topAlumni) {
                D.topAlumni.forEach(function(al) {
                    if (a.desc.indexOf(al.name) !== -1) avatar = al.avatar;
                });
            }
            return '<div class="hp-feed-row">'
                + '<img src="' + avatar + '" alt="activity">'
                + '<div style="flex:1;min-width:0;">'
                + '<div class="fr-name">' + a.title + '</div>'
                + '<div class="fr-sub">' + a.desc + '</div>'
                + '</div>'
                + '<span class="fr-tag" style="background:' + tc.bg + ';color:' + tc.fg + ';">' + tc.label + '</span>'
                + '</div>';
        }).join('');
    }

    // ===== ALUMNI AVATAR MARQUEE (from topAlumni) =====
    var amTrack = document.getElementById('hpAMTrack');
    if (amTrack && D.topAlumni) {
        var amItems = D.topAlumni.map(function(a) {
            var safeName = a.name.replace(/'/g, "\\'");
            return '<div class="hp-am-item" onclick="openHpAlumniModal(\'' + safeName + '\')">'
                + '<img src="' + a.avatar + '" alt="' + a.name + '">'
                + '<div class="hp-am-name">' + a.name + '</div>'
                + '<div class="hp-am-company">' + a.company + '</div>'
                + '</div>';
        });
        amTrack.innerHTML = amItems.join('') + amItems.join('');
    }

    // ===== WHY JOIN (from APP_DATA.whyJoin) =====
    var whyColors = [
        { color: '#4f46e5', bg: 'rgba(79,70,229,0.08)' },
        { color: '#06b6d4', bg: 'rgba(6,182,212,0.08)' },
        { color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
        { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
        { color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
        { color: '#ef4444', bg: 'rgba(239,68,68,0.08)' }
    ];
    var whyGrid = document.getElementById('hpWhyGrid');
    if (whyGrid && D.whyJoin) {
        whyGrid.innerHTML = D.whyJoin.map(function(b, i) {
            var c = whyColors[i % whyColors.length];
            return '<div class="hp-why-card fade-up" style="transition-delay:' + (i * 0.08) + 's;">'
                + '<div class="hp-why-icon" style="background:' + c.bg + ';color:' + c.color + ';"><i class="bx ' + b.icon + '"></i></div>'
                + '<h3>' + b.title + '</h3>'
                + '<p>' + b.desc + '</p>'
                + '</div>';
        }).join('');
    }

    // ===== STATS BANNER (from APP_DATA.stats) =====
    var statsBanner = document.getElementById('hpStatsBanner');
    if (statsBanner && D.stats) {
        var bannerData = [
            { emoji: '&#127891;', val: D.stats.totalAlumni.toLocaleString() + '+', label: 'Total Alumni' },
            { emoji: '&#127970;', val: D.stats.companiesHiring.toLocaleString() + '+', label: 'Hiring Companies' },
            { emoji: '&#128188;', val: D.stats.studentsPlaced.toLocaleString() + '+', label: 'Students Placed' },
            { emoji: '&#127914;', val: D.stats.eventsConducted.toLocaleString() + '+', label: 'Events Conducted' }
        ];
        var delays = ['', 'fade-up-d1', 'fade-up-d2', 'fade-up-d3'];
        statsBanner.innerHTML = bannerData.map(function(s, i) {
            return '<div class="hp-stat-item fade-up ' + delays[i] + '">'
                + '<span class="stat-emoji">' + s.emoji + '</span>'
                + '<span class="stat-number">' + s.val + '</span>'
                + '<span class="stat-label">' + s.label + '</span>'
                + '</div>';
        }).join('');
    }

    // ===== ALUMNI GRID (from topAlumni) =====
    var alumniGrid = document.getElementById('hpAlumniGrid');
    if (alumniGrid && D.topAlumni) {
        alumniGrid.innerHTML = D.topAlumni.slice(0, 8).map(function(a) {
            var safeName = a.name.replace(/'/g, "\\'");
            return '<div class="hp-alumni-card fade-up" onclick="openHpAlumniModal(\'' + safeName + '\')">'
                + '<img class="ac-avatar" src="' + a.avatar + '" alt="' + a.name + '">'
                + '<div class="ac-name">' + a.name + '</div>'
                + '<div class="ac-role">' + a.role + '</div>'
                + '<div class="ac-company"><i class="bx bxs-buildings" style="font-size:13px;"></i> ' + a.company + '</div>'
                + '<div class="ac-batch">Batch ' + a.batch + '</div>'
                + '<div class="ac-tags">' + (a.tags || []).map(function(t) { return '<span class="ac-tag">' + t + '</span>'; }).join('') + '</div>'
                + '<button class="ac-btn"><i class="bx bx-user-plus"></i> Connect</button>'
                + '</div>';
        }).join('');
    }

    // ===== JOBS GRID (from APP_DATA.jobs) =====
    var jobsGrid = document.getElementById('hpJobsGrid');
    if (jobsGrid && D.jobs) {
        var badgeMap = { 'Full-time': 'ft', 'Internship': 'intern', 'Part-time': 'pt' };
        jobsGrid.innerHTML = D.jobs.slice(0, 6).map(function(j) {
            var bc = badgeMap[j.type] || 'ft';
            return '<div class="hp-job-card fade-up">'
                + '<div class="hp-jc-header">'
                + '<div class="hp-jc-logo"><i class="bx bxs-buildings"></i></div>'
                + '<span class="hp-jc-badge ' + bc + '">' + (j.type || 'Full-time') + '</span>'
                + '</div>'
                + '<h3>' + j.title + '</h3>'
                + '<div class="jc-company">' + j.company + '</div>'
                + '<div class="hp-jc-meta">'
                + '<span><i class="bx bx-map"></i> ' + (j.location || 'India') + '</span>'
                + '<span><i class="bx bx-time-five"></i> ' + (j.experience || 'Fresher') + '</span>'
                + '<span><i class="bx bx-user"></i> ' + (j.postedBy || 'Alumni') + '</span>'
                + '</div>'
                + '<button class="hp-jc-apply" onclick="window.location.href=\'pages/auth/register.html\'"><i class="bx bx-link-external"></i> View & Apply</button>'
                + '</div>';
        }).join('');
    }

    // ===== EVENTS GRID (from APP_DATA.events) =====
    var eventsGrid = document.getElementById('hpEventsGrid');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    if (eventsGrid && D.events) {
        eventsGrid.innerHTML = D.events.slice(0, 4).map(function(ev) {
            var d = new Date(ev.date);
            var day = isNaN(d.getTime()) ? '?' : d.getDate();
            var month = isNaN(d.getTime()) ? 'TBA' : months[d.getMonth()];
            var year = isNaN(d.getTime()) ? '' : d.getFullYear();
            return '<div class="hp-event-card fade-up">'
                + '<div class="hp-ev-date">'
                + '<div class="ev-month">' + month + '</div>'
                + '<div class="ev-day">' + day + '</div>'
                + '<div class="ev-year">' + year + '</div>'
                + '</div>'
                + '<div class="hp-ev-body">'
                + '<h3>' + ev.title + '</h3>'
                + '<p class="ev-desc">' + (ev.description || 'An exciting event for alumni to connect and grow together.') + '</p>'
                + '<div class="hp-ev-meta">'
                + '<span><i class="bx bx-time-five"></i> ' + (ev.time || 'TBA') + '</span>'
                + '<span><i class="bx bx-map"></i> ' + (ev.location || 'Campus') + '</span>'
                + '<span><i class="bx bx-user-check"></i> ' + (ev.attendees || 0) + ' Attending</span>'
                + '</div>'
                + '<button class="hp-ev-register" onclick="window.location.href=\'pages/auth/register.html\'"><i class="bx bx-calendar-check"></i> Register Now</button>'
                + '</div>'
                + '</div>';
        }).join('');
    }

    // ===== TESTIMONIALS (from APP_DATA.testimonials) =====
    var tTrack = document.getElementById('hpTestTrack');
    if (tTrack && D.testimonials) {
        tTrack.innerHTML = D.testimonials.map(function(t) {
            var stars = '';
            for (var i = 0; i < (t.rating || 5); i++) stars += '<i class="bx bxs-star"></i>';
            for (var j = (t.rating || 5); j < 5; j++) stars += '<i class="bx bx-star"></i>';
            return '<div class="hp-test-card">'
                + '<div class="hp-tc-stars">' + stars + '</div>'
                + '<p class="hp-tc-quote">"' + t.text + '"</p>'
                + '<div class="hp-tc-author">'
                + '<img src="' + t.avatar + '" alt="' + t.name + '">'
                + '<div>'
                + '<div class="hp-tc-author-name">' + t.name + '</div>'
                + '<div class="hp-tc-author-role">' + t.role + '</div>'
                + '</div></div></div>';
        }).join('');
    }

    window.scrollHpTestimonials = function(dir) {
        var track = document.getElementById('hpTestTrack');
        if (track) track.scrollBy({ left: dir * 380, behavior: 'smooth' });
    };

    // ===== ANIMATED COUNTERS =====
    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var text = el.textContent;
            var numMatch = text.match(/[\d,]+/);
            if (numMatch) {
                var target = parseInt(numMatch[0].replace(/,/g, ''));
                var suffix = text.replace(numMatch[0], '');
                var current = 0;
                var increment = target / 60;
                var timer = setInterval(function() {
                    current += increment;
                    if (current >= target) { current = target; clearInterval(timer); }
                    el.textContent = Math.floor(current).toLocaleString() + suffix;
                }, 25);
            }
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(function(el) { counterObserver.observe(el); });

    // ===== FADE UP ANIMATIONS =====
    var fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });

    // Hero fades immediately
    setTimeout(function() {
        document.querySelectorAll('.hp-hero .fade-up').forEach(function(el, i) {
            setTimeout(function() { el.classList.add('visible'); }, 100 + i * 80);
        });
    }, 50);

    // ===== ALUMNI MODAL =====
    window.openHpAlumniModal = function(name) {
        if (!D.topAlumni) return;
        var a = D.topAlumni.find(function(x) { return x.name === name; });
        if (!a) return;
        var mc = document.getElementById('hpModalContent');
        if (!mc) return;
        mc.innerHTML =
            '<img src="' + a.avatar + '" style="width:90px;height:90px;border-radius:50%;margin-bottom:16px;border:3px solid #eef2ff;box-shadow:0 4px 20px rgba(79,70,229,0.2);">'
            + '<h2 style="font-size:22px;font-weight:800;margin-bottom:6px;color:#0f172a;">' + a.name + '</h2>'
            + '<p style="color:#4f46e5;font-weight:700;font-size:14px;margin-bottom:4px;">' + a.role + '</p>'
            + '<p style="color:#94a3b8;font-size:13px;margin-bottom:18px;">' + a.company + ' - Batch ' + a.batch + '</p>'
            + '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:24px;">'
            + (a.tags || []).map(function(t) { return '<span style="background:#eef2ff;color:#4f46e5;padding:5px 12px;border-radius:14px;font-size:12px;font-weight:700;">' + t + '</span>'; }).join('')
            + '</div>'
            + '<div style="background:#f8fafc;border-radius:14px;padding:20px;border:1px solid #e2e8f0;margin-bottom:20px;">'
            + '<p style="font-size:14px;color:#475569;margin-bottom:16px;"><strong>Want to connect with ' + a.name.split(' ')[0] + '?</strong><br>Join the alumni network to message, get mentored, and explore full profiles.</p>'
            + '<a href="pages/auth/register.html" class="hp-btn hp-btn-primary" style="width:100%;justify-content:center;"><i class="bx bxs-rocket"></i> Join Free to Connect</a>'
            + '</div>';
        document.getElementById('hpAlumniModal').classList.add('active');
    };
    window.closeHpAlumniModal = function() {
        document.getElementById('hpAlumniModal').classList.remove('active');
    };
    var modalOverlay = document.getElementById('hpAlumniModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeHpAlumniModal();
        });
    }

    // ===== GALLERY =====
    var galleryGrid = document.getElementById('hpGalleryGrid');
    var galleryFilters = document.getElementById('hpGalleryFilters');
    var galleryItemsData = (D.galleryItems || []);

    if (galleryGrid && galleryItemsData.length) {
        renderGallery(galleryItemsData);

        if (galleryFilters && D.galleryCategories) {
            galleryFilters.innerHTML = D.galleryCategories.map(function(cat) {
                return '<button class="hp-gf-btn' + (cat === 'All' ? ' active' : '') + '" data-cat="' + cat + '">' + cat + '</button>';
            }).join('');

            galleryFilters.addEventListener('click', function(e) {
                var btn = e.target.closest('.hp-gf-btn');
                if (!btn) return;
                galleryFilters.querySelectorAll('.hp-gf-btn').forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                var cat = btn.getAttribute('data-cat');
                var filtered = cat === 'All' ? galleryItemsData : galleryItemsData.filter(function(g) { return g.category === cat; });
                renderGallery(filtered);
            });
        }
    }

    function renderGallery(items) {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = items.map(function(g, i) {
            return '<div class="hp-gallery-item fade-up scale-in" style="animation-delay:' + (i * 0.06) + 's;" onclick="openHpLightbox(' + i + ')">'
                + '<div class="gi-inner" style="background:' + g.color + ';">'
                + '<button class="gi-zoom"><i class="bx bx-expand"></i></button>'
                + '<div class="gi-overlay">'
                + '<h4>' + (g.title || 'Gallery Image') + '</h4>'
                + '<span>' + g.category + '</span>'
                + '</div></div></div>';
        }).join('');
        galleryGrid.querySelectorAll('.fade-up').forEach(function(el) { fadeObserver.observe(el); });
        window._hpLBItems = items;
    }

    // ===== LIGHTBOX =====
    window._hpLBIndex = 0;
    window._hpLBItems = galleryItemsData;

    window.openHpLightbox = function(index) {
        var items = window._hpLBItems || [];
        if (index < 0 || index >= items.length) return;
        window._hpLBIndex = index;
        var g = items[index];
        var lb = document.getElementById('hpLightbox');
        if (!lb) return;
        lb.querySelector('.hp-lb-visual').style.background = g.color;
        lb.querySelector('.hp-lb-visual').innerHTML = '<i class="bx bxs-image"></i>';
        lb.querySelector('.hp-lb-title').textContent = g.title || 'Gallery Image';
        lb.querySelector('.hp-lb-cat').textContent = g.category;
        lb.querySelector('.hp-lb-counter').textContent = (index + 1) + ' / ' + items.length;
        lb.classList.add('active');
    };
    window.closeHpLightbox = function() {
        var lb = document.getElementById('hpLightbox');
        if (lb) lb.classList.remove('active');
    };
    window.navigateHpLB = function(dir) {
        var items = window._hpLBItems || [];
        var newIdx = window._hpLBIndex + dir;
        if (newIdx < 0) newIdx = items.length - 1;
        if (newIdx >= items.length) newIdx = 0;
        openHpLightbox(newIdx);
    };

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        var lb = document.getElementById('hpLightbox');
        if (lb && lb.classList.contains('active')) {
            if (e.key === 'Escape') { closeHpLightbox(); return; }
            if (e.key === 'ArrowLeft') { navigateHpLB(-1); return; }
            if (e.key === 'ArrowRight') { navigateHpLB(1); return; }
        }
        if (e.key === 'Escape') {
            closeHpAlumniModal();
        }
    });

    // ===== ACTIVE NAV ON SCROLL =====
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        var sp = window.scrollY + 200;
        sections.forEach(function(sec) {
            var link = document.querySelector('.hp-nav-menu a[href="#' + sec.id + '"]');
            if (link) {
                link.classList.toggle('active', sp >= sec.offsetTop && sp < sec.offsetTop + sec.offsetHeight);
            }
        });
    });

});
