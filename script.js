

const defaultCategories = [
    { id: 'dev', name: 'Development', icon: 'fa-solid fa-code' },
    { id: 'media', name: 'Media', icon: 'fa-solid fa-play' },
    { id: 'productivity', name: 'Productivity', icon: 'fa-solid fa-briefcase' },
    { id: 'social', name: 'Social', icon: 'fa-solid fa-users' }
];

const defaultLinks = {
    'dev': [
        { name: 'GitHub', url: 'https://github.com/mystichronicle', icon: 'fa-brands fa-github' },
        { name: 'GitHub Page', url: 'https://mystichronicle.github.io', icon: 'fa-solid fa-file-code' },
        { name: 'Leetcode', url: 'https://leetcode.cn/', icon: 'fa-solid fa-code' },
        { name: 'Website', url: 'https://debjit.is-a.dev', icon: 'fa-solid fa-globe' }
    ],
    'social': [
        { name: 'Facebook', url: 'https://facebook.com/', icon: 'fa-brands fa-facebook' },
        { name: 'Instagram', url: 'https://www.instagram.com/', icon: 'fa-brands fa-instagram' },
        { name: 'X', url: 'https://x.com/', icon: 'fa-brands fa-x-twitter' },
        { name: 'Telegram', url: 'https://web.telegram.org/#/im', icon: 'fa-brands fa-telegram' },
        { name: 'Mastodon', url: 'https://mastodon.social/', icon: 'fa-brands fa-mastodon' },
        { name: 'Reddit', url: 'https://reddit.com', icon: 'fa-brands fa-reddit-alien' },
        { name: 'Linkedin', url: 'https://linkedin.com/in/', icon: 'fa-brands fa-linkedin' },
        { name: 'Whatsapp', url: 'https://web.whatsapp.com', icon: 'fa-brands fa-whatsapp' },
        { name: 'Discord', url: 'https://canary.discord.com/channels/@me', icon: 'fa-brands fa-discord' }
    ],
    'media': [
        { name: 'YouTube', url: 'https://www.youtube.com', icon: 'fa-brands fa-youtube' },
        { name: 'Google', url: 'https://www.google.com', icon: 'fa-brands fa-google' },
        { name: 'JioHotstar', url: 'https://www.hotstar.com', icon: 'fa-solid fa-star' },
        { name: 'Netflix', url: 'https://www.netflix.com', icon: 'fa-solid fa-n' },
        { name: 'Prime Video', url: 'https://www.primevideo.com', icon: 'fa-brands fa-amazon' },
        { name: 'Hoichoi', url: 'https://www.hoichoi.tv', icon: 'fa-solid fa-play-circle' }
    ],
    'productivity': [
        { name: 'Gmail', url: 'https://mail.google.com/mail/u/0/#inbox', icon: 'fa-solid fa-envelope' },
        { name: 'Drive', url: 'https://drive.google.com', icon: 'fa-brands fa-google-drive' },
        { name: 'Docs', url: 'https://docs.google.com', icon: 'fa-solid fa-file-word' },
        { name: 'Sheets', url: 'https://sheets.google.com', icon: 'fa-solid fa-table' },
        { name: 'Slides', url: 'https://slides.google.com', icon: 'fa-solid fa-file-powerpoint' },
        { name: 'Meet', url: 'https://meet.google.com', icon: 'fa-solid fa-video' },
        { name: 'Calendar', url: 'https://calendar.google.com', icon: 'fa-solid fa-calendar' },
        { name: 'Classroom', url: 'https://classroom.google.com', icon: 'fa-solid fa-chalkboard-user' }
    ]
};

const categoryColors = ['mauve', 'blue', 'red', 'green', 'peach', 'teal', 'pink', 'yellow'];


