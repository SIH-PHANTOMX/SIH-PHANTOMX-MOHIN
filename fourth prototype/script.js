// Alumni Management System JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

// Initialize Application
function initializeApp() {
	setupHeaderInteractions();
	setupSidebarNavigation();
	setupProfileInteractions(); // New function for profile menu
	setupQuickActions();
	setupAnimations();
	updateStats();
}

// Header Interactions (Hamburger & Search)
function setupHeaderInteractions() {
	const hamburger = document.querySelector('.hamburger-menu');
	const navbarSearch = document.querySelector('.navbar-search');
	const searchInput = document.querySelector('.navbar-search-input');

	// Toggle mobile search
	const searchIconMobile = document.querySelector('.search-icon-mobile');
	if (searchIconMobile && navbarSearch) {
		searchIconMobile.addEventListener('click', () => {
			navbarSearch.classList.toggle('active');
		});
	}

	// Search functionality
	if (searchInput) {
		searchInput.addEventListener('keypress', function (e) {
			if (e.key === 'Enter') {
				performSearch();
			}
		});

		// Live search simulation
		searchInput.addEventListener('input', function () {
			if (this.value.length > 2) {
				debounce(liveSearch, 300)(this.value);
			}
		});
	}
}

// Sidebar Navigation
function setupSidebarNavigation() {
	// ... (no changes here)
}

// Profile Interactions
function setupProfileInteractions() {
	const profileMenuContainer = document.querySelector('.user-profile');
	const profileImage = document.querySelector('.profile-img');
	const dropdown = document.querySelector('.profile-menu-dropdown');

	if (profileImage && dropdown) {
		// Toggle the dropdown when the profile image is clicked
		profileImage.addEventListener('click', (e) => {
			e.stopPropagation();
			dropdown.classList.toggle('active');
		});

		// Close the dropdown when clicking outside of it
		document.addEventListener('click', (e) => {
			if (!profileMenuContainer.contains(e.target)) {
				dropdown.classList.remove('active');
			}
		});
	}
}


// Quick Actions
function setupQuickActions() {
	// ... (no changes here)
}

// Animations
function setupAnimations() {
	const animatedElements = document.querySelectorAll('.animate-in');
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			}
		});
	}, {
		threshold: 0.1
	});
	animatedElements.forEach(el => observer.observe(el));
}

// Utility function for debounce
function debounce(func, delay) {
	let timeout;
	return function (...args) {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), delay);
	};
}

// Simulating API calls
function performSearch() {
	const query = document.querySelector('.navbar-search-input').value;
	console.log(`Searching for: ${query}`);
	showNotification(`Search for "${query}" initiated.`, 'info');
	// In a real application, you would fetch data here
}

function liveSearch(query) {
	console.log(`Live search for: ${query}`);
	// In a real application, this would fetch and display real-time results
}

function updateStats() {
	const stats = [{
		number: 1250,
		label: 'Total Alumni'
	}, {
		number: 780,
		label: 'Active Members'
	}, {
		number: 30,
		label: 'Events This Month'
	},];

	const statsGrid = document.querySelector('.stats-grid');
	if (statsGrid) {
		statsGrid.innerHTML = stats.map(stat => `
            <div class="stat-item">
                <div class="stat-number">${stat.number}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
	}
}

function showNotification(message, type = 'info') {
	const notification = document.createElement('div');
	notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${type === 'error' ? '#dc3545' : '#080245'};
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
    
    .alumni-item {
        transition: all 0.3s ease;
    }
    
    .profile-card {
        transition: all 0.3s ease;
    }

    .visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);