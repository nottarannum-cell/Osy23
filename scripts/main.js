// Mobile Menu Toggle & global UI handlers
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Image error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (!this.dataset.fallback) {
                this.dataset.fallback = 'true';
                const svg = createImagePlaceholder(this.alt || 'Image');
                this.parentNode.replaceChild(svg, this);
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Auth modal logic
    initAuthModal();
});

// ---- Auth modal & Supabase logic ----

// Initialize Supabase client in the browser
const SUPABASE_URL = 'https://jfnpwifbdndnjfxuicsd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmbnB3aWZiZG5kbmpmeHVpY3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1MDg1MTUsImV4cCI6MjA4MjA4NDUxNX0.f0X_L3sjyqbbPjW9DuarvhRiUGc3b1ElkDmMqjy_sa8';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function initAuthModal() {
    const openBtn = document.getElementById('auth-open-btn');
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('auth-close-btn');
    const form = document.getElementById('auth-form');
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const toggle = document.getElementById('auth-toggle');
    const toggleBtn = document.getElementById('auth-toggle-btn');
    const submitBtn = document.getElementById('auth-submit-btn');
    const messageEl = document.getElementById('auth-message');

    if (!openBtn || !modal || !closeBtn || !form || !title || !subtitle || !toggle || !toggleBtn || !submitBtn || !messageEl) {
        return;
    }

    let mode = 'signup'; // 'signup' or 'login'

    function openModal(initialMode = 'signup') {
        mode = initialMode;
        updateTexts();
        messageEl.textContent = '';
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    function updateTexts() {
        if (mode === 'signup') {
            title.textContent = 'Create your account';
            subtitle.textContent = 'Sign up to save your routines and access them anytime.';
            submitBtn.textContent = 'Create account';
            toggle.innerHTML = 'Already have an account? <button type="button" class="text-pink-600 font-medium hover:underline" id="auth-toggle-btn">Log in</button>';
        } else {
            title.textContent = 'Welcome back';
            subtitle.textContent = 'Log in to access your saved routines.';
            submitBtn.textContent = 'Log in';
            toggle.innerHTML = "Don't have an account? <button type=\"button\" class=\"text-pink-600 font-medium hover:underline\" id=\"auth-toggle-btn\">Sign up</button>";
        }

        // Re-bind toggle button after replacing innerHTML
        const newToggleBtn = document.getElementById('auth-toggle-btn');
        if (newToggleBtn) {
            newToggleBtn.addEventListener('click', () => {
                mode = mode === 'signup' ? 'login' : 'signup';
                updateTexts();
            });
        }
    }

    openBtn.addEventListener('click', () => openModal('signup'));
    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside the card
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('auth-email');
        const passwordInput = document.getElementById('auth-password');
        if (!emailInput || !passwordInput) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            messageEl.textContent = 'Please enter your email and password.';
            messageEl.classList.remove('text-green-600');
            messageEl.classList.add('text-red-500');
            return;
        }

        setLoading(submitBtn, true);
        messageEl.textContent = '';

        try {
            if (mode === 'signup') {
                const { data, error } = await supabaseClient.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;

                messageEl.textContent = 'Signup successful. Please check your email to confirm your account.';
                messageEl.classList.remove('text-red-500');
                messageEl.classList.add('text-green-600');
            } else {
                const { data, error } = await supabaseClient.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                messageEl.textContent = 'Login successful.';
                messageEl.classList.remove('text-red-500');
                messageEl.classList.add('text-green-600');
            }
        } catch (error) {
            messageEl.textContent = error.message || 'Unable to complete request.';
            messageEl.classList.remove('text-green-600');
            messageEl.classList.add('text-red-500');
        } finally {
            setLoading(submitBtn, false);
        }
    });

    // Initialize toggle in current DOM
    updateTexts();
}

// Create SVG placeholder for failed images
function createImagePlaceholder(alt) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '400');
    svg.setAttribute('height', '300');
    svg.setAttribute('class', 'rounded-3xl');
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'url(#gradient)');
    rect.setAttribute('rx', '24');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#FFDDE6');
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#CFEFFF');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '50%');
    text.setAttribute('y', '50%');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('fill', '#666');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.setAttribute('font-size', '16');
    text.textContent = alt || 'Image';
    
    svg.appendChild(defs);
    svg.appendChild(rect);
    svg.appendChild(text);
    
    return svg;
}

// Utility function to show loading state
function setLoading(element, isLoading) {
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

// Handle hero image error
function handleHeroImageError() {
    const container = document.getElementById('hero-image-container');
    const img = document.getElementById('hero-image');
    if (container && img) {
        img.style.display = 'none';
        container.innerHTML = `
            <div class="w-full max-w-md h-64 bg-gradient-to-br from-pink-200 to-blue-200 rounded-3xl flex items-center justify-center shadow-2xl">
                <p class="text-gray-600 font-heading text-lg">Hero Image</p>
            </div>
        `;
    }
}

// Utility function to format routine output
function formatRoutine(data) {
    return `
        <div class="result-card mt-8">
            <h3 class="text-2xl font-heading font-bold text-pink-600 mb-4">Your Personalized Routine</h3>
            <div class="space-y-2 mb-6">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Scalp:</strong> ${data.scalpType}</p>
                <p><strong>Hair Porosity:</strong> ${data.hairPorosity}</p>
            </div>
            <div class="bg-white rounded-xl p-6 mb-4">
                <h4 class="text-xl font-heading font-semibold text-blue-600 mb-3">AI-Generated Routine:</h4>
                <ul class="space-y-2 text-gray-700">
                    ${data.routine.map(item => `<li>• ${item}</li>`).join('')}
                </ul>
            </div>
            <p class="text-sm text-gray-600 italic">Note: For severe issues, consult a dermatologist.</p>
        </div>
    `;
}

