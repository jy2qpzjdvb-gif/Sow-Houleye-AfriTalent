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
            setTimeout(ecrireLettre, 40)// 80ms entre chaque lettre 
    }
}
// demarre apres 500ms 
setTimeout(ecrireLettre, 400);
}
/*========== filtrage dynamique des freelances ===========*/
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".freelance-card");

// fonction pour animer les visible avec delai progressif
function animerCartes(cartesVisibles){
    cartesVisibles.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";

        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 300); // delai progressif : 0ms , 100ms ,200ms ...
    })
}

  buttons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        // retirer la classe active de tout les boutons
        buttons.forEach(btn => btn.classList.remove("active"));
        // ajouter la classe active au bouton cliquer
        button.classList.add("active");
        
        const cartesVisibles = [];

        cards.forEach(card => {
            if(filter === "all" || card.dataset.category === filter){
                card.classList.remove("hidden");
                cartesVisibles.push(card); 
            }else{
                card.classList.add("hidden");
                card.style.opacity = "0";
            }
        });
        // lancer l'animation sur les cartes visibles
        animerCartes(cartesVisibles);
    });
  });
    /*======= validation formulaire de contact =========*/
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function(e){
            e.preventDefault();
            let valide = true;
            //----nom----
            const name = document.getElementById("name");
            const nameError = document.getElementById("nameError");
            if (name.value.trim() === "") {
                nameError.textContent = "Le nom est obligatoire.";
                name.classList.add("is-invalid");
                name.classList.remove("is-valid");
                valide = false;
            }else{
                nameError.textContent = "";
                name.classList.add("is-valid");
                name.classList.remove("is-invalid")
            }
            //----prenom-----
            const surname = document.getElementById("surname");
            const surnameError = document.getElementById("surnameError");
            if (surname.value.trim() === "") {
                surnameError.textContent = "Le prenom est obligatoire.";
                surname.classList.add("is-invalid");
                surname.classList.remove("is-valid");
                valide = false;
            }else{
                surnameError.textContent = "";
                surname.classList.add("is-valid");
                surname.classList.remove("is-invalid")
            }
            //-----email---
            const email = document.getElementById("email");
            const emailError = document.getElementById("emailError");
            const regexEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === "") {
                emailError.textContent = "L'Email est obligatoire.";
                email.classList.add("is-invalid");
                email.classList.remove("is-valid");
                valide = false;
            }else{
                emailError.textContent = "";
                email.classList.add("is-valid");
                email.classList.remove("is-invalid")
            }
            //-----sujet-----
            const subject = document.getElementById("subject");
            // on cree l'erreur dynamique si elle n'existe pas
            let subjectError = document.getElementById("subjectError");
            if (!subjectError) {
                subjectError = document.createElement("small");
                subjectError.id = "subjectError";
                subjectError.classList.add("text-danger");
                subject.after(subjectError);
            }
            if (subject.value === "") {
                subjectError.textContent = "Veuillez selectionner un sujet.";
                subject.classList.add("is-invalid");
                subject.classList.remove("is-valid");
                valide = false;
            }else{
                subjectError.textContent = "";
                subject.classList.add("is-valid");
                subject.classList.remove("is-invalid")
            }
            //------message-----
            const message = document.getElementById("message");
            // même chose pour messageError
            let messageError = document.getElementById("messageError");
            if (!messageError) {
                messageError = document.createElement("small");
                messageError.id = "messageError";
                messageError.classList.add("text-danger");
                messageError.after(messageError);
            }
            if (message.value.trim().length < 20 ) {
                messageError.textContent = "Le message doit contenir au moins 20 caractères.";
                message.classList.add("is-invalid");
                message.classList.remove("is-valid");
                valide = false;
            }else{
                messageError.textContent = "";
                message.classList.add("is-valid");
                message.classList.remove("is-invalid")
            }
            //----succes----
            if(valide) {
                 const successMessage = document.getElementById("successMessage");
                 successMessage.style.display = "block";
                 form.reset();
                 // retirer les classes vertes apres reset
                 form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
                 // cacher le message apres 4 sec
                 setTimeout(() => successMessage.style.display = "none", 4000);
            }
        })
    }
});