const allSearchEngines = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/search?q=',
        icon: '<i class="fa-brands fa-google"></i>'
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=',
        icon: '<span class="nf-icon">󰇥</span>'
    },
    github: {
        name: 'GitHub',
        url: 'https://github.com/search?q=',
        icon: '<i class="fa-brands fa-github"></i>'
    },
    youtube: {
        name: 'YouTube',
        url: 'https://www.youtube.com/results?search_query=',
        icon: '<i class="fa-brands fa-youtube"></i>'
    },
    bing: {
        name: 'Bing',
        url: 'https://www.bing.com/search?q=',
        icon: '<i class="fa-brands fa-microsoft"></i>'
    },
    amazon: {
        name: 'Amazon',
        url: 'https://www.amazon.com/s?k=',
        icon: '<i class="fa-brands fa-amazon"></i>'
    },
    wikipedia: {
        name: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Special:Search?search=',
        icon: '<i class="fa-brands fa-wikipedia-w"></i>'
    }
};


function loadSettings() {
    const defaults = {
        userName: 'Debjit',
        theme: 'dark',
        colorMode: 'multi',
        timeFormat: '12',
        tempUnit: 'C',
        showQuotes: 'true',
        enabledEngines: ['google', 'duckduckgo', 'github', 'youtube'],
        preferredEngine: 'google'
    };
    
    return {
        userName: localStorage.getItem('userName') ?? defaults.userName,
        theme: localStorage.getItem('theme') ?? defaults.theme,
        colorMode: localStorage.getItem('colorMode') ?? defaults.colorMode,
        timeFormat: localStorage.getItem('timeFormat') ?? defaults.timeFormat,
        tempUnit: localStorage.getItem('tempUnit') ?? defaults.tempUnit,
        showQuotes: localStorage.getItem('showQuotes') ?? defaults.showQuotes,
        enabledEngines: JSON.parse(localStorage.getItem('enabledEngines')) ?? defaults.enabledEngines,
        preferredEngine: localStorage.getItem('preferredEngine') ?? defaults.preferredEngine
    };
}

function saveSettings(key, value) {
    if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
    settings[key] = value;
}

function loadCategories() {
    const saved = localStorage.getItem('categories');
    if (!saved) return [...defaultCategories];
    
    // Migrate old HTML format to simple class format
    const cats = JSON.parse(saved);
    return cats.map(cat => {
        // Check if icon is in old HTML format
        if (cat.icon && cat.icon.includes('<i class="')) {
            const match = cat.icon.match(/class="([^"]+)"/);
            if (match) {
                cat.icon = match[1];
            }
        }
        return cat;
    });
}

function saveCategories(cats) {
    localStorage.setItem('categories', JSON.stringify(cats));
}

function loadLinks() {
    const saved = localStorage.getItem('links');
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultLinks));
}

function saveLinks(lnks) {
    localStorage.setItem('links', JSON.stringify(lnks));
}

let settings = loadSettings();
let categories = loadCategories();
let links = loadLinks();
let currentEngine = settings.preferredEngine;


function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    saveSettings('theme', theme);
}

function applyColorMode(mode) {
    document.documentElement.setAttribute('data-color-mode', mode);
    saveSettings('colorMode', mode);
    renderLinksGrid();
}

applyTheme(settings.theme);


let searchInput, timeElement, dateElement, greetingElement, weatherElement, quoteElement, linksGrid;


function updateDateTime() {
    if (!timeElement || !dateElement) return;
    
    const now = new Date();
    
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
    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
    
    updateGreeting(now.getHours());
}

function updateGreeting(hour) {
    if (!greetingElement) return;
    
    let greeting, iconHtml;
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
        iconHtml = '<span class="nf-icon">󰖜</span>';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good afternoon';
        iconHtml = '<i class="fa-solid fa-sun"></i>';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good evening';
        iconHtml = '<span class="nf-icon">󰖛</span>';
    } else {
        greeting = 'Good night';
        iconHtml = '<i class="fa-solid fa-moon"></i>';
    }
    
    const userName = settings.userName;
    greetingElement.textContent = userName ? `${greeting}, ${userName}` : greeting;
    
    const iconElement = document.getElementById('greeting-icon');
    if (iconElement) {
        iconElement.innerHTML = iconHtml;
    }
}


