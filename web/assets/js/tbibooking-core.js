document.addEventListener("DOMContentLoaded", function () {
  const isDesktop = window.innerWidth > 1024;
  const requiredFiles = isDesktop
    ? ["tbibooking.ui.min.css"]
    : ["tbibooking-mob.ui.min.css"];

  function checkAllResourcesLoaded() {
    const resources = performance.getEntriesByType("resource");
    const loadedFiles = resources
      .map((res) => res.name.split("/").pop())
      .filter((name) => requiredFiles.includes(name));

    return requiredFiles.every((file) => loadedFiles.includes(file));
  }

  if (document.getElementById("search-box")) {
    function fetchEngine() {
      try {
        const xhrobj = new XMLHttpRequest();
        xhrobj.open("GET", "search-engine.bc");
        xhrobj.send();

        xhrobj.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const container = document.getElementById("search-box");
            container.innerHTML = xhrobj.responseText;

            [".Basis_Date.end_date", ".Basis_Date.start_date"].forEach(
              (selector) => {
                const dateInputs = document.querySelectorAll(selector);
                dateInputs.forEach((input) => {
                  input.placeholder = "";
                });
              }
            );
            let r = document.querySelector(".flighttype-field");
            r.classList.add("flighttype-dropDown");
            const scripts = container.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
              const scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = false;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head
                .appendChild(scriptTag)
                .parentNode.removeChild(scriptTag);
            }
          }
        };
      } catch (error) {
        console.error("مشکلی پیش آمده است. لطفا صبور باشید", error);
      }
    }

    function waitForFiles() {
      if (checkAllResourcesLoaded()) {
        fetchEngine();
      } else {
        setTimeout(waitForFiles, 500);
      }
    }
    waitForFiles();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const headerMenu = document.querySelector(".header-menu");
  const headerMenuClose = document.querySelector(".header-menu-close");
  const bars3 = document.querySelector(".bars3");

  if (headerMenu && headerMenuClose && bars3) {
    if (window.innerWidth >= 1024) {
      headerMenuClose.addEventListener("click", function () {
        headerMenu.style.visibility = "hidden";
        headerMenu.style.opacity = "0";
        document.body.classList.remove("overflow-hidden");
      });

      bars3.addEventListener("click", function () {
        headerMenu.style.visibility = "visible";
        headerMenu.style.opacity = "1";
        document.body.classList.add("overflow-hidden");
      });
    } else {
      headerMenuClose.addEventListener("click", function () {
        headerMenu.style.transform = "translateX(1024px)";
        document.body.classList.remove("overflow-hidden");
      });

      bars3.addEventListener("click", function () {
        headerMenu.style.transform = "translateX(0)";
        document.body.classList.add("overflow-hidden");
      });
    }
  }

  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  if (toggleDropdowns.length && dropdownIcons.length) {
    toggleDropdowns.forEach((toggle, index) => {
      const submenu = toggle.nextElementSibling;
      const dropdownIcon = dropdownIcons[index];

      if (!submenu || !dropdownIcon) return;

      toggle.addEventListener("click", function () {
        dropdownIcon.classList.toggle("rotate-180");

        if (submenu.style.maxHeight) {
          submenu.style.maxHeight = null;
          submenu.style.opacity = "0";
        } else {
          submenu.style.maxHeight = submenu.scrollHeight * 30 + "px";
          submenu.style.opacity = "1";
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const faqBoxes = document.querySelectorAll(".faq-box");

  faqBoxes.forEach((box) => {
    const answer = box.querySelector(".faq-answer");

    box.addEventListener("click", function () {
      const isOpen = answer.classList.contains("scale-y-100");

      faqBoxes.forEach((otherBox) => {
        if (otherBox !== box) {
          const otherAnswer = otherBox.querySelector(".faq-answer");
          otherAnswer.classList.remove(
            "opacity-100",
            "scale-y-100",
            "max-h-96",
            "mt-2"
          );
          otherAnswer.classList.add("opacity-0", "scale-y-0", "max-h-0");
          otherBox.style.backgroundColor = "";
          otherBox.style.border = "";
        }
      });

      if (isOpen) {
        answer.classList.remove(
          "opacity-100",
          "scale-y-100",
          "max-h-96",
          "mt-2"
        );
        answer.classList.add("opacity-0", "scale-y-0", "max-h-0");
        box.style.backgroundColor = "";
        box.style.border = "";
      } else {
        answer.classList.remove("opacity-0", "scale-y-0", "max-h-0");
        answer.classList.add("opacity-100", "scale-y-100", "max-h-96", "mt-2");
        box.style.backgroundColor = "#FFF8E3";
        box.style.border = "2px solid #FFE189";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const formatWithK = (num) => {
    if (num >= 1000) {
      return "+" + Math.round(num / 1000) + "k";
    }
    return "+" + Math.round(num).toString();
  };

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const duration = 200;
    const increment = target / duration;

    const update = () => {
      current += increment;

      if (current < target) {
        counter.innerText = formatWithK(current);
        requestAnimationFrame(update);
      } else {
        counter.innerText = formatWithK(target);
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  counters.forEach((counter) => observer.observe(counter));
});

// filter hotel-card
document.addEventListener("DOMContentLoaded", function () {
  const cityMenu = document.getElementById("cityDropdownMenu");
  const ratingMenu = document.getElementById("ratingDropdownMenu");
  const priceMenu = document.getElementById("priceDropdownMenu");
  const priceButton = document.getElementById("priceFilter");
  const priceOptions = priceMenu
    ? priceMenu.querySelectorAll(".price-option")
    : [];
  const hotelCards = Array.from(document.querySelectorAll(".hotel-card"));
  const hotelWrapper = document.querySelector(".hotel-card-wrapper");
  const cityFilter =
    document.querySelector('.filter-option[data-filter="city"]') ||
    document.getElementById("cityFilter");
  const ratingFilter =
    document.querySelector('.filter-option[data-filter="rating"]') ||
    document.getElementById("ratingFilter");

  const activeCityFilters = new Set();
  const activeRatingFilters = new Set();
  let activePriceFilter = null;

  function extractPriceNumber(priceString) {
    if (!priceString) return 0;
    const numericValue = priceString.replace(/[^0-9.]/g, "");
    return parseFloat(numericValue) || 0;
  }

  function generateCityFilterOptions() {
    if (!cityMenu) return;
    const cities = new Set();
    hotelCards.forEach((card) => {
      const city = card.dataset.hotel;
      if (city) cities.add(city.trim());
    });
    cityMenu.innerHTML = "";
    cities.forEach((city) => {
      const option = document.createElement("div");
      option.className =
        "group city-option cursor-pointer p-1 border-b border-gray-100";
      option.dataset.city = city;
      option.innerHTML = `
        <span class="flex items-center gap-3 text-sm font-bold transition-all duration-300 group-hover:text-primary-500">
          <span class="city-check-icon flex items-center justify-center w-4 h-4 border border-primary-100 rounded">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
              <path d="M3.48177 9.33333L5.38153 10.7582C5.81022 11.0797 6.41615 11.0061 6.75548 10.5914L12.1484 4"
                stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
          ${city}
        </span>
      `;
      cityMenu.appendChild(option);
    });
  }

  function generateRatingFilterOptions() {
    if (!ratingMenu) return;
    ratingMenu.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const option = document.createElement("div");
      option.className =
        "group rating-option cursor-pointer p-1 border-b border-gray-100";
      option.dataset.rating = i;

      let starsHTML = "";
      for (let j = 0; j < i; j++) {
        starsHTML += `
          <svg width="24" height="24" class="flex-shrink-0">
            <use href="/images/sprite-icons.svg#icon-golden-star"></use>
          </svg>
        `;
      }

      option.innerHTML = `
        <span class="flex items-center gap-3 text-sm font-bold transition-all duration-300 group-hover:text-primary-500">
          <span class="rating-check-icon flex items-center justify-center w-4 h-4 border border-primary-100 rounded">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
              <path d="M3.48177 9.33333L5.38153 10.7582C5.81022 11.0797 6.41615 11.0061 6.75548 10.5914L12.1484 4"
                stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
          ${i} star
          <div class="flex items-center">${starsHTML}</div>
        </span>
      `;
      ratingMenu.appendChild(option);
    }
  }

  function applyFilters() {
    if (!hotelWrapper) return;

    let filteredCards = hotelCards.filter((card) => {
      const city = card.dataset.hotel;
      const rating = parseInt(card.dataset.rating) || 0;
      const price = extractPriceNumber(card.dataset.price);

      const cityMatch =
        activeCityFilters.size === 0 || activeCityFilters.has(city);
      const ratingMatch =
        activeRatingFilters.size === 0 || activeRatingFilters.has(rating);

      let priceMatch = true;
      if (activePriceFilter === "best-price") {
        priceMatch = price < 300;
      }

      return cityMatch && ratingMatch && priceMatch;
    });

    hotelCards.forEach((card) => {
      card.style.display = "none";
    });

    filteredCards.forEach((card) => {
      card.style.display = "block";
    });

    if (activePriceFilter === "high-to-low") {
      filteredCards.sort(
        (a, b) =>
          extractPriceNumber(b.dataset.price) -
          extractPriceNumber(a.dataset.price)
      );
    } else if (activePriceFilter === "low-to-high") {
      filteredCards.sort(
        (a, b) =>
          extractPriceNumber(a.dataset.price) -
          extractPriceNumber(b.dataset.price)
      );
    }

    filteredCards.forEach((card) => {
      hotelWrapper.appendChild(card);
    });
  }

  if (cityMenu) {
    cityMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      const option = e.target.closest(".city-option");
      if (!option) return;

      const selectedCity = option.dataset.city;
      const icon = option.querySelector(".city-check-icon");

      if (activeCityFilters.has(selectedCity)) {
        activeCityFilters.delete(selectedCity);
        if (icon) icon.classList.remove("bg-primary-500", "text-white");
      } else {
        activeCityFilters.add(selectedCity);
        if (icon) icon.classList.add("bg-primary-500", "text-white");
      }

      applyFilters();
    });
  }

  if (ratingMenu) {
    ratingMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      const option = e.target.closest(".rating-option");
      if (!option) return;

      const selectedRating = parseInt(option.dataset.rating);
      const icon = option.querySelector(".rating-check-icon");

      if (activeRatingFilters.has(selectedRating)) {
        activeRatingFilters.delete(selectedRating);
        if (icon) icon.classList.remove("bg-primary-500", "text-white");
      } else {
        activeRatingFilters.add(selectedRating);
        if (icon) icon.classList.add("bg-primary-500", "text-white");
      }

      applyFilters();
    });
  }

  if (cityFilter) {
    cityFilter.addEventListener("click", (e) => {
      e.stopPropagation();
      if (cityMenu) {
        cityMenu.classList.toggle("hidden");
        if (!cityMenu.classList.contains("hidden")) {
          if (ratingMenu) ratingMenu.classList.add("hidden");
          if (priceMenu) priceMenu.classList.add("hidden");
          priceMenuOpen = false;
        }
      }
    });
  }

  if (ratingFilter) {
    ratingFilter.addEventListener("click", (e) => {
      e.stopPropagation();
      if (ratingMenu) {
        ratingMenu.classList.toggle("hidden");
        if (!ratingMenu.classList.contains("hidden")) {
          if (cityMenu) cityMenu.classList.add("hidden");
          if (priceMenu) priceMenu.classList.add("hidden");
          priceMenuOpen = false;
        }
      }
    });
  }

  let priceMenuOpen = false;
  if (priceButton) {
    priceButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (priceMenu) {
        priceMenuOpen = !priceMenuOpen;
        priceMenu.classList.toggle("hidden", !priceMenuOpen);
        if (priceMenuOpen) {
          if (cityMenu) cityMenu.classList.add("hidden");
          if (ratingMenu) ratingMenu.classList.add("hidden");
        }
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (
      cityFilter &&
      cityMenu &&
      !cityFilter.contains(e.target) &&
      !cityMenu.contains(e.target)
    ) {
      cityMenu.classList.add("hidden");
    }
    if (
      ratingFilter &&
      ratingMenu &&
      !ratingFilter.contains(e.target) &&
      !ratingMenu.contains(e.target)
    ) {
      ratingMenu.classList.add("hidden");
    }
    if (
      priceButton &&
      priceMenu &&
      !priceButton.contains(e.target) &&
      !priceMenu.contains(e.target)
    ) {
      priceMenu.classList.add("hidden");
      priceMenuOpen = false;
    }
  });

  if (priceOptions) {
    priceOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        if (priceMenu) {
          priceMenu.querySelectorAll(".price-check-icon").forEach((icon) => {
            icon.classList.remove("bg-primary-500", "text-white");
          });
        }

        const icon = option.querySelector(".price-check-icon");
        if (icon) icon.classList.add("bg-primary-500", "text-white");

        activePriceFilter = option.dataset.price;

        applyFilters();
      });
    });
  }

  generateCityFilterOptions();
  generateRatingFilterOptions();
});

// filter tour-list card
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".tourL-tour-card");
  const airlineFilterContainer = document.querySelector(".airline-filter");
  const daysFilterContainer = document.querySelector(".days-filter");

  const minInput = document.getElementById("minRange");
  const maxInput = document.getElementById("maxRange");
  const rangeTrack = document.getElementById("rangeTrack");
  const minValText = document.getElementById("minValue");
  const maxValText = document.getElementById("maxValue");

  const filterBtn = document.getElementById("filterOpenBtn");
  const closeBtn = document.getElementById("filterCloseBtn");
  const removeFiltersBtn = document.getElementById("clearFiltersBtn");

  const filterPanel = document.querySelector(".filters-panel");

  const normalizeText = (text) => text.replace(/\s/g, "").toLowerCase();

  const uniqueAirlines = new Map();
  const uniqueDays = new Set();

  cards.forEach((card) => {
    const airlineName = card.dataset.airlineName?.trim();
    const airlineImg = card.dataset.airline?.trim();
    const days = card.dataset.days?.trim();

    if (airlineName && airlineImg && !uniqueAirlines.has(airlineName)) {
      uniqueAirlines.set(airlineName, airlineImg);
    }
    if (days) {
      uniqueDays.add(days);
    }
  });

  if (airlineFilterContainer) {
    uniqueAirlines.forEach((img, name) => {
      const id = `airline-${normalizeText(name)}`;
      const wrapper = document.createElement("div");
      wrapper.className = "flex items-center gap-5";
      wrapper.innerHTML = `
        <input type="radio" name="airline" id="${id}" value="${normalizeText(
        name
      )}" class="airline-input w-5 h-5" />
        <label for="${id}" class="flex items-center gap-1 cursor-pointer">
          <img src="[##cms.cms.cdn##]/images/${img}" alt="${name}" width="60" height="30" loading="lazy" />
          <span class="text-zinc-500 text-xs">${name}</span>
        </label>
      `;
      airlineFilterContainer.appendChild(wrapper);
    });
  }

  if (daysFilterContainer) {
    uniqueDays.forEach((days) => {
      const id = `days-${normalizeText(days)}`;
      const wrapper = document.createElement("div");
      wrapper.className = "flex items-center gap-5";
      wrapper.innerHTML = `
        <input type="radio" name="days" id="${id}" value="${normalizeText(
        days
      )}" class="days-input w-5 h-5" />
        <label for="${id}" class="text-zinc-500 text-sm cursor-pointer">${days}</label>
      `;
      daysFilterContainer.appendChild(wrapper);
    });
  }

  const parsePrice = (priceStr) => {
    let clean = priceStr.replace(/[^\d]/g, "");
    return parseInt(clean, 10);
  };
  const formatPrice = (val) => val.toLocaleString("en-US");

  let REAL_MIN = 0;
  let REAL_MAX = 0;
  let realMin = 0;
  let realMax = 0;

  const prices = Array.from(cards)
    .map((card) => parsePrice(card.dataset.price || "0"))
    .filter((p) => p > 0);

  if (prices.length) {
    REAL_MIN = Math.min(...prices);
    REAL_MAX = Math.max(...prices);
    realMin = REAL_MIN;
    realMax = REAL_MAX;
  }

  let selectedAirline = null;
  let selectedDay = null;

  function filterCards() {
    cards.forEach((card) => {
      const price = parsePrice(card.dataset.price || "0");
      const airline = normalizeText(card.dataset.airlineName || "");
      const days = normalizeText(card.dataset.days || "");

      const matchPrice = price >= realMin && price <= realMax;
      const matchAirline = !selectedAirline || airline === selectedAirline;
      const matchDays = !selectedDay || days === selectedDay;

      card.style.display =
        matchPrice && matchAirline && matchDays ? "block" : "none";
    });
  }

  function updatePriceRange() {
    if (!minInput || !maxInput || !rangeTrack || !minValText || !maxValText)
      return;

    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);
    if (min > max) [min, max] = [max, min];

    const left = min;
    const width = max - min;
    rangeTrack.style.left = `${left}%`;
    rangeTrack.style.width = `${width}%`;

    realMin = Math.floor(REAL_MIN + ((REAL_MAX - REAL_MIN) * min) / 100);
    realMax = Math.floor(REAL_MIN + ((REAL_MAX - REAL_MIN) * max) / 100);

    minValText.textContent = formatPrice(realMin);
    maxValText.textContent = formatPrice(realMax);

    filterCards();
  }

  if (minInput && maxInput) {
    minInput.addEventListener("input", updatePriceRange);
    maxInput.addEventListener("input", updatePriceRange);
    updatePriceRange();
  }

  if (airlineFilterContainer) {
    airlineFilterContainer.addEventListener("change", (e) => {
      if (e.target.classList.contains("airline-input")) {
        selectedAirline = e.target.checked ? e.target.value : null;
        filterCards();
      }
    });
  }

  if (daysFilterContainer) {
    daysFilterContainer.addEventListener("change", (e) => {
      if (e.target.classList.contains("days-input")) {
        selectedDay = e.target.checked ? e.target.value : null;
        filterCards();
      }
    });
  }

  if (filterBtn && filterPanel) {
    filterBtn.addEventListener("click", () => {
      filterPanel.classList.remove("translate-y-full");
    });
  }

  if (closeBtn && filterPanel) {
    closeBtn.addEventListener("click", () => {
      filterPanel.classList.add("translate-y-full");
    });
  }

  if (removeFiltersBtn) {
    removeFiltersBtn.addEventListener("click", () => {
      selectedAirline = null;
      selectedDay = null;

      if (airlineFilterContainer) {
        airlineFilterContainer
          .querySelectorAll("input.airline-input")
          .forEach((input) => (input.checked = false));
      }
      if (daysFilterContainer) {
        daysFilterContainer
          .querySelectorAll("input.days-input")
          .forEach((input) => (input.checked = false));
      }

      if (minInput && maxInput) {
        minInput.value = 0;
        maxInput.value = 100;
        updatePriceRange();
      }

      filterCards();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const hotelCards = document.querySelectorAll(".hotel-card");
  const hotelNameFilterInput = document.getElementById("hotelNameFilter");
  const starOptions = document.querySelectorAll(".star-filter-option");
  const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
  const minInput = document.getElementById("minRange");
  const maxInput = document.getElementById("maxRange");
  const rangeTrack = document.getElementById("rangeTrack");
  const minValText = document.getElementById("minValue");
  const maxValText = document.getElementById("maxValue");

  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^\d]/g, ""), 10);
  const formatPrice = (val) => val.toLocaleString("en-US");

  let REAL_MIN = 0;
  let REAL_MAX = 0;
  let realMin = 0;
  let realMax = 0;

  let selectedStars = new Set();
  let selectedServices = new Set();
  let hotelNameFilter = "";

  const prices = Array.from(hotelCards)
    .map((card) => parsePrice(card.dataset.price || "0"))
    .filter((p) => p > 0);

  if (prices.length) {
    REAL_MIN = Math.min(...prices);
    REAL_MAX = Math.max(...prices);
    realMin = REAL_MIN;
    realMax = REAL_MAX;
  }

  function filterCards() {
    hotelCards.forEach((card) => {
      const price = parsePrice(card.dataset.price || "0");
      const star = card.dataset.rating;
      const service = card.dataset.servies;
      const name = card.dataset.hotel?.toLowerCase() || "";

      const matchName = name.includes(hotelNameFilter);
      const matchStar = selectedStars.size === 0 || selectedStars.has(star);
      const matchService =
        selectedServices.size === 0 || selectedServices.has(service);
      const matchPrice = price >= realMin && price <= realMax;

      card.style.display =
        matchName && matchStar && matchService && matchPrice ? "block" : "none";
    });
  }

  if (hotelNameFilterInput) {
    hotelNameFilterInput.addEventListener("input", () => {
      hotelNameFilter = hotelNameFilterInput.value.trim().toLowerCase();
      filterCards();
    });
  }

  starOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const star = option.dataset.star;
      if (selectedStars.has(star)) {
        selectedStars.delete(star);
        option.classList.remove("bg-secondary-800", "text-white");
        option.classList.add("border-primary-900", "border", "border-solid");
      } else {
        selectedStars.add(star);
        option.classList.add("bg-secondary-800", "text-white");
        option.classList.remove("border-primary-900", "border", "border-solid");
      }
      filterCards();
    });
  });

  serviceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      selectedServices.clear();
      serviceCheckboxes.forEach((cb) => {
        if (cb.checked) selectedServices.add(cb.value);
      });
      filterCards();
    });
  });

  function updatePriceRange() {
    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);
    if (min > max) [min, max] = [max, min];

    const left = min;
    const width = max - min;
    rangeTrack.style.left = `${left}%`;
    rangeTrack.style.width = `${width}%`;

    realMin = Math.floor(REAL_MIN + ((REAL_MAX - REAL_MIN) * min) / 100);
    realMax = Math.floor(REAL_MIN + ((REAL_MAX - REAL_MIN) * max) / 100);

    minValText.textContent = formatPrice(realMin);
    maxValText.textContent = formatPrice(realMax);

    filterCards();
  }

  if (minInput && maxInput) {
    minInput.addEventListener("input", updatePriceRange);
    maxInput.addEventListener("input", updatePriceRange);
    updatePriceRange();
  }

  const clearFiltersBtnHotel = document.getElementById("clearFiltersBtnHotel");

  if (clearFiltersBtnHotel) {
    clearFiltersBtnHotel.addEventListener("click", () => {
      if (hotelNameFilterInput) {
        hotelNameFilterInput.value = "";
        selectedHotelName = "";
      }

      selectedStars.clear();
      starOptions.forEach((option) => {
        option.classList.remove("bg-secondary-800", "text-white");
        option.classList.add("border-primary-900", "border", "border-solid");
      });

      selectedServices.clear();
      serviceCheckboxes.forEach((cb) => (cb.checked = false));

      minInput.value = 0;
      maxInput.value = 100;
      updatePriceRange();

      filterCards();
    });
  }
});

