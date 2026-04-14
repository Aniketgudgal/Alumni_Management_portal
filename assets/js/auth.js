// ============================================
// MODULE 2 & 3: AUTH LOGIC (Login & Registration)
// ============================================

// ===== ROLE TAB SWITCHING =====
document.querySelectorAll('.role-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// ===== PASSWORD TOGGLE =====
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bx-hide', 'bx-show');
    } else {
        input.type = 'password';
        icon.classList.replace('bx-show', 'bx-hide');
    }
}

// ===== PASSWORD STRENGTH METER =====
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength; // 0-5
}

function updateStrengthMeter(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const meter = document.getElementById('strengthMeter');
    const label = document.getElementById('strengthLabel');
    if (!meter || !label) return;

    const strength = checkPasswordStrength(input.value);
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const width = (strength / 5) * 100;

    meter.style.width = width + '%';
    meter.style.background = colors[strength - 1] || '#e2e8f0';
    label.textContent = input.value ? (labels[strength - 1] || 'Very Weak') : '';
    label.style.color = colors[strength - 1] || '#94a3b8';
}

// ===== LOGIN HANDLER =====
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const activeRole = document.querySelector('.role-tab.active');
    const role = activeRole ? activeRole.dataset.role : 'alumni';

    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Role-based credential validation
    const credentials = {
        alumni:      { email: 'shubham@alumni.com',          password: 'password123' },
        mentor:      { email: 'mentor@dvvpcoe.edu.in',       password: 'password123' },
        coordinator: { email: 'coordinator@dvvpcoe.edu.in',  password: 'password123' },
        admin:       { email: 'admin@dvvpcoe.edu.in',        password: 'password123' }
    };

    const cred = credentials[role] || credentials.alumni;
    if (email !== cred.email || password !== cred.password) {
        showToast(`Invalid credentials. Use ${cred.email} / ${cred.password}`, 'error');
        return;
    }

    const btn = e.target.querySelector('.btn-submit');
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Signing in...';
    btn.disabled = true;

    // Role-based user profiles
    const userProfiles = {
        alumni:      { name: 'Shubham Kulkarni', batch: '2020', department: 'Computer Engineering' },
        mentor:      { name: 'Prof. R. D. More', batch: '', department: 'Computer Engineering' },
        coordinator: { name: 'Dr. Anjali Mehta', batch: '', department: 'Computer Engineering' },
        admin:       { name: 'Principal Admin', batch: '', department: 'All Departments' }
    };

    // Role-based dashboard routing
    const dashboardRoutes = {
        alumni:      '../alumni/dashboard.html',
        mentor:      '../mentor/dashboard.html',
        coordinator: '../coordinator/dashboard.html',
        admin:       '../admin/dashboard.html'
    };

    setTimeout(() => {
        const profile = userProfiles[role] || userProfiles.alumni;
        setUser({
            email: email,
            role: role,
            name: profile.name,
            batch: profile.batch,
            department: profile.department,
            loggedIn: true
        });

        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = dashboardRoutes[role] || dashboardRoutes.alumni;
        }, 1000);
    }, 1500);
}

// ===== MULTI-STEP REGISTRATION =====
let currentStep = 1;

function nextStep(step) {
    // Basic validation before proceeding
    if (!validateStep(currentStep)) return;

    document.getElementById(`step${currentStep}`).style.display = 'none';
    document.getElementById(`step${step}`).style.display = 'block';
    updateProgress(step);
    currentStep = step;
    document.querySelector('.auth-form-panel').scrollTop = 0;
}

function prevStep(step) {
    document.getElementById(`step${currentStep}`).style.display = 'none';
    document.getElementById(`step${step}`).style.display = 'block';
    updateProgress(step);
    currentStep = step;
    document.querySelector('.auth-form-panel').scrollTop = 0;
}

