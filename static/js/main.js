// ========== THEME TOGGLE ==========
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
        themeIcon.className = 'bi bi-sun-fill';
    } else {
        themeIcon.className = 'bi bi-moon-stars-fill';
    }
}

// Load saved theme on page start (no flash)
(function() {
    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || 'dark';
    applyTheme(saved);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
});

// ========== NAVBAR SCROLL ==========
// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 40) {
            nav.style.borderBottomColor = 'rgba(0,229,160,0.15)';
        } else {
            nav.style.borderBottomColor = 'var(--border)';
        }
    }
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar-fill');
if (skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = e.target.getAttribute('data-width') || e.target.style.width;
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = w; }, 300);
    });
}

// Contact form demo submit
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type=submit]');
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Відправляю...';
        btn.disabled = true;
        setTimeout(() => {
            form.reset();
            btn.innerHTML = '<i class="bi bi-send me-2"></i>Відправити';
            btn.disabled = false;
            document.getElementById('formSuccess').classList.remove('d-none');
        }, 1200);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

// Footer year
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
