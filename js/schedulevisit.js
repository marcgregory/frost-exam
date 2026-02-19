$(document).ready(function () {
  if (typeof $.fn.owlCarousel !== "function") {
    console.error(
      "schedulevisit.js: Owl Carousel plugin not found. Make sure owl.carousel.js is loaded before this script.",
    );
    return;
  }

  // generate an array of upcoming dates (default 21 days)
  function generateDates(days = 21) {
    const result = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      result.push({
        m: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        d: d.getDate(),
        w: d.toLocaleString("en-US", { weekday: "short" }).toUpperCase(),
        isToday: i === 0,
      });
    }

    return result;
  }

  // Build card HTML and inject into carousel container
  const daysToShow = 21;
  const dates = generateDates(daysToShow);
  const $carousel = $(".date_carousel.owl-carousel");
  $carousel.empty();

  dates.forEach((item, idx) => {
    const wrapper = $('<div class="card_wrapper"></div>');
    const card = $(
      '<div class="card">' +
        `<h3>${item.m}</h3>` +
        `<p>${item.d}</p>` +
        `<span>${item.w}</span>` +
        "</div>",
    );
    if (item.isToday) {
      wrapper.addClass("is-today");
      card.addClass("active_card");
    }
    wrapper.append(card);
    $carousel.append(wrapper);
  });

  // initialize carousel AFTER injecting cards
  const owl = $carousel.owlCarousel({
    items: 5,
    dots: false,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 5 },
    },
  });

  // navigation buttons
  $(".date_carousel_nav_next").click(function () {
    $carousel.trigger("next.owl.carousel");
  });
  $(".date_carousel_nav_prev").click(function () {
    $carousel.trigger("prev.owl.carousel");
  });

  // card click behaviour
  $carousel.on("click", ".card", function () {
    $carousel.find(".card").removeClass("active_card");
    $(this).addClass("active_card");
    // move carousel to clicked item
    const owlData = $carousel.data("owl.carousel");
    if (owlData) {
      const index = $(this).closest(".owl-item").index();
      // if cloned items present, find relative index
      const relative = owlData.relative(index);
      $carousel.trigger("to.owl.carousel", [relative, 300]);
    }
  });

  function updateNavButtons() {
    const response = $carousel.data("owl.carousel");
    if (!response) return;
    const currentIndex = response.relative(response.current());
    const todayWrapper = $(".date_carousel .card_wrapper.is-today").closest(
      ".owl-item:not(.cloned)",
    );
    const todayIndex = todayWrapper.length ? todayWrapper.index() : -1;

    if (todayIndex === -1 || currentIndex > todayIndex) {
      $(".date_carousel_nav_prev").show();
    } else {
      $(".date_carousel_nav_prev").hide();
    }
  }

  // place carousel at today's card
  const todayItem = $carousel
    .find(".card_wrapper.is-today")
    .closest(".owl-item");
  if (todayItem.length) {
    const idx = todayItem.index();
    const owlData = $carousel.data("owl.carousel");
    if (owlData) {
      const rel = owlData.relative(idx);
      $carousel.trigger("to.owl.carousel", [rel, 0]);
    }
  }

  // add a single Today badge under the owl-item that contains today's card
  function placeTodayBadge() {
    // remove previous badges
    $carousel.find(".today-badge").remove();

    const target = $carousel
      .find(".card_wrapper.is-today")
      .closest(".owl-item:not(.cloned)");

    if (target.length) {
      const $badge = $('<div class="today-badge">Today</div>');
      // append inside the owl-item so it stays with that card
      target.append($badge);
    }
  }

  placeTodayBadge();
  // re-place badge after translations (in case DOM clones change)
  $carousel.on("translated.owl.carousel refreshed.owl.carousel", function () {
    placeTodayBadge();
  });

  // ensure nav state updates on change
  $carousel.on("translated.owl.carousel", function () {
    updateNavButtons();
  });

  // initial nav state
  updateNavButtons();
});
