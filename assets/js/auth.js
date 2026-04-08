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

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    const btn = e.target.querySelector('.btn-submit');
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Signing in...';
    btn.disabled = true;

    setTimeout(() => {
        setUser({
            email: email,
            role: role,
            name: role === 'admin' ? 'Admin User' : 'Shubham Kulkarni',
            batch: '2020',
            department: 'Computer Engineering',
            loggedIn: true
        });

        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = '../alumni/dashboard.html';
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
