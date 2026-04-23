// Theme Initializer (To prevent FOUC)
const currentTheme = localStorage.getItem('jsb_theme');
if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
}

// Logic that attaches event listener after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeIcon && document.documentElement.classList.contains('dark')) {
        themeIcon.textContent = 'light_mode';
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('jsb_theme', 'dark');
                themeIcon.textContent = 'light_mode';
            } else {
                localStorage.setItem('jsb_theme', 'light');
                themeIcon.textContent = 'dark_mode';
            }
        });
    }
});
