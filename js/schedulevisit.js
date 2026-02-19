$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 5,
    dots: false,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  var owl = $(".owl-carousel");
  owl.owlCarousel();
  // Go to the next item
  $(".date_carousel_nav_next").click(function () {
    owl.trigger("next.owl.carousel");
  });

  // Go to the previous item
  $(".date_carousel_nav_prev").click(function () {
    owl.trigger("prev.owl.carousel");
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthMap = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
  };

  $(".date_carousel .card_wrapper").each(function () {
    const monthText = $(this).find(".card h3").text().trim().toUpperCase();
    const dayText = parseInt($(this).find(".card p").text().trim(), 10);

    // Gumawa ng Date object para sa card (gamit ang kasalukuyang taon)
    const cardDate = new Date(
      today.getFullYear(),
      monthMap[monthText],
      dayText,
    );

    if (cardDate < today) {
      $(this).remove(); // Tanggalin ang mga nakalipas na petsa
    } else if (cardDate.getTime() === today.getTime()) {
      // Dito natin i-aappend ang HTML para hindi mo na kailangan sa manual HTML
      $(this).append('<div class="date"><h3>Today</h3></div>');
      $(this).addClass("is-today");
    }
  });

  $(".date_carousel .card").click(function () {
    $(".date_carousel .card").removeClass("active_card");
    $(this).addClass("active_card");
  });

  function updateNavButtons() {
    const response = owl.data("owl.carousel");
    const currentIndex = response.relative(response.current());

    const todayIndex = $(".date_carousel .card_wrapper.is-today")
      .closest(".owl-item:not(.cloned)")
      .index();

    if (currentIndex <= todayIndex) {
      $(".date_carousel_nav_prev").hide();
    } else {
      $(".date_carousel_nav_prev").show();
    }
  }

  const todayIndex = $(".date_carousel .card.active_card")
    .closest(".owl-item")
    .index();
  if (todayIndex !== -1) {
    owl.trigger("to.owl.carousel", [todayIndex, 0]);
  }

  function generateDates(days = 10) {
    const result = [];
    const today = new Date();

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

  updateNavButtons();

  owl.on("translated.owl.carousel", function () {
    updateNavButtons();
  });
});
