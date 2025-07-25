document.addEventListener('DOMContentLoaded', function () {
  const headerMenu = document.querySelector('.header-menu');
  const headerMenuClose = document.querySelector('.header-menu-close');
  const bars3 = document.querySelector('.bars3');

  if (headerMenu && headerMenuClose && bars3) {
    if (window.innerWidth >= 1024) {
      headerMenuClose.addEventListener('click', function () {
        headerMenu.style.visibility = 'hidden';
        headerMenu.style.opacity = '0';
        document.body.classList.remove('overflow-hidden');
      });

      bars3.addEventListener('click', function () {
        headerMenu.style.visibility = 'visible';
        headerMenu.style.opacity = '1';
        document.body.classList.add('overflow-hidden');
      });
    } else {
      headerMenuClose.addEventListener('click', function () {
        headerMenu.style.transform = 'translateX(1024px)';
        document.body.classList.remove('overflow-hidden');
      });

      bars3.addEventListener('click', function () {
        headerMenu.style.transform = 'translateX(0)';
        document.body.classList.add('overflow-hidden');
      });
    }
  }

  const toggleDropdowns = document.querySelectorAll('.toggle-dropdown');
  const dropdownIcons = document.querySelectorAll('.dropdown-icon');

  if (toggleDropdowns.length && dropdownIcons.length) {
    toggleDropdowns.forEach((toggle, index) => {
      const submenu = toggle.nextElementSibling;
      const dropdownIcon = dropdownIcons[index];

      if (!submenu || !dropdownIcon) return;

      toggle.addEventListener('click', function () {
        dropdownIcon.classList.toggle('rotate-180');

        if (submenu.style.maxHeight) {
          submenu.style.maxHeight = null;
          submenu.style.opacity = '0';
        } else {
          submenu.style.maxHeight = submenu.scrollHeight * 30 + 'px';
          submenu.style.opacity = '1';
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const faqBoxes = document.querySelectorAll('.faq-box');

  faqBoxes.forEach((box) => {
    const answer = box.querySelector('.faq-answer');

    box.addEventListener('click', function () {
      const isOpen = answer.classList.contains('scale-y-100');

      faqBoxes.forEach((otherBox) => {
        if (otherBox !== box) {
          const otherAnswer = otherBox.querySelector('.faq-answer');
          otherAnswer.classList.remove('opacity-100', 'scale-y-100', 'max-h-96', 'mt-2');
          otherAnswer.classList.add('opacity-0', 'scale-y-0', 'max-h-0');
          otherBox.style.backgroundColor = '';
          otherBox.style.border = '';
        }
      });

      if (isOpen) {
        answer.classList.remove('opacity-100', 'scale-y-100', 'max-h-96', 'mt-2');
        answer.classList.add('opacity-0', 'scale-y-0', 'max-h-0');
        box.style.backgroundColor = '';
        box.style.border = '';
      } else {
        answer.classList.remove('opacity-0', 'scale-y-0', 'max-h-0');
        answer.classList.add('opacity-100', 'scale-y-100', 'max-h-96', 'mt-2');
        box.style.backgroundColor = '#FFF8E3';
        box.style.border = '2px solid #FFE189';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const formatWithK = (num) => {
    if (num >= 1000) {
      return '+' + Math.round(num / 1000) + 'k';
    }
    return '+' + Math.round(num).toString();
  };

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
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
document.addEventListener('DOMContentLoaded', function () {
  const cityMenu = document.getElementById('cityDropdownMenu');
  const ratingMenu = document.getElementById('ratingDropdownMenu');
  const priceMenu = document.getElementById('priceDropdownMenu');
  const priceButton = document.getElementById('priceFilter');
  const priceOptions = priceMenu.querySelectorAll('.price-option');
  const hotelCards = Array.from(document.querySelectorAll('.hotel-card'));
  const hotelWrapper = document.querySelector('.hotel-card-wrapper');

  const cityFilter = document.querySelector('.filter-option[data-filter="city"]') || document.getElementById('cityFilter');
  const ratingFilter = document.querySelector('.filter-option[data-filter="rating"]') || document.getElementById('ratingFilter');

  const activeCityFilters = new Set();
  const activeRatingFilters = new Set();
  let activePriceFilter = null; 

  function extractPriceNumber(priceString) {
    const numericValue = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(numericValue) || 0;
  }

  function generateCityFilterOptions() {
    const cities = new Set();
    hotelCards.forEach(card => {
      const city = card.dataset.hotel;
      if (city) cities.add(city.trim());
    });
    cityMenu.innerHTML = '';
    cities.forEach(city => {
      const option = document.createElement('div');
      option.className = 'group city-option cursor-pointer p-1 border-b border-gray-100';
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
    ratingMenu.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const option = document.createElement('div');
      option.className = 'group rating-option cursor-pointer p-1 border-b border-gray-100';
      option.dataset.rating = i;
      
      let starsHTML = '';
      for (let j = 0; j < i; j++) {
        starsHTML += `
          <svg width="24" height="24" class="flex-shrink-0">
            <use xlink:href="../assets/images/sprite-icons.svg#icon-golden-star"></use>
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

  // تابع اعمال همه فیلترها روی نمایش کارت‌ها
  function applyFilters() {
    let filteredCards = hotelCards.filter(card => {
      const city = card.dataset.hotel;
      const rating = parseInt(card.dataset.rating);
      const price = extractPriceNumber(card.dataset.price);

      const cityMatch = activeCityFilters.size === 0 || activeCityFilters.has(city);
      const ratingMatch = activeRatingFilters.size === 0 || activeRatingFilters.has(rating);

      let priceMatch = true;
      if (activePriceFilter === 'best-price') {
        priceMatch = price < 300;
      }

      return cityMatch && ratingMatch && priceMatch;
    });

    hotelCards.forEach(card => card.style.display = 'none');

    if (activePriceFilter === 'high-to-low') {
      filteredCards.sort((a, b) => extractPriceNumber(b.dataset.price) - extractPriceNumber(a.dataset.price));
    } else if (activePriceFilter === 'low-to-high') {
      filteredCards.sort((a, b) => extractPriceNumber(a.dataset.price) - extractPriceNumber(b.dataset.price));
    }

    filteredCards.forEach(card => {
      card.style.display = 'block';
      hotelWrapper.appendChild(card);
    });
  }

  // هندلر کلیک روی گزینه‌های شهر
  cityMenu.addEventListener('click', e => {
    e.stopPropagation();
    const option = e.target.closest('.city-option');
    if (!option) return;

    const selectedCity = option.dataset.city;
    const icon = option.querySelector('.city-check-icon');

    if (activeCityFilters.has(selectedCity)) {
      activeCityFilters.delete(selectedCity);
      icon.classList.remove('bg-primary-500', 'text-white');
    } else {
      activeCityFilters.add(selectedCity);
      icon.classList.add('bg-primary-500', 'text-white');
    }

    applyFilters();
  });

  // هندلر کلیک روی گزینه‌های ریتینگ
  ratingMenu.addEventListener('click', e => {
    e.stopPropagation();
    const option = e.target.closest('.rating-option');
    if (!option) return;

    const selectedRating = parseInt(option.dataset.rating);
    const icon = option.querySelector('.rating-check-icon');

    if (activeRatingFilters.has(selectedRating)) {
      activeRatingFilters.delete(selectedRating);
      icon.classList.remove('bg-primary-500', 'text-white');
    } else {
      activeRatingFilters.add(selectedRating);
      icon.classList.add('bg-primary-500', 'text-white');
    }

    applyFilters();
  });

  // باز و بسته کردن منوی شهر
  cityFilter.addEventListener('click', e => {
    e.stopPropagation();
    cityMenu.classList.toggle('hidden');
    if (!cityMenu.classList.contains('hidden')) {
      ratingMenu.classList.add('hidden');
      priceMenu.classList.add('hidden');
      priceMenuOpen = false;
    }
  });

  // باز و بسته کردن منوی ریتینگ
  ratingFilter.addEventListener('click', e => {
    e.stopPropagation();
    ratingMenu.classList.toggle('hidden');
    if (!ratingMenu.classList.contains('hidden')) {
      cityMenu.classList.add('hidden');
      priceMenu.classList.add('hidden');
      priceMenuOpen = false;
    }
  });

  // باز و بسته کردن منوی قیمت
  let priceMenuOpen = false;
  priceButton.addEventListener('click', e => {
    e.stopPropagation();
    priceMenuOpen = !priceMenuOpen;
    priceMenu.classList.toggle('hidden', !priceMenuOpen);
    if (priceMenuOpen) {
      cityMenu.classList.add('hidden');
      ratingMenu.classList.add('hidden');
    }
  });

  // بستن منوها با کلیک خارج
  document.addEventListener('click', e => {
    if (!cityFilter.contains(e.target) && !cityMenu.contains(e.target)) {
      cityMenu.classList.add('hidden');
    }
    if (!ratingFilter.contains(e.target) && !ratingMenu.contains(e.target)) {
      ratingMenu.classList.add('hidden');
    }
    if (!priceButton.contains(e.target) && !priceMenu.contains(e.target)) {
      priceMenu.classList.add('hidden');
      priceMenuOpen = false;
    }
  });

  // هندلر کلیک روی گزینه‌های قیمت
  priceOptions.forEach(option => {
    option.addEventListener('click', e => {
      e.stopPropagation();
      priceMenu.querySelectorAll('.price-check-icon').forEach(icon => {
        icon.classList.remove('bg-primary-500', 'text-white');
      });

      option.querySelector('.price-check-icon').classList.add('bg-primary-500', 'text-white');

      activePriceFilter = option.dataset.price;

      applyFilters();
    });
  });

  // ساخت منوهای شهر و ریتینگ در ابتدا
  generateCityFilterOptions();
  generateRatingFilterOptions();
});

// swipers
if (document.querySelector('.swiper-popular-destination-mobile')) {
  var swiperPopularDestinationMobile = new Swiper('.swiper-popular-destination-mobile', {
    slidesPerView: 1.3,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 12,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
  });
}
if (document.querySelector('.swiper-featured-tours-mobile')) {
  var swiperFeaturedToursMobile = new Swiper('.swiper-featured-tours-mobile', {
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