function performSearch(query) {
    if (!query.trim()) return;
    
    const engine = allSearchEngines[currentEngine];
    if (!engine) return;
    
    const searchUrl = engine.url + encodeURIComponent(query);
    window.location.href = searchUrl;
}

function setSearchEngine(engine) {
    if (!allSearchEngines[engine]) return;
    if (!settings.enabledEngines.includes(engine)) return;
    
    currentEngine = engine;
    saveSettings('preferredEngine', engine);
    
    document.querySelectorAll('.search-engines .engine').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.engine === engine);
    });
    
    if (searchInput) {
        searchInput.placeholder = `Search ${allSearchEngines[engine].name}...`;
    }
}

function renderSearchEngines() {
    const container = document.querySelector('.search-engines');
    if (!container) return;
    
    container.innerHTML = settings.enabledEngines.map((engineId, index) => {
        const engine = allSearchEngines[engineId];
        if (!engine) return '';
        return `
            <button class="engine ${engineId === currentEngine ? 'active' : ''}" 
                    data-engine="${engineId}" 
                    title="${engine.name} (${index + 1})">
                ${engine.icon}
            </button>
        `;
    }).join('');
    
    // Rebind click events
    container.querySelectorAll('.engine').forEach(btn => {
        btn.addEventListener('click', () => {
            setSearchEngine(btn.dataset.engine);
            if (searchInput) searchInput.focus();
        });
    });
    
    // Update keyboard hints
    updateKeyboardHints();
}

function updateKeyboardHints() {
    const hintsContainer = document.querySelector('.keyboard-hints');
    if (!hintsContainer) return;
    
    const engineCount = settings.enabledEngines.length;
    const engineHint = engineCount > 1 ? `<kbd>1-${engineCount}</kbd> Engine` : '';
    
    hintsContainer.innerHTML = `
        <span class="hint"><kbd>/</kbd> Search</span>
        ${engineHint ? `<span class="hint">${engineHint}</span>` : ''}
        <span class="hint"><kbd>Esc</kbd> Clear</span>
    `;
}


let weatherData = null;

function getWeatherIcon(weatherCode, isDay) {
    // WMO Weather interpretation codes
    // https://open-meteo.com/en/docs
    if (weatherCode === 0) return isDay ? 'fa-sun' : 'fa-moon';
    if (weatherCode <= 3) return 'fa-cloud-sun';
    if (weatherCode <= 48) return 'fa-cloud';
    if (weatherCode <= 67) return 'fa-cloud-rain';
    if (weatherCode <= 77) return 'fa-snowflake';
    if (weatherCode <= 82) return 'fa-cloud-showers-heavy';
    if (weatherCode <= 86) return 'fa-cloud-snow';
    if (weatherCode <= 99) return 'fa-cloud-bolt';
    return 'fa-cloud';
}

function getWeatherDescription(weatherCode) {
    if (weatherCode === 0) return 'Clear';
    if (weatherCode <= 3) return 'Partly Cloudy';
    if (weatherCode <= 48) return 'Foggy';
    if (weatherCode <= 67) return 'Rainy';
    if (weatherCode <= 77) return 'Snowy';
    if (weatherCode <= 82) return 'Rain Showers';
    if (weatherCode <= 86) return 'Snow Showers';
    if (weatherCode <= 99) return 'Thunderstorm';
    return 'Unknown';
}

