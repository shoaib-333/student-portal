// Mock user data
const mockUsers = {
    'shoaibkhan@gmail.com': {
        email: 'shoaibkhan@gmail.com',
        password: '12345678',
        name: 'Shoaib Khan',
        role: 'student',
        year: '3rd Year',
        department: 'Computer Science',
        courses: ['Web Development', 'Data Structures', 'Database Systems', 'Machine Learning']
    },
    'professor@university.edu': {
        email: 'professor@university.edu',
        password: 'prof123',
        name: 'Dr. Sarah Wilson',
        role: 'professor',
        department: 'Computer Science',
        courses: ['Web Development', 'Database Systems']
    }
};

// Mock course data
const mockCourses = {
    'Web Development': {
        instructor: 'Dr. Sarah Wilson',
        progress: 75,
        assignments: [
            { title: 'HTML/CSS Project', dueDate: '2024-03-20', status: 'pending' },
            { title: 'JavaScript Basics', dueDate: '2024-03-15', status: 'completed' }
        ],
        quizzes: [
            { title: 'Frontend Fundamentals', date: '2024-03-18', duration: '30 min' },
            { title: 'React Basics', date: '2024-03-25', duration: '45 min' }
        ]
    },
    'Data Structures': {
        instructor: 'Dr. Michael Brown',
        progress: 60,
        assignments: [
            { title: 'Binary Trees Implementation', dueDate: '2024-03-22', status: 'pending' },
            { title: 'Sorting Algorithms', dueDate: '2024-03-10', status: 'completed' }
        ],
        quizzes: [
            { title: 'Trees and Graphs', date: '2024-03-19', duration: '40 min' }
        ]
    }
};

// Show notification function
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginBtn = this.querySelector('.login-btn');
        
        // Show loading state
        loginBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            const user = mockUsers[email];
            if (user && user.password === password) {
                // Store user info in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(user));
                showNotification('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showNotification('Invalid email or password', 'error');
                loginBtn.classList.remove('loading');
            }
        }, 1500);
    });
}

// Dashboard functionality
if (document.querySelector('.dashboard')) {
    // Get user info
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        // Update welcome message
        const welcomeMessage = document.querySelector('.dashboard-header h1');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome back, ${user.name}!`;
        }

        // Update profile information
        const profileName = document.querySelector('.profile-header h2');
        if (profileName) {
            profileName.textContent = user.name;
        }

        // Update course information
        if (user.courses) {
            const courseCards = document.querySelectorAll('.course-card');
            courseCards.forEach((card, index) => {
                const course = mockCourses[user.courses[index]];
                if (course) {
                    const progressBar = card.querySelector('.progress');
                    if (progressBar) {
                        progressBar.style.width = `${course.progress}%`;
                    }
                }
            });
        }
    }

    // Dashboard navigation
    const menuItems = document.querySelectorAll('.menu-item');
    const pages = document.querySelectorAll('.page');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => {
                page.style.display = 'none';
                page.style.opacity = '0';
            });
            
            // Show selected page with animation
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                const selectedPage = document.getElementById(`${pageId}-page`);
                selectedPage.style.display = 'block';
                setTimeout(() => {
                    selectedPage.style.opacity = '1';
                }, 50);
            }
        });
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('user');
            showNotification('Logging out...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }

    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-header').prepend(menuToggle);

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Add some additional styling for badges and progress bars
const style = document.createElement('style');
style.textContent = `
    .badge {
        background: #667eea;
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
        transition: all 0.3s ease;
    }
    
    .badge:hover {
        transform: scale(1.05);
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: #eee;
        border-radius: 4px;
        margin-top: 10px;
        overflow: hidden;
    }
    
    .progress {
        height: 100%;
        background: #667eea;
        border-radius: 4px;
        transition: width 0.5s ease;
    }
    
    .profile-picture {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 20px;
        transition: transform 0.3s ease;
    }
    
    .profile-picture:hover {
        transform: scale(1.05);
    }
    
    .profile-header {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .profile-details {
        display: grid;
        gap: 15px;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 8px;
        transition: background 0.3s ease;
    }
    
    .detail-item:hover {
        background: #f5f6fa;
    }
    
    .detail-item i {
        color: #667eea;
        width: 20px;
    }

    .menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: #333;
        cursor: pointer;
        padding: 5px;
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: block;
        }
    }
`;
document.head.appendChild(style); 