document.querySelectorAll(".accordion-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = toggle.nextElementSibling;
    const icon = toggle.querySelector(".chevron-icon");

    content.classList.toggle("max-h-[500px]");
    icon.classList.toggle("rotate-180");
  });
});

// see-more
document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector(".content-inner");
  const button = document.querySelector(".see-more");

  if (!content || !button) return;

  const collapsedHeight = 80;
  let expanded = false;

  const fullHeight = content.scrollHeight;

  if (fullHeight <= collapsedHeight) {
    button.style.display = "none";
    content.style.height = "auto";
  } else {
    content.style.height = collapsedHeight + "px";
    content.style.overflow = "hidden";
    content.style.transition = "height 0.5s ease";

    button.style.display = "inline-block";
    button.textContent = "مشاهده بیشتر";

    button.addEventListener("click", function () {
      if (!expanded) {
        content.style.height = fullHeight + "px";
        button.textContent = "نمایش کمتر";
      } else {
        content.style.height = collapsedHeight + "px";
        button.textContent = "مشاهده بیشتر";
      }
      expanded = !expanded;
    });
  }
});

const fallbackSrc = "/images/no-img.jpg";

function applyImageFallbacks(context = document) {
  context.querySelectorAll("img").forEach((img) => {
    if (!img.getAttribute("src")) {
      img.setAttribute("src", fallbackSrc);
    }

    img.onerror = function () {
      this.onerror = null;
      this.src = fallbackSrc;
    };
  });
}

