// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', updateNavbar);

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.quality-card, .expense-chart, .expense-list, .summary-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Animate progress bars when quality section is visible
const qualitySection = document.querySelector('.quality-section');
const qualityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            qualityObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

qualityObserver.observe(qualitySection);

// Chart.js Configuration
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('expenseChart');
    if (ctx) {
        const expenseChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Office Supplies', 'Shipping & Logistics', 'Equipment Maintenance', 'Utilities', 'Marketing', 'Other'],
                datasets: [{
                    data: [15, 25, 30, 12, 10, 8],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444',
                        '#8b5cf6',
                        '#6b7280'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#fff',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                cutout: '60%'
            }
        });
    }
});

// Checklist Functionality
document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.style.textDecoration = 'line-through';
            label.style.color = '#9ca3af';
        } else {
            label.style.textDecoration = 'none';
            label.style.color = '#374151';
        }
    });
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/[^\d]/g, ''));
        const increment = target / speed;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.innerText.includes('$')) {
                    counter.innerText = '$' + Math.floor(current) + 'K';
                } else {
                    counter.innerText = Math.floor(current) + '%';
                }
                setTimeout(updateCounter, 1);
            } else {
                if (counter.innerText.includes('$')) {
                    counter.innerText = '$' + target + 'K';
                } else {
                    counter.innerText = target + '%';
                }
            }
        };

        updateCounter();
    });
}

// Animate counters when hero section is visible
const heroSection = document.querySelector('.hero');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateCounters, 500);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

heroObserver.observe(heroSection);

// Add hover effects to cards
document.querySelectorAll('.quality-card, .summary-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Form validation for any future forms
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });

    return isValid;
}

// Add loading animation
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to format dates
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Add some interactive features to the expense section
document.querySelectorAll('.transaction-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.backgroundColor = '#f3f4f6';
        setTimeout(() => {
            this.style.backgroundColor = 'transparent';
        }, 200);
    });
});

// Add search functionality placeholder
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search transactions...';
    searchInput.className = 'search-input';
    
    const expenseList = document.querySelector('.expense-list');
    if (expenseList) {
        expenseList.insertBefore(searchInput, expenseList.firstChild);
        
        // Add search styles
        const style = document.createElement('style');
        style.textContent = `
            .search-input {
                width: 100%;
                padding: 12px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                margin-bottom: 1rem;
                font-size: 14px;
            }
            .search-input:focus {
                outline: none;
                border-color: #2563eb;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', addSearchFunctionality);

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.quality-section, .expense-section, .about-section');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add CSS for reveal animation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .quality-section, .expense-section, .about-section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .quality-section.active, .expense-section.active, .about-section.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(revealOnScroll, 100);
});

console.log('Quality & Expense Tracker website loaded successfully! 🚀');

