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

  // === AOS ==========================================================
  if (window.AOS) {
    AOS.init();
  }
});