async function fetchWeatherData(latitude, longitude) {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&temperature_unit=celsius&timezone=auto`
        );
        
        if (!response.ok) throw new Error('Weather API request failed');
        
        const data = await response.json();
        weatherData = {
            temp: Math.round(data.current.temperature_2m),
            weatherCode: data.current.weather_code,
            isDay: data.current.is_day === 1
        };
        
        updateWeatherDisplay();
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherElement.textContent = 'Weather unavailable';
    }
}

function updateWeatherDisplay() {
    if (!weatherElement || !weatherData) return;
    
    let temp = weatherData.temp;
    let unit = '°C';
    
    // Convert to Fahrenheit if needed
    if (settings.tempUnit === 'F') {
        temp = Math.round((temp * 9/5) + 32);
        unit = '°F';
    }
    
    const condition = getWeatherDescription(weatherData.weatherCode);
    const icon = getWeatherIcon(weatherData.weatherCode, weatherData.isDay);
    
    weatherElement.textContent = `${temp}${unit} ${condition}`;
    
    const iconElement = weatherElement.previousElementSibling;
    if (iconElement) {
        iconElement.innerHTML = `<i class="fa-solid ${icon}"></i>`;
    }
}

function updateWeather() {
    if (!weatherElement) return;
    
    // If we already have weather data, just update the display
    if (weatherData) {
        updateWeatherDisplay();
        return;
    }
    
    // Try to get user's location
    if ('geolocation' in navigator) {
        weatherElement.textContent = 'Getting location...';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
                // Fallback to a default location (New York)
                fetchWeatherData(40.7128, -74.0060);
            },
            {
                timeout: 10000,
                maximumAge: 300000 // Cache for 5 minutes
            }
        );
    } else {
        // Fallback if geolocation is not supported
        weatherElement.textContent = 'Location not supported';
    }
}


let dailyQuote = null;

async function fetchDailyQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/today');
        if (!response.ok) throw new Error('Quote API request failed');
        const data = await response.json();
        if (data && data.length > 0) {
            dailyQuote = `"${data[0].q}" - ${data[0].a}`;
            updateQuoteDisplay();
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        const fallbackQuotes = [
            '"The only way to do great work is to love what you do." - Steve Jobs',
            '"First, solve the problem. Then, write the code." - John Johnson',
            '"Simplicity is the soul of efficiency." - Austin Freeman',
            '"Make it work, make it right, make it fast." - Kent Beck',
            '"Talk is cheap. Show me the code." - Linus Torvalds'
        ];
        dailyQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        updateQuoteDisplay();
    }
}

function updateQuoteDisplay() {
    const quoteWidget = document.querySelector('.quote-widget');
    if (!quoteWidget || !quoteElement) return;
    if (settings.showQuotes === 'true') {
        quoteWidget.style.display = 'flex';
        if (dailyQuote) {
            quoteElement.textContent = dailyQuote;
        }
    } else {
        quoteWidget.style.display = 'none';
    }
}

function updateQuote() {
    if (!dailyQuote) {
        fetchDailyQuote();
    } else {
        updateQuoteDisplay();
    }
}


function renderLinksGrid() {
    if (!linksGrid) return;
    
    const colorMode = settings.colorMode;
    
    linksGrid.innerHTML = categories.map((category, index) => {
        const categoryLinks = links[category.id] || [];
        const colorClass = colorMode === 'multi' ? categoryColors[index % categoryColors.length] : 'mauve';
        
        return `
            <section class="link-group" data-category="${category.id}" data-color="${colorClass}">
                <h2 class="group-title">
                    <span class="title-icon"><i class="${category.icon}"></i></span>
                    ${category.name}
                </h2>
                <div class="links">
                    ${categoryLinks.map(link => `
                        <a href="${link.url}" class="link-card">
                            <span class="link-icon"><i class="${link.icon || 'fa-solid fa-link'}"></i></span>
                            <span class="link-text">${link.name}</span>
                        </a>
                    `).join('')}
                </div>
            </section>
        `;
    }).join('');
    
    updateGridLayout();
}

function updateGridLayout() {
    if (!linksGrid) return;
    
    const categoryCount = categories.length;
    
    linksGrid.classList.remove('grid-single', 'grid-even', 'grid-odd');
    
    if (categoryCount === 1) {
        linksGrid.classList.add('grid-single');
    } else if (categoryCount % 2 === 0) {
        linksGrid.classList.add('grid-even');
    } else {
        linksGrid.classList.add('grid-odd');
    }
}


function initSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsClose = document.getElementById('settings-close');
    
    // Help modal elements
    const helpBtn = document.getElementById('help-btn');
    const helpOverlay = document.getElementById('help-overlay');
    const helpClose = document.getElementById('help-close');
    
    if (!settingsBtn || !settingsOverlay || !settingsClose) return;
    
    // Open settings
    settingsBtn.addEventListener('click', () => {
        settingsOverlay.classList.add('active');
        populateSettingsUI();
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
    
    // Help modal
    if (helpBtn && helpOverlay && helpClose) {
        helpBtn.addEventListener('click', () => {
            helpOverlay.classList.add('active');
        });
        
        helpClose.addEventListener('click', () => {
            helpOverlay.classList.remove('active');
        });
        
        helpOverlay.addEventListener('click', (e) => {
            if (e.target === helpOverlay) {
                helpOverlay.classList.remove('active');
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (settingsOverlay.classList.contains('active')) {
                settingsOverlay.classList.remove('active');
            }
            if (helpOverlay && helpOverlay.classList.contains('active')) {
                helpOverlay.classList.remove('active');
            }
        }
    });
    
    // Tab switching
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`[data-panel="${tabId}"]`).classList.add('active');
            
            if (tabId === 'categories') {
                renderCategoriesSettings();
            } else if (tabId === 'links') {
                renderLinksSettings();
            }
        });
    });
    
    // Toggle button handlers
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const setting = btn.dataset.setting;
            const value = btn.dataset.value;
            
            saveSettings(setting, value);
            updateToggleStates();
            
            if (setting === 'theme') {
                applyTheme(value);
            } else if (setting === 'colorMode') {
                applyColorMode(value);
            } else if (setting === 'timeFormat') {
                updateDateTime();
            } else if (setting === 'tempUnit') {
                updateWeather();
            } else if (setting === 'showQuotes') {
                updateQuote();
            }
        });
    });
    
    // Name input handler
    const nameInput = document.getElementById('setting-name');
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            saveSettings('userName', e.target.value);
            updateGreeting(new Date().getHours());
        });
    }
    
    // Search engine checkboxes
    document.querySelectorAll('#search-engine-options input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const enabledEngines = [];
            document.querySelectorAll('#search-engine-options input:checked').forEach(cb => {
                enabledEngines.push(cb.dataset.engine);
            });
            
            if (enabledEngines.length === 0) {
                checkbox.checked = true;
                return;
            }
            
            saveSettings('enabledEngines', enabledEngines);
            
            if (!enabledEngines.includes(currentEngine)) {
                setSearchEngine(enabledEngines[0]);
            }
            
            renderSearchEngines();
        });
    });
    
    // Add category button
    const addCategoryBtn = document.getElementById('add-category-btn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', addCategory);
    }
    
    // Add link button
    const addLinkBtn = document.getElementById('add-link-btn');
    if (addLinkBtn) {
        addLinkBtn.addEventListener('click', addLink);
    }
    
    // Category selector for links
    const linkCategorySelect = document.getElementById('link-category-select');
    if (linkCategorySelect) {
        linkCategorySelect.addEventListener('change', (e) => {
            const addLinkBtn = document.getElementById('add-link-btn');
            if (addLinkBtn) {
                addLinkBtn.disabled = !e.target.value;
            }
            renderLinksForCategory(e.target.value);
        });
    }
    
    updateToggleStates();
}

function populateSettingsUI() {
    // Populate name input
    const nameInput = document.getElementById('setting-name');
    if (nameInput) {
        nameInput.value = settings.userName;
    }
    
    // Populate search engine checkboxes
    document.querySelectorAll('#search-engine-options input').forEach(checkbox => {
        checkbox.checked = settings.enabledEngines.includes(checkbox.dataset.engine);
    });
    
    updateToggleStates();
}

function updateToggleStates() {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        const setting = btn.dataset.setting;
        const value = btn.dataset.value;
        btn.classList.toggle('active', settings[setting] === value);
    });
}


function renderCategoriesSettings() {
    const container = document.getElementById('categories-list');
    const addBtn = document.getElementById('add-category-btn');
    
    if (!container) return;
    
    container.innerHTML = categories.map((category, index) => `
        <div class="category-item" data-id="${category.id}">
            <span class="icon-preview"><i class="${category.icon}"></i></span>
            <input type="text" class="icon-input" value="${category.icon}" placeholder="fa-solid fa-folder" data-field="icon">
            <input type="text" value="${category.name}" placeholder="Category Name" maxlength="20" data-field="name">
            <button class="delete-btn" title="Delete Category" ${categories.length <= 1 ? 'disabled' : ''}>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    if (addBtn) {
        addBtn.disabled = categories.length >= 8;
    }
    
    // Bind events
    container.querySelectorAll('.category-item').forEach(item => {
        const categoryId = item.dataset.id;
        const iconPreview = item.querySelector('.icon-preview i');
        
        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const field = input.dataset.field;
                const category = categories.find(c => c.id === categoryId);
                if (category) {
                    category[field] = input.value;
                    saveCategories(categories);
                    renderLinksGrid();
                    updateLinkCategorySelect();
                    
                    // Update icon preview
                    if (field === 'icon' && iconPreview) {
                        iconPreview.className = input.value || 'fa-solid fa-folder';
                    }
                }
            });
        });
        
        item.querySelector('.delete-btn').addEventListener('click', () => {
            if (categories.length > 1) {
                deleteCategory(categoryId);
            }
        });
    });
}

