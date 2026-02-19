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

    const cardDate = new Date(
      today.getFullYear(),
      monthMap[monthText],
      dayText,
    );

    if (cardDate < today) {
      $(this).remove();
    } else if (cardDate.getTime() === today.getTime()) {
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

  updateNavButtons();

  owl.on("translated.owl.carousel", function () {
    updateNavButtons();
  });
});
