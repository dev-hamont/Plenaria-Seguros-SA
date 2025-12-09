document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR =========================================================
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav__list');
  
  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navList.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
      }
    });

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
      });
    });
  }


  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      form.reset();
      success.style.display = "block";
    } else {
      alert("Hubo un error al enviar el formulario. Intenta nuevamente.");
    }
  });

  // === TESTIMONIALS CAROUSEL ==========================================
  const testimonialCards = document.querySelectorAll('.testimonials__card');
  const prevButton = document.querySelector('.testimonials__carousel-btn.prev');
  const nextButton = document.querySelector('.testimonials__carousel-btn.next');

  if (testimonialCards.length && prevButton && nextButton) {
    let currentIndex = 0;

    function updateCarousel() {
      testimonialCards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        if (index === currentIndex) {
          card.classList.add('active');
        } else if (index === (currentIndex - 1 + testimonialCards.length) % testimonialCards.length) {
          card.classList.add('prev');
        } else if (index === (currentIndex + 1) % testimonialCards.length) {
          card.classList.add('next');
        }
      });
    }

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
      updateCarousel();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonialCards.length;
      updateCarousel();
    });

    updateCarousel();
  }
  
  // === AOS ==========================================================
  if (window.AOS) {
    AOS.init();
  }
});
