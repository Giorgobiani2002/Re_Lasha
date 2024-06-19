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
const swiper2 = new Swiper(".swiper", {
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
    },
  },
});

let days = document.querySelector(".day");
let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");

let saleDate = new Date("july 15 2024 15:35");
function timerCount() {
  let currentTime = new Date();
  let difference = saleDate - currentTime;
  let days1 = Math.floor(difference / 1000 / 60 / 60 / 24);
  let hours1 = Math.floor(difference / 1000 / 60 / 60) % 24;
  let minutes1 = Math.floor(difference / 1000 / 60) % 60;
  let seconds1 = Math.floor(difference / 1000) % 60;
  days.innerHTML=days1;
  hours.innerHTML=hours1
  minutes.innerHTML=minutes1;
  seconds.innerHTML=seconds1;

}
setInterval (timerCount,1000);