document.addEventListener("DOMContentLoaded", function () {
  applyImageFallbacks();
});

// fetch tour default
document.addEventListener("DOMContentLoaded", function () {
  const fetchContentTour = document.querySelector(".fetch-content-tour");
  const tourLi = document.querySelectorAll(".tour-li");

  let swiperInstance = null;

  function initSwiperIfMobile() {
    const swiperEl = document.querySelector(".swiper-featured-tours-mobile");
    if (window.innerWidth <= 1024 && swiperEl) {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
      swiperInstance = new Swiper(".swiper-featured-tours-mobile", {
        slidesPerView: 1.1,
        speed: 400,
        centeredSlides: false,
        spaceBetween: 12,
        grabCursor: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        loop: true,
      });
    }
  }

  function updateLoadMoreLink(catid) {
    const loadMoreLink = document.querySelector(".load-more-tours");
    if (loadMoreLink) {
      loadMoreLink.setAttribute("href", `/tour-list.bc?catid=${catid}`);
    }
  }

  if (fetchContentTour) {
    async function firstContent() {
      const firstDataId = tourLi[0].getAttribute("data-id");
      fetchContentTour.innerHTML =
        '<div class="w-full flex justify-center mt-10"><span class="fetch-loader"></span></div>';
      try {
        const firstResponse = await fetch(
          `/tour-load-items.bc?catid=${firstDataId}`
        );
        if (!firstResponse.ok) {
          throw new Error(`HTTP error! Status: ${firstResponse.status}`);
        }
        const firstData = await firstResponse.text();
        fetchContentTour.innerHTML = firstData;

        applyImageFallbacks(fetchContentTour);
        initSwiperIfMobile();
        updateLoadMoreLink(firstDataId);
      } catch (error) {
        console.error("Fetch failed:", error);
        fetchContentTour.innerHTML =
          "<p>Error loading data: " + error.message + "</p>";
      }
      if (tourLi.length > 0) {
        tourLi[0].style.backgroundColor = "#013D68";
        tourLi[0].style.color = "#fff";
      }
    }

    firstContent();

    tourLi.forEach((item) => {
      item.addEventListener("click", function () {
        tourLi.forEach((li) => {
          li.style.backgroundColor = "";
          li.style.color = "";
        });

        item.style.backgroundColor = "#013D68";
        item.style.color = "#fff";

        let cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          fetchContentTour.innerHTML =
            '<div class="w-full flex justify-center mt-10"><span class="fetch-loader"></span></div>';
          try {
            const firstResponse = await fetch(
              `/tour-load-items.bc?catid=${cmsQuery}`
            );
            if (!firstResponse.ok) {
              throw new Error(`HTTP error! Status: ${firstResponse.status}`);
            }
            const firstData = await firstResponse.text();
            fetchContentTour.innerHTML = firstData;

            applyImageFallbacks(fetchContentTour);
            initSwiperIfMobile();
            updateLoadMoreLink(cmsQuery);
          } catch (error) {
            fetchContentTour.innerHTML =
              "<p>Error loading data: " + error.message + "</p>";
          }
        }

        secondContent();
      });
    });
  }
});

