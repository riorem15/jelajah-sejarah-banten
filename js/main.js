// Jelajah Sejarah Banten - Main Interaction Script

document.addEventListener('DOMContentLoaded', () => {

    // 1. Username handling (Login to Dashboard)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username').value;
            if (usernameInput.trim() !== '') {
                localStorage.setItem('jsb_username', usernameInput);
            }
            window.location.href = 'index.html';
        });
    }

    const welcomeText = document.getElementById('welcomeText');
    if (welcomeText) {
        const user = localStorage.getItem('jsb_username');
        if (user) {
            welcomeText.textContent = `Selamat datang, ${user}`;
        }
    }

    // 2. Interactive SVG Map Logic (Dashboard)
    const mapPaths = document.querySelectorAll('path.banten-region');
    const mapPopup = document.getElementById('mapPopup');

    if (mapPaths.length > 0 && mapPopup) {
        mapPaths.forEach(path => {
            path.addEventListener('mouseenter', (e) => {
                const regionName = path.getAttribute('data-region');

                // Get count from data.js
                let count = 0;
                if (window.getRegionalCount) {
                    count = window.getRegionalCount(regionName);
                }

                // Update popup content
                document.getElementById('popupTitile').textContent = regionName;
                document.getElementById('popupCount').textContent = `${count} Situs Ditemukan`;

                // Show popup relative to mouse
                mapPopup.style.display = 'block';
                mapPopup.style.left = `${e.pageX + 20}px`;
                mapPopup.style.top = `${e.pageY - 20}px`;
            });

            path.addEventListener('mousemove', (e) => {
                mapPopup.style.left = `${e.pageX + 20}px`;
                mapPopup.style.top = `${e.pageY - 20}px`;
            });

            path.addEventListener('mouseleave', () => {
                mapPopup.style.display = 'none';
            });

            path.addEventListener('click', () => {
                const regionName = path.getAttribute('data-region');
                // Simulate navigate strictly to Etalase Serang explicitly for prototype
                if (regionName === "Kota Serang") {
                    window.location.href = 'etalase.html';
                } else {
                    alert(`Menuju etalase ${regionName} (Data mockup belum tersedia lengkap)`);
                }
            });
        });
    }

    // 3. Skeleton Loading Simulation (Detail Page)
    const weatherContainer = document.getElementById('weatherData');
    const skeletonLoaders = document.querySelectorAll('.weather-skeleton');

    if (weatherContainer) {
        setTimeout(() => {
            skeletonLoaders.forEach(el => el.style.display = 'none');
            const realData = document.querySelectorAll('.weather-realdata');
            realData.forEach(el => el.style.display = 'block');
        }, 1500); // 1.5 seconds mock delay
    }

    // 4. Parallax Scrolling & Reveal Effect
    const parallaxImages = document.querySelectorAll('.parallax-bg');
    const revealElements = document.querySelectorAll('.batik-reveal');

    window.addEventListener('scroll', () => {
        let scrolled = window.scrollY;

        // Parallax implementation
        parallaxImages.forEach(img => {
            let speed = img.getAttribute('data-speed') || 0.4;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Reveal implementation
        revealElements.forEach(el => {
            let position = el.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;
            if (position < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    });

});
