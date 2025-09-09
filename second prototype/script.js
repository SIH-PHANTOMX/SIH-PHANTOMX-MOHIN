// Alumni Management System JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupSidebarNavigation();
    setupSearchFunctionality();
    setupProfileInteractions();
    setupQuickActions();
    setupAnimations();
    updateStats();
}

// Sidebar Navigation
function setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Update main content based on selection
            const sectionName = this.querySelector('span:last-child').textContent;
            updateMainContent(sectionName);
        });
    });
}

// Update Main Content
function updateMainContent(section) {
    const mainContent = document.querySelector('.main-content');
    
    // Simple content switching simulation
    console.log(`Switching to ${section} section`);
    
    // Add loading state
    mainContent.style.opacity = '0.7';
    
    setTimeout(() => {
        mainContent.style.opacity = '1';
        showNotification(`Switched to ${section}`);
    }, 300);
}

// Search Functionality
function setupSearchFunctionality() {
    const searchInput = document.querySelector('.navbar-search-input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Live search simulation
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                debounce(liveSearch, 300)(this.value);
            }
        });
    }
}

// Perform Search
function performSearch() {
    const searchInput = document.querySelector('.navbar-search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        showNotification(`Searching for: ${query}`);
        
        // Simulate search results
        setTimeout(() => {
            const results = mockSearchResults(query);
            displaySearchResults(results);
        }, 1000);
    }
}

// Live Search
function liveSearch(query) {
    console.log(`Live searching for: ${query}`);
    // Implement live search logic here
}

// Mock Search Results
function mockSearchResults(query) {
    const mockData = [
        { name: 'Alex Johnson', position: 'Software Engineer', company: 'Microsoft', year: '2019' },
        { name: 'Sarah Williams', position: 'Product Manager', company: 'Apple', year: '2020' },
        { name: 'Mike Brown', position: 'Data Scientist', company: 'Google', year: '2018' },
        { name: 'Emma Davis', position: 'UX Designer', company: 'Adobe', year: '2021' }
    ];
    
    return mockData.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.company.toLowerCase().includes(query.toLowerCase()) ||
        item.position.toLowerCase().includes(query.toLowerCase())
    );
}

// Display Search Results
function displaySearchResults(results) {
    const alumniGrid = document.querySelector('.alumni-grid');
    
    if (!alumniGrid) return;
    
    if (results.length === 0) {
        showNotification('No results found');
        return;
    }
    
    // Clear current results
    alumniGrid.innerHTML = '';
    
    // Add new results
    results.forEach(alumni => {
        const alumniElement = createAlumniElement(alumni);
        alumniGrid.appendChild(alumniElement);
    });
    
    showNotification(`Found ${results.length} result(s)`);
}

// Create Alumni Element
function createAlumniElement(alumni) {
    const div = document.createElement('div');
    div.className = 'alumni-item';
    div.innerHTML = `
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="Alumni" class="alumni-avatar">
        <div class="alumni-info">
            <h5>${alumni.name}</h5>
            <p>${alumni.position} at ${alumni.company}</p>
        </div>
    `;
    
    // Add click event
    div.addEventListener('click', () => {
        showAlumniDetails(alumni);
    });
    
    return div;
}

// Show Alumni Details
function showAlumniDetails(alumni) {
    showNotification(`Viewing details for ${alumni.name}`);
    // In a real app, this would open a modal or navigate to a detail page
}

// Profile Interactions
function setupProfileInteractions() {
    const connectBtns = document.querySelectorAll('.btn-outline');
    const messageBtns = document.querySelectorAll('.profile-actions .btn-primary');
    const alumniItems = document.querySelectorAll('.alumni-item');
    
    // Connect buttons
    connectBtns.forEach(btn => {
        // Skip if this is the "View Updates" or "View Network" button
        if (btn.textContent.trim() === 'View Updates' || btn.textContent.trim() === 'View Network') {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification(`Opening ${this.textContent.trim()}...`);
            });
            return;
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = 'Connected';
            this.classList.remove('btn-outline');
            this.classList.add('btn-secondary');
            showNotification('Connection request sent!');
        });
    });
    
    // Message buttons
    messageBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening message composer...');
            setTimeout(() => {
                openMessageComposer();
            }, 500);
        });
    });
    
    // Alumni item interactions
    alumniItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Open Message Composer
