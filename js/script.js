"use strict";

const windowLoad = () => {
  document.body.classList.add("loaded");

  if (document.querySelector(".main-slider")) {
    new Swiper(".main-slider", {
      speed: 2000,
      effect: "fade",
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: ".bullet__items",
        type: "bullets",
        clickable: true,
      },
    });
  }

  const getIndex = el => Array.from(el.parentNode.children).indexOf(el);

  const documentActions = e => {
    if (e.target.closest(".nav-popular__item")) {
      const tabNavItem = e.target.closest(".nav-popular__item");
      if (!tabNavItem.classList.contains("active")) {
        const activeTabNavItem = document.querySelector(
          ".nav-popular__item.active"
        );
        activeTabNavItem.classList.remove("active");
        tabNavItem.classList.add("active");

        const tabItems = document.querySelectorAll(".popular__tab");
        const activeTanItem = document.querySelector(".popular__tab.active");

        activeTanItem.classList.remove("active");
        tabItems[getIndex(tabNavItem)].classList.add("active");
      }
    }

    if (e.target.closest(".footer__up")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  };

  document.addEventListener("click", documentActions);

  //Watcher
  const items = document.querySelectorAll("[data-item]");

  const options = { threshold: 0.2 };
  const callback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log(entry);
        entry.target.classList.add("active");
      }
    });
  };

  let observer = new IntersectionObserver(callback, options);

  items.forEach(item => {
    observer.observe(item);
  });
};

window.addEventListener("load", windowLoad);
