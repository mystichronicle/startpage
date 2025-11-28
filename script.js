// ========================================
// Modern Dark Startpage JavaScript
// ========================================

// ========================================
// Settings Configuration
// ========================================

const settings = {
    timeFormat: localStorage.getItem('timeFormat') || '12',
    tempUnit: localStorage.getItem('tempUnit') || 'F',
    theme: localStorage.getItem('theme') || 'dark'
};

// Apply theme on load
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    settings.theme = theme;
    localStorage.setItem('theme', theme);
}

// Apply saved theme immediately
applyTheme(settings.theme);

// Search Engine Configuration
const searchEngines = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/search?q=',
        icon: ''
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=',
        icon: '󰇥'
    },
    github: {
        name: 'GitHub',
        url: 'https://github.com/search?q=',
        icon: ''
    },
    youtube: {
        name: 'YouTube',
        url: 'https://www.youtube.com/results?search_query=',
        icon: '󰗃'
    }
};

// State
let currentEngine = 'google';

// DOM Elements
const searchInput = document.getElementById('search');
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const greetingElement = document.getElementById('greeting');
const weatherElement = document.getElementById('weather');
const quoteElement = document.getElementById('quote');
const engineButtons = document.querySelectorAll('.engine');

// ========================================
// Time & Date Functions
// ========================================

