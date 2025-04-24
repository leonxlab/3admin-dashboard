document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.textContent = `Toggle ${currentTheme === 'light' ? 'Light' : 'Dark'} Mode`;
    });

    // Initialize Charts
    const salesData = {
        labels: ['Online', 'Office', 'Marketing'],
        datasets: [{
            label: 'Sales',
            data: [23342, 13221, 1542],
            backgroundColor: [
                'rgba(52, 152, 219, 0.2)',
                'rgba(231, 76, 60, 0.2)',
                'rgba(46, 204, 113, 0.2)'
            ],
            borderColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(231, 76, 60, 1)',
                'rgba(46, 204, 113, 1)'
            ],
            borderWidth: 1
        }]
    };

    const salesOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const barChartCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barChartCtx, {
        type: 'bar',
        data: salesData,
        options: salesOptions
    });

    const trendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Open Value',
            data: [155.5, 160.2, 165.3, 170.1, 175.4, 180.5, 185.6, 190.7, 195.8, 200.9, 205.0, 210.1],
            fill: false,
            borderColor: 'rgba(52, 152, 219, 1)',
            tension: 0.1
        }, {
            label: 'Total Products',
            data: [293.2, 298.3, 303.4, 308.5, 313.6, 318.7, 323.8, 328.9, 333.0, 338.1, 343.2, 348.3],
            fill: false,
            borderColor: 'rgba(231, 76, 60, 1)',
            tension: 0.1
        }]
    };

    const lineChartCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineChartCtx, {
        type: 'line',
        data: trendData,
        options: {}
    });

    const pieData = {
        labels: ['Online', 'Office', 'Marketing'],
        datasets: [{
            data: [23342, 13221, 1542],
            backgroundColor: [
                'rgba(52, 152, 219, 0.2)',
                'rgba(231, 76, 60, 0.2)',
                'rgba(46, 204, 113, 0.2)'
            ],
            borderColor: [
                'rgba(52, 152, 219, 1)',
                'rgba(231, 76, 60, 1)',
                'rgba(46, 204, 113, 1)'
            ],
            borderWidth: 1
        }]
    };

    const pieChartCtx = document.getElementById('pieChartExample').getContext('2d');
    new Chart(pieChartCtx, {
        type: 'pie',
        data: pieData,
        options: {}
    });

    // Sidebar Dropdown Functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const subMenu = toggle.nextElementSibling;
            subMenu.classList.toggle('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        dropdownToggles.forEach(toggle => {
            const subMenu = toggle.nextElementSibling;
            if (!subMenu.contains(e.target) && !toggle.contains(e.target)) {
                subMenu.classList.remove('show');
            }
        });
    });

    // Active Menu Item
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            menuLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
        });
    });
});