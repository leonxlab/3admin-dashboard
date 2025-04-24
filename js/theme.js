/**
 * Theme Switching System
 * Handles dark/light mode toggling and persistence
 */

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button if it doesn't exist
    const existingToggle = document.querySelector('.theme-toggle');
    if (!existingToggle) {
        createThemeToggle();
    }
    
    // Apply saved theme preference
    applySavedTheme();
});

// Create and position the theme toggle button
function createThemeToggle() {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    toggleButton.innerHTML = `
        <div class="theme-switch">
            <i class="fas fa-sun"></i>
            <i class="fas fa-moon"></i>
        </div>
    `;
    
    // Style the toggle button
    Object.assign(toggleButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
        background: 'var(--accent-color)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px var(--shadow-color)',
        transition: 'all 0.3s ease'
    });
    
    // Hover effect
    toggleButton.addEventListener('mouseenter', () => {
        toggleButton.style.transform = 'scale(1.1)';
        toggleButton.style.boxShadow = '0 6px 16px var(--shadow-hover)';
    });
    
    toggleButton.addEventListener('mouseleave', () => {
        toggleButton.style.transform = 'scale(1)';
        toggleButton.style.boxShadow = '0 4px 12px var(--shadow-color)';
    });
    
    // Click handler
    toggleButton.addEventListener('click', toggleTheme);
    
    document.body.appendChild(toggleButton);
}

// Apply the saved theme preference
function applySavedTheme() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Priority: saved theme > system preference > light
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
    }
    
    // Update charts if they exist
    updateChartColors();
}

// Toggle between dark and light theme
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button appearance
    updateToggleButton(newTheme);
    
    // Update charts
    updateChartColors();
}

// Update toggle button appearance
function updateToggleButton(theme) {
    const sunIcon = document.querySelector('.theme-toggle .fa-sun');
    const moonIcon = document.querySelector('.theme-toggle .fa-moon');
    
    if (theme === 'dark') {
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'translateY(-20px)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'translateY(0)';
    } else {
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'translateY(0)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'translateY(20px)';
    }
}

// Update chart colors when theme changes
function updateChartColors() {
    if (typeof salesChart !== 'undefined') {
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
        const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
        
        // Update Sales Chart
        salesChart.options.scales.x.ticks.color = textColor;
        salesChart.options.scales.y.ticks.color = textColor;
        salesChart.options.scales.y.grid.color = gridColor;
        salesChart.update();
        
        // Update Trend Chart
        trendChart.options.scales.x.ticks.color = textColor;
        trendChart.options.scales.y.ticks.color = textColor;
        trendChart.options.scales.y.grid.color = gridColor;
        trendChart.options.plugins.legend.labels.color = textColor;
        trendChart.update();
        
        // Update User Activity Chart
        userActivityChart.options.scales.x.ticks.color = textColor;
        userActivityChart.options.scales.y.ticks.color = textColor;
        userActivityChart.options.scales.x.grid.color = gridColor;
        userActivityChart.update();
    }
}

// Watch for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        applySavedTheme();
    }
});