// footer-form
function uploadDocumentFooter(args) {
  document.querySelector("#footer-form .Loading_Form").style.display = "block";
  const captcha = document
    .querySelector("#footer-form")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#footer-form")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadFooter", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaFooter(e) {
  $bc.setSource("captcha.refreshFooter", true);
}

async function OnProcessedEditObjectFooter(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#footer-form .Loading_Form").style.display = "none";
    document.querySelector("#footer-form .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
    document.querySelector("#footer-form .message-api").style.color =
      "rgb(10 240 10)";
  } else {
    refreshCaptchaFooter();
    setTimeout(() => {
      document.querySelector("#footer-form .Loading_Form").style.display =
        "none";
      document.querySelector("#footer-form .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
      document.querySelector("#footer-form .message-api").style.color =
        "rgb(220 38 38)";
    }, 2000);
  }
}

async function RenderFormFooter() {
  var inputElementVisa7 = document.querySelector(
    " .email-footer input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Enter your email");
}

// about-form
function uploadDocumentAbout(args) {
  document.querySelector("#about-form .Loading_Form").style.display = "block";
  const captcha = document
    .querySelector("#about-form")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#about-form")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadAbout", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaAbout(e) {
  $bc.setSource("captcha.refreshAbout", true);
}

async function OnProcessedEditObjectAbout(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#about-form .Loading_Form").style.display = "none";
    document.querySelector("#about-form .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
    document.querySelector("#about-form .message-api").style.color =
      "rgb(10 240 10)";
  } else {
    refreshCaptchaAbout();
    setTimeout(() => {
      document.querySelector("#about-form .Loading_Form").style.display =
        "none";
      document.querySelector("#about-form .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
      document.querySelector("#about-form .message-api").style.color =
        "rgb(220 38 38)";
    }, 2000);
  }
}

async function RenderFormAbout() {
  var inputElementVisa7 = document.querySelector(
    ".name-about input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Name");

  var inputElementVisa7 = document.querySelector(
    ".email-about input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Email");

  var inputElementVisa7 = document.querySelector(
    ".message-about textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "Description");
}

// swipers
if (document.querySelector(".swiper-popular-destination-mobile")) {
  var swiperPopularDestinationMobile = new Swiper(
    ".swiper-popular-destination-mobile",
    {
      slidesPerView: "auto",
      speed: 400,
      centeredSlides: false,
      spaceBetween: 12,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: true,
    }
  );
}

if (document.querySelector(".swiper-featured-hotels-mobile")) {
  var swiperFeaturedHotelsMobile = new Swiper(
    ".swiper-featured-hotels-mobile",
    {
      slidesPerView: 1.1,
      speed: 400,
      centeredSlides: false,
      spaceBetween: 12,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      loop: true,
    }
  );
}
if (document.querySelector(".swiper-travel-blog-mobile")) {
  var swiperTravelBlogMobile = new Swiper(".swiper-travel-blog-mobile", {
    slidesPerView: 1.1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 12,
    grabCursor: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: true,
  });
}
