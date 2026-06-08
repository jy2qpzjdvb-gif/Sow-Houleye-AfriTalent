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
    /* ==== compteur animèe au scroll==== */
    const compteur= document.querySelectorAll('.compteur');
    const observerCompteur = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const compteur = entry.target;
                const cible = parseInt(compteur.getAttribute('data-target'));
                const duree = 2000; // durée de l'animation en ms
                const icrement = cible / (duree / 16); // incrément à chaque intervalle
                let valeurActuelle = 0;

                const timer = setInterval(function() {
                    valeurActuelle += icrement;
                    if (valeurActuelle >= cible) {
                        compteur.textContent = cible .toLocaleString(); // formatage avec séparateur de milliers
                        clearInterval(timer);
                    } else {
                        compteur.textContent = Math.floor(valeurActuelle).toLocaleString();
                    }
                },16);
                observerCompteur.unobserve(compteur); // arrêter d'observer une fois animé
            }
        });
    });
    compteur.forEach(function(compteur) {
        observerCompteur.observe(compteur);
    });
    /* ====animation fade-in des sections==== */
    const sections = document.querySelectorAll('section');
    // ajouter la transition a toutes les sections
    sections.forEach(function(section) {
        section.style.transition = 'opacity 3s ease, transform 3s ease';
        // verifier si la section est dejat visible
        const position = section.getBoundingClientRect().top;
        if (position > window.innerHeight){
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
        }
    });
    // au scroll reveler les section
    window.addEventListener('scroll', function() {
        sections.forEach(function(section) {
            const position = section.getBoundingClientRect().top;
            if (position < window.innerHeight -100){
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
            // section hors camera disparrait
            if ( position > window.innerHeight){
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
            }
        });
    });
     
/* ====== Effet typewriter sur le titre hero ===== */
const titreHero = document.querySelector('.hero h1')
if (titreHero) {
    const texteOriginal = titreHero.textContent;
    titreHero.textContent = '';
    let index = '0';

    function ecrireLettre(){
        if (index < texteOriginal.length){ 
            titreHero.textContent += texteOriginal.charAt(index);
            index++;
            setTimeout(ecrireLettre, 80)// 80ms entre chaque lettre 
    }
}
// demarre apres 500ms 
setTimeout(ecrireLettre, 500);
}
            
    
});

