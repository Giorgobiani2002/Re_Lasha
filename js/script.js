AOS.init();
const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
const swiper2 = new Swiper('.swiper', {
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    583: {
      slidesPerView: 2,
      
    },
    // when window width is >= 480px
    863: {
      slidesPerView: 3,
      
    },
    // when window width is >= 640px
    1440: {
      slidesPerView: 4,
      
    }
  }
})