function openMessageComposer() {
    // Simple modal simulation
    const modal = document.createElement('div');
    modal.className = 'message-modal'; // Added a class for reliable removal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(8, 2, 69, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%;">
            <h3 style="color: #080245; margin-bottom: 1rem;">Send Message</h3>
            <textarea placeholder="Type your message..." style="width: 100%; height: 120px; padding: 1rem; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 1rem; resize: vertical; font-family: 'Raleway', sans-serif; font-style: italic;"></textarea>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button class="btn-secondary" onclick="this.closest('.message-modal').remove()">Cancel</button>
                <button class="btn-primary" onclick="sendMessage()">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus textarea
    setTimeout(() => {
        modal.querySelector('textarea').focus();
    }, 100);
}

// Send Message
function sendMessage() {
    const modal = document.querySelector('.message-modal');
    const message = modal.querySelector('textarea').value;
    
    if (message.trim()) {
        showNotification('Message sent successfully!');
        modal.remove();
    } else {
        showNotification('Please enter a message', 'error');
    }
}

// Quick Actions
function setupQuickActions() {
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span:last-child').textContent;
            handleQuickAction(action);
        });
    });
}

// Handle Quick Actions
function handleQuickAction(action) {
    switch(action) {
        case 'Share a Job Posting':
            showNotification('Job posting form opened');
            break;
        case 'Create an Event':
            showNotification('Event creation form opened');
            break;
        case 'Start a Conversation':
            showNotification('Conversation starter opened');
            break;
        default:
            showNotification(`${action} feature coming soon!`);
    }
}

// Setup Animations
function setupAnimations() {
    // Animate stats on load
    animateStats();
    
    // Animate network nodes
    animateNetworkNodes();
    
    // Setup scroll animations
    setupScrollAnimations();
}

// Animate Statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const highlightValues = document.querySelectorAll('.highlight-item .value');
    
    // Animate stat numbers
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/,/g, '').replace('+', ''));
        const hasPlus = stat.textContent.includes('+');
        animateNumber(stat, 0, finalValue, 2000, hasPlus ? '+' : '');
    });
    
    // Animate highlight values
    highlightValues.forEach(value => {
        const finalValue = parseInt(value.textContent.replace(/,/g, ''));
        animateNumber(value, 0, finalValue, 1500);
    });
}

// Animate Number
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = Date.now();
    const range = end - start;
    
    function updateNumber() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (range * easeOutQuart));
        
        // Format number with commas if > 999
        const formatted = current > 999 ? current.toLocaleString() : current;
        element.textContent = formatted + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    updateNumber();
}

// Animate Network Nodes
function animateNetworkNodes() {
    const nodes = document.querySelectorAll('.network-node');
    
    nodes.forEach((node, index) => {
        // Initial setup
        node.style.opacity = '0';
        node.style.transform = 'scale(0)';
        node.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'scale(1)';
        }, index * 300);
    });
    
    // Add floating animation to network nodes
    setTimeout(() => {
        nodes.forEach((node, index) => {
            if (!node.classList.contains('central')) {
                const floatAnimation = `float${index}`;
                const keyframes = `
                    @keyframes ${floatAnimation} {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        33% { transform: translateY(-8px) rotate(2deg); }
                        66% { transform: translateY(4px) rotate(-1deg); }
                    }
                `;
                
                // Add keyframes to stylesheet
                const style = document.createElement('style');
                style.textContent = keyframes;
                document.head.appendChild(style);
                
                // Apply animation
                node.style.animation = `${floatAnimation} ${3 + index}s ease-in-out infinite`;
                node.style.animationDelay = `${index * 0.5}s`;
            }
        });
    }, 2000);
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.stats-card, .alumni-highlights-card, .profile-card, .alumni-item, .network-card, .quick-actions').forEach(el => {
        observer.observe(el);
    });
}

// Update Stats (simulate real-time updates)
function updateStats() {
    setInterval(() => {
        // Simulate random stat updates for highlight values
        const highlightValues = document.querySelectorAll('.highlight-item .value');
        highlightValues.forEach(value => {
            const current = parseInt(value.textContent);
            const change = Math.floor(Math.random() * 6) - 3; // -3 to +3
            const newValue = Math.max(0, current + change);
            value.textContent = newValue;
        });
    }, 15000); // Update every 15 seconds
}

// Utility Functions
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : '#080245'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .network-node {
        transition: all 0.3s ease;
    }
    
    .network-node:hover {
        transform: scale(1.1) !important;
    }
    
    .alumni-item {
        transition: all 0.3s ease;
    }
    
    .profile-card, .stats-card, .alumni-highlights-card {
        transition: all 0.3s ease;
    }
    
    .profile-card:hover, .stats-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);