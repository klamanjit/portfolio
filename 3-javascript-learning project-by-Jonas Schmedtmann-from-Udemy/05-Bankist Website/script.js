"use strict";
/////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operation__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal);

// for (const mol of btnsOpenModal) mol.addEventListener("click", openModal);

btnsOpenModal.forEach((mol) => mol.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////
// Btn scrolling

btnScrollTo.addEventListener("click", function (e) {
  const s1coordinate = section1.getBoundingClientRect();
  // console.log(s1coordinate);
  // console.log(e.target.getBoundingClientRect());
  // console.log(window.pageXOffset, window.pageYOffset);

  window.scrollTo({
    left: s1coordinate.left + window.pageXOffset,
    top: s1coordinate.top + window.pageYOffset,
    behavior: "smooth",
  });

  // section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////
// Page navigation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////
// Tabbed component
tabsContainer.addEventListener("click", function (e) {
  // console.log(e.target);
  const clicked = e.target.closest(".operation__tab");
  // console.log(clicked);

  if (clicked) {
    // remove active classes
    tabs.forEach((tab) => tab.classList.remove("operation__tab--active"));
    tabContent.forEach((content) =>
      content.classList.remove("operations__content--active")
    );

    // Activate tab and content
    clicked.classList.add("operation__tab--active");
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});

/////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("#logo");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// passing argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/////////////////////
// Sticky navigation

const header = document.querySelector(".header");
const navHieght = nav.getBoundingClientRect().height;
// console.log(navHieght);

const stickynav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.target);
  if (entry.isIntersecting === false) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHieght}px`,
});

headerObserver.observe(header);

/////////////////////
// Reveal sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.target);

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};

const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionsObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading img
const imagTargets = document.querySelectorAll(".features__img");
// console.log(imagTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    // console.log(entry.target.src, entry.target.dataset.src);
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
  }
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});

imagTargets.forEach((img) => {
  imgObserver.observe(img);
});

/////////////////////
// Slider

// Functions
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((s, i) => {
      const html = `<button class="dots__dot" data-slide="${i}"></button>`;

      dotContainer.insertAdjacentHTML("beforeend", html);
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide ="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else curSlide++;

    gotoSlide(curSlide);
    activeDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;

    gotoSlide(curSlide);
    activeDot(curSlide);
  };

  const init = function () {
    createDots();
    activeDot(0);
    gotoSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    // console.log(e.key);
    if (e.key === "ArrowLeft") {
      prevSlide();
    }
    if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      // console.log(slide);
      gotoSlide(slide);
      activeDot(slide);
    }
  });
};

slider();
