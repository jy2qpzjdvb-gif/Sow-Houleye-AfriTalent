document.addEventListener("DOMContentLoaded", function() {
    /* ==== DARK MODE ==== */
    // creer le bouton dans la navbar
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `<button id="bnt-theme" class="btn btn-outline-light" ms-2>
        <i class="bi bi-moon-fill" id="icone-theme"></i>
        </button>`;
        navbarNav.appendChild(li);
    }
    // appliquer le theme sauvegardè
    const themeSauvegarde = localStorage.getItem('theme')||'light';
    if (themeSauvegarde === 'dark') {
        document.body.classList.add('dark-mode');
        const icone = document.getElementById('icone-theme');
        if (icone) {
            icone.classList.remove('bi-moon-fill');
            icone.classList.add('bi-sun-fill');
        }
    }
    //clique sur le bouton
    const btnTheme = document.getElementById('bnt-theme');
    if (btnTheme) {
        btnTheme.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icone = document.getElementById('icone-theme');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (icone) {
                    icone.classList.remove('bi-moon-fill');
                    icone.classList.add('bi-sun-fill');
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (icone) {
                    icone.classList.remove('bi-sun-fill');
                    icone.classList.add('bi-moon-fill');
                }
            }
        });
    }
});
/* ====NAVBAR AU SCROLL==== */
const navbarElement = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbarElement.classList.add('navbar-scrolled');
    } else {
        navbarElement.classList.remove('navbar-scrolled');
    }
});
/* ====bouton retour en haut==== */
const buttonHaut = document.createElement('button');
buttonHaut.id = 'btn-retour-haut';
buttonHaut.innerHTML = '<i class="bi bi-arrow-up"></i>';
document.body.appendChild(buttonHaut);

window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
        buttonHaut.classList.add('visible');
    } else {
        buttonHaut.classList.remove('visible');
    }
});
buttonHaut.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
/* ====fermer menu hamburger au clic==== */
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        const menuOvert = document.querySelector('.navbar-collapse.show');
        if (menuOvert) {
            document.querySelector('.navbar-toggler').click();
        }
    });
});