function addCategory() {
    if (categories.length >= 8) return;
    
    const newId = 'cat_' + Date.now();
    categories.push({
        id: newId,
        name: 'New Category',
        icon: 'fa-solid fa-folder'
    });
    links[newId] = [];
    
    saveCategories(categories);
    saveLinks(links);
    renderCategoriesSettings();
    renderLinksGrid();
    updateLinkCategorySelect();
}

function deleteCategory(categoryId) {
    categories = categories.filter(c => c.id !== categoryId);
    delete links[categoryId];
    
    saveCategories(categories);
    saveLinks(links);
    renderCategoriesSettings();
    renderLinksGrid();
    updateLinkCategorySelect();
}


function renderLinksSettings() {
    updateLinkCategorySelect();
    const select = document.getElementById('link-category-select');
    if (select && select.value) {
        renderLinksForCategory(select.value);
    } else {
        const container = document.getElementById('links-list');
        if (container) container.innerHTML = '';
    }
}

function updateLinkCategorySelect() {
    const select = document.getElementById('link-category-select');
    if (!select) return;
    
    const currentValue = select.value;
    
    select.innerHTML = '<option value="">-- Select a category --</option>' +
        categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    
    if (categories.find(c => c.id === currentValue)) {
        select.value = currentValue;
    }
}