function updateDateTime() {
    const now = new Date();
    
    // Format time based on setting
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    let timeString;
    
    if (settings.timeFormat === '12') {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        timeString = `${hours}:${minutes} ${period}`;
    } else {
        timeString = `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    
    timeElement.textContent = timeString;
    
    // Format date
    const options = { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
    };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
    
    // Update greeting based on time
    updateGreeting(now.getHours());
}

// User's name for personalized greeting
const userName = 'Bryan';

function updateGreeting(hour) {
    let greeting, iconHtml;
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
        iconHtml = '<span class="nf-icon">󰖜</span>'; // sunrise (nerd font)
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
        iconHtml = '<i class="fa-solid fa-sun"></i>'; // sun
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good evening';
        iconHtml = '<span class="nf-icon">󰖛</span>'; // sunset (nerd font)
    } else {
        greeting = 'Good night';
        iconHtml = '<i class="fa-solid fa-moon"></i>'; // moon
    }
    
    greetingElement.textContent = `${greeting}, ${userName}`;
    const iconElement = document.getElementById('greeting-icon');
    if (iconElement) {
        iconElement.innerHTML = iconHtml;
    }
}

// ========================================
// Search Functions
// ========================================

function performSearch(query) {
    if (!query.trim()) return;
    
    const engine = searchEngines[currentEngine];
    const searchUrl = engine.url + encodeURIComponent(query);
    window.location.href = searchUrl;
}

function setSearchEngine(engine) {
    if (!searchEngines[engine]) return;
    
    currentEngine = engine;
    localStorage.setItem('preferredEngine', engine);
    
    // Update active state
    engineButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.engine === engine);
    });
    
    // Update placeholder
    searchInput.placeholder = `Search ${searchEngines[engine].name}...`;
}

// ========================================
// Weather Function (Mock - replace with real API)
// ========================================

function updateWeather() {
    // Mock weather data - replace with actual API call
    // Example with OpenWeatherMap: https://api.openweathermap.org/data/2.5/weather
    
    const mockWeatherData = [
        { tempF: 72, condition: 'Partly Cloudy', icon: '󰖐' },
        { tempF: 64, condition: 'Cloudy', icon: '' },
        { tempF: 77, condition: 'Sunny', icon: '' },
        { tempF: 59, condition: 'Rainy', icon: '' },
        { tempF: 68, condition: 'Clear', icon: '' }
    ];
    
    const weather = mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)];
    
    // Convert temperature based on setting
    let temp, unit;
    if (settings.tempUnit === 'C') {
        temp = Math.round((weather.tempF - 32) * 5 / 9);
        unit = '°C';
    } else {
        temp = weather.tempF;
        unit = '°F';
    }
    
    weatherElement.textContent = `${temp}${unit} ${weather.condition}`;
    weatherElement.previousElementSibling.textContent = weather.icon;
}

// ========================================
// Quotes Function
// ========================================

const quotes = [
    '"The only way to do great work is to love what you do." - Steve Jobs',
    '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
    '"First, solve the problem. Then, write the code." - John Johnson',
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
    '"Programming isn\'t about what you know; it\'s about what you can figure out." - Chris Pine',
    '"The best error message is the one that never shows up." - Thomas Fuchs',
    '"Simplicity is the soul of efficiency." - Austin Freeman',
    '"Make it work, make it right, make it fast." - Kent Beck',
    '"Talk is cheap. Show me the code." - Linus Torvalds',
    '"Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday\'s code." - Dan Salomon'
];

function updateQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = randomQuote;
}

// ========================================
// Keyboard Shortcuts
// ========================================

function handleKeyboard(event) {
    // Focus search on '/' key
    if (event.key === '/' && document.activeElement !== searchInput) {
        event.preventDefault();
        searchInput.focus();
    }
    
    // Clear search on Escape
    if (event.key === 'Escape') {
        searchInput.value = '';
        searchInput.blur();
    }
    
    // Number keys to switch engines (1-4)
    if (document.activeElement !== searchInput) {
        const engineKeys = { '1': 'google', '2': 'duckduckgo', '3': 'github', '4': 'youtube' };
        if (engineKeys[event.key]) {
            setSearchEngine(engineKeys[event.key]);
        }
    }
}

// ========================================
// Event Listeners
// ========================================

function initEventListeners() {
    // Search form submission
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
    
    // Engine buttons
    engineButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setSearchEngine(btn.dataset.engine);
            searchInput.focus();
        });
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Link hover effects (add sound or haptic feedback here if desired)
    document.querySelectorAll('.link-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Could add subtle sound effect here
        });
    });
}

// ========================================
// Dynamic Grid Layout
// ========================================

function updateGridLayout() {
    const linksGrid = document.querySelector('.links-grid');
    if (!linksGrid) return;
    
    const categoryCount = linksGrid.querySelectorAll('.link-group').length;
    
    // Remove existing grid classes
    linksGrid.classList.remove('grid-single', 'grid-even', 'grid-odd');
    
    // Apply appropriate class based on count
    if (categoryCount === 1) {
        linksGrid.classList.add('grid-single');
    } else if (categoryCount % 2 === 0) {
        // Even: 2, 4, 6, 8... -> 2 columns
        linksGrid.classList.add('grid-even');
    } else {
        // Odd: 3, 5, 7, 9... -> 3 columns
        linksGrid.classList.add('grid-odd');
    }
}

// ========================================
// Initialization
// ========================================

function init() {
    // Set up dynamic grid layout
    updateGridLayout();
    
    // Update time immediately and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Update weather
    updateWeather();
    setInterval(updateWeather, 600000); // Update every 10 minutes
    
    // Set random quote
    updateQuote();
    
    // Restore preferred search engine
    const savedEngine = localStorage.getItem('preferredEngine');
    if (savedEngine && searchEngines[savedEngine]) {
        setSearchEngine(savedEngine);
    }
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize settings
    initSettings();
    
    // Focus search input after a brief delay (for animation)
    setTimeout(() => {
        searchInput.focus();
    }, 700);
}

// ========================================
// Settings Modal Functions
// ========================================

function initSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsClose = document.getElementById('settings-close');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    // Open settings
    settingsBtn.addEventListener('click', () => {
        settingsOverlay.classList.add('active');
    });
    
    // Close settings
    settingsClose.addEventListener('click', () => {
        settingsOverlay.classList.remove('active');
    });
    
    // Close on overlay click
    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) {
            settingsOverlay.classList.remove('active');
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsOverlay.classList.contains('active')) {
            settingsOverlay.classList.remove('active');
        }
    });
    
    // Update toggle button states based on saved settings
    updateToggleStates();
    
    // Handle toggle button clicks
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const setting = btn.dataset.setting;
            const value = btn.dataset.value;
            
            // Update setting
            settings[setting] = value;
            localStorage.setItem(setting, value);
            
            // Update UI
            updateToggleStates();
            
            // Apply changes
            if (setting === 'theme') {
                applyTheme(value);
            } else if (setting === 'timeFormat') {
                updateDateTime();
            } else if (setting === 'tempUnit') {
                updateWeather();
            }
        });
    });
}

function updateToggleStates() {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        const setting = btn.dataset.setting;
        const value = btn.dataset.value;
        btn.classList.toggle('active', settings[setting] === value);
    });
}

// ========================================
// Start the application
// ========================================

document.addEventListener('DOMContentLoaded', init);

// ========================================
// Optional: Service Worker for offline support
// ========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ========================================
// Optional: Command palette (advanced feature)
// ========================================

const commands = {
    'theme dark': () => document.body.classList.remove('light'),
    'theme light': () => document.body.classList.add('light'),
    'new tab': () => window.open('about:blank', '_blank'),
    'github': () => window.location.href = 'https://github.com',
    'settings': () => console.log('Settings panel would open here'),
};

function executeCommand(input) {
    const cmd = input.toLowerCase().trim();
    if (cmd.startsWith(':')) {
        const command = cmd.slice(1);
        if (commands[command]) {
            commands[command]();
            return true;
        }
    }
    return false;
}

// Add command execution to search
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const value = searchInput.value;
        if (!executeCommand(value)) {
            performSearch(value);
        } else {
            searchInput.value = '';
        }
    }
});
