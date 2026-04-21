const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Global fetch wrapper that automatically handles JWT Authorization
 * and JSON parsing.
 */
export async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('access_token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);
        
        // Handle 401 Unauthorized (Token might be expired)
        if (response.status === 401 && endpoint !== '/auth/token/') {
            // Ideally implement token refresh logic here using refresh_token
            // For now, if unauthorized, we clear auth and redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_info');
            window.location.href = '/pages/auth/login.html';
            return { error: 'Unauthorized', status: 401 };
        }

        // If not a 2xx or 400 response, might not be JSON, but let's try to parse
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : await response.text();

        return {
            ok: response.ok,
            status: response.status,
            data
        };
    } catch (error) {
        console.warn('API Fetch Error (Backend might be down), attempting demo fallback:', error);
        
        // Mock fallback for Login/Auth so the demo data UI still works smoothly
        if (endpoint === '/auth/token/') {
            let requestedRole = 'alumni';
            try {
                if (options.body) {
                    const payload = JSON.parse(options.body);
                    if (payload.email.includes('mentor')) requestedRole = 'mentor';
                    else if (payload.email.includes('coordinator')) requestedRole = 'coordinator';
                    else if (payload.email.includes('admin')) requestedRole = 'admin';
                }
            } catch(e) {}
            localStorage.setItem('demo_mock_role', requestedRole);
            return { ok: true, data: { access: 'mock_demo_jwt_token', refresh: 'mock_demo_refresh' } };
        }
        if (endpoint === '/users/me/') {
            const demoRole = localStorage.getItem('demo_mock_role') || 'alumni';
            return { ok: true, data: { role: demoRole, email: `demo@${demoRole}.com`, name: `Demo ${demoRole.charAt(0).toUpperCase() + demoRole.slice(1)}` } };
        }
        if (endpoint === '/users/') {
            return { ok: true, data: { id: 999, message: 'Mock Registration Success' } };
        }

        return { ok: false, error: 'Backend Offline - Demo Fallback Not Configured for this Endpoint' };
    }
}

/**
 * Handle user login and JWT storage
 */
export async function login(email, password) {
    const response = await apiFetch('/auth/token/', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });

    if (response.ok && response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return await fetchUserInfo();
    }
    
    return response;
}

/**
 * Fetch and store the current user's profile information
 */
export async function fetchUserInfo() {
    const response = await apiFetch('/users/me/');
    if (response.ok) {
        localStorage.setItem('user_info', JSON.stringify(response.data));
    }
    return response;
}

/**
 * Register a new user
 */
export async function register(userData) {
    // Defaults role to alumni dynamically in model, but we can pass it explicitly
    const body = {
        ...userData,
        role: userData.role || 'alumni'
    };
    
    const response = await apiFetch('/users/', {
        method: 'POST',
        body: JSON.stringify(body)
    });
    
    return response;
}

/**
 * Clear local storage to log out
 */
export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
    window.location.href = '/index.html';
}

/**
 * Utility to get current cached user
 */
export function getCurrentUser() {
    const userStr = localStorage.getItem('user_info');
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch (e) {
        return null;
    }
}