function validateStep(step) {
    const stepEl = document.getElementById(`step${step}`);
    const requiredInputs = stepEl.querySelectorAll('input[required], select[required]');
    let valid = true;

    requiredInputs.forEach(inp => {
        if (!inp.value.trim()) {
            inp.style.borderColor = '#ef4444';
            inp.addEventListener('input', () => inp.style.borderColor = '', { once: true });
            valid = false;
        }
    });

    if (!valid) showToast('Please fill in all required fields', 'error');
    return valid;
}

function updateProgress(activeStep) {
    const steps = document.querySelectorAll('.reg-step');
    const lines = document.querySelectorAll('.step-line');

    steps.forEach((s, i) => {
        const stepNum = i + 1;
        s.classList.remove('active', 'completed');
        if (stepNum < activeStep) {
            s.classList.add('completed');
        } else if (stepNum === activeStep) {
            s.classList.add('active');
        }
    });

    lines.forEach((line, i) => {
        line.classList.remove('active', 'completed');
        if (i < activeStep - 2) {
            line.classList.add('completed');
        } else if (i === activeStep - 2) {
            line.classList.add('active');
        }
    });
}

// ===== REGISTRATION HANDLER =====
function handleRegistration(e) {
    e.preventDefault();

    const password = document.getElementById('regPassword');
    const confirmPassword = document.getElementById('regConfirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        showToast('Passwords do not match!', 'error');
        return;
    }

    if (password && password.value.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Creating Account...';
    btn.disabled = true;

    setTimeout(() => {
        showToast('Registration successful! Redirecting to login...', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }, 2000);
}

// ===== PHOTO PREVIEW =====
function previewPhoto(input) {
    const preview = document.getElementById('photoPreview');
    if (input.files && input.files[0]) {
        // Validate file size (max 2MB)
        if (input.files[0].size > 2 * 1024 * 1024) {
            showToast('Photo must be less than 2MB', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// ===== AI RESUME PARSER (MOCK) =====
function handleResumeDrop(e) {
    e.preventDefault();
    const box = document.getElementById('aiResumeBox');
    const loader = document.getElementById('aiResumeLoader');
    box.style.borderColor = 'var(--primary)';
    
    // Attempt to grab the file either from drag or the file input
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if(!file) return;
    if(file.type !== 'application/pdf') {
        showToast('Please upload a PDF document for best AI parsing.', 'error');
        box.style.borderColor = 'var(--border)';
        return;
    }

    loader.style.display = 'block';

    setTimeout(() => {
        loader.style.display = 'none';
        box.classList.add('success');
        box.querySelector('h4').textContent = 'Extraction Complete! ✅';
        box.querySelector('p').textContent = `Parsed: ${file.name}`;
        
        // --- AUTO FILL LOGIC (Simulated NLP Extraction) ---
        // Fill Personal
        const inputs = document.querySelectorAll('#step1 input[type="text"]');
        if(inputs[0]) inputs[0].value = 'Alexander';
        if(inputs[1]) inputs[1].value = 'Innovator';
        
        const tel = document.querySelector('#step1 input[type="tel"]');
        if(tel) tel.value = '+91 9876543210';
        
        // Fill Academic (Step 2)
        const ac_selects = document.querySelectorAll('#step2 select');
        if(ac_selects[0]) ac_selects[0].value = 'Computer Engineering';
        if(ac_selects[1]) ac_selects[1].value = '2022';
        
        // Fill Professional (Step 3)
        const prof_inputs = document.querySelectorAll('#step3 input[type="text"]');
        if(prof_inputs[0]) prof_inputs[0].value = 'Senior Machine Learning Engineer';
        if(prof_inputs[1]) prof_inputs[1].value = 'Amazon Web Services';
        if(prof_inputs[2]) prof_inputs[2].value = 'Python, TensorFlow, System Design, React';
        if(prof_inputs[3]) prof_inputs[3].value = 'Bangalore';
        if(prof_inputs[4]) prof_inputs[4].value = 'Karnataka';

        const prof_selects = document.querySelectorAll('#step3 select');
        if(prof_selects[0]) prof_selects[0].value = '2-5 years';
        
        showToast('AI successfully populated your profile details!', 'success');
    }, 2000);
}