function renderLinksForCategory(categoryId) {
    const container = document.getElementById('links-list');
    const addBtn = document.getElementById('add-link-btn');
    
    if (!container) return;
    
    if (!categoryId) {
        container.innerHTML = '';
        if (addBtn) addBtn.disabled = true;
        return;
    }
    
    const categoryLinks = links[categoryId] || [];
    
    container.innerHTML = categoryLinks.map((link, index) => `
        <div class="link-item" data-index="${index}">
            <span class="icon-preview"><i class="${link.icon || 'fa-solid fa-link'}"></i></span>
            <input type="text" class="icon-input" value="${link.icon || 'fa-solid fa-link'}" placeholder="fa-solid fa-link" data-field="icon">
            <input type="text" value="${link.name}" placeholder="Link Name" maxlength="20" data-field="name">
            <input type="url" class="url-input" value="${link.url}" placeholder="https://..." data-field="url">
            <button class="delete-btn" title="Delete Link">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    if (addBtn) {
        addBtn.disabled = categoryLinks.length >= 10;
    }
    
    // Bind events
    container.querySelectorAll('.link-item').forEach(item => {
        const index = parseInt(item.dataset.index);
        const iconPreview = item.querySelector('.icon-preview i');
        
        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                const field = input.dataset.field;
                if (links[categoryId] && links[categoryId][index]) {
                    links[categoryId][index][field] = input.value;
                    saveLinks(links);
                    renderLinksGrid();
                    
                    // Update icon preview
                    if (field === 'icon' && iconPreview) {
                        iconPreview.className = input.value || 'fa-solid fa-link';
                    }
                }
            });
        });
        
        item.querySelector('.delete-btn').addEventListener('click', () => {
            deleteLink(categoryId, index);
        });
    });
}

function addLink() {
    const select = document.getElementById('link-category-select');
    const categoryId = select ? select.value : null;
    if (!categoryId) return;
    
    if (!links[categoryId]) {
        links[categoryId] = [];
    }
    
    if (links[categoryId].length >= 10) return;
    
    links[categoryId].push({
        name: 'New Link',
        url: 'https://',
        icon: 'fa-solid fa-link'
    });
    
    saveLinks(links);
    renderLinksForCategory(categoryId);
    renderLinksGrid();
}

function deleteLink(categoryId, index) {
    if (links[categoryId]) {
        links[categoryId].splice(index, 1);
        saveLinks(links);
        renderLinksForCategory(categoryId);
        renderLinksGrid();
    }
}


function handleKeyboard(event) {
    const settingsOverlay = document.getElementById('settings-overlay');
    const isSettingsOpen = settingsOverlay && settingsOverlay.classList.contains('active');
    
    if (event.key === '/' && document.activeElement !== searchInput && !isSettingsOpen) {
        event.preventDefault();
        if (searchInput) searchInput.focus();
    }
    
    if (event.key === 'Escape' && searchInput) {
        searchInput.value = '';
        searchInput.blur();
    }
    
    // Dynamic engine switching based on enabled engines
    if (document.activeElement !== searchInput && !isSettingsOpen) {
        const num = parseInt(event.key);
        if (num >= 1 && num <= settings.enabledEngines.length) {
            setSearchEngine(settings.enabledEngines[num - 1]);
        }
    }
}


function initEventListeners() {
    if (searchInput) {
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
    }
    
    document.addEventListener('keydown', handleKeyboard);
}


const commands = {
    'theme dark': () => applyTheme('dark'),
    'theme light': () => applyTheme('light'),
    'new tab': () => window.open('about:blank', '_blank'),
    'github': () => window.location.href = 'https://github.com',
    'settings': () => document.getElementById('settings-overlay').classList.add('active'),
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


function init() {
    // Get DOM elements
    searchInput = document.getElementById('search');
    timeElement = document.getElementById('time');
    dateElement = document.getElementById('date');
    greetingElement = document.getElementById('greeting');
    weatherElement = document.getElementById('weather');
    quoteElement = document.getElementById('quote');
    linksGrid = document.getElementById('links-grid');
    
    // Render dynamic content
    renderLinksGrid();
    renderSearchEngines();
    
    // Update time immediately and every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Update weather
    updateWeather();
    setInterval(updateWeather, 600000);
    
    // Set random quote
    updateQuote();
    
    // Restore preferred search engine
    if (settings.enabledEngines.includes(settings.preferredEngine)) {
        setSearchEngine(settings.preferredEngine);
    } else if (settings.enabledEngines.length > 0) {
        setSearchEngine(settings.enabledEngines[0]);
    }
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize settings
    initSettings();
    
    // Focus search input after a brief delay
    setTimeout(() => {
        if (searchInput) searchInput.focus();
    }, 700);
}


document.addEventListener('DOMContentLoaded', init);
