$(function () {
  "use strict";

  //===== Prealoder
  $(window).on("load", function (event) {
    $(".preloader").delay(500).fadeOut(500);
  });

  //===== Sticky
  $(window).on("scroll", function (event) {
    var scroll = $(window).scrollTop();
    if (scroll < 20) {
      $(".header_navbar").removeClass("sticky");
    } else {
      $(".header_navbar").addClass("sticky");
    }
  });

  //===== Section Menu Active
  var scrollLink = $(".page-scroll");
  // Active link switching
  $(window).scroll(function () {
    var scrollbarLocation = $(this).scrollTop();
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();

    if (scrollbarLocation + windowHeight >= documentHeight - 15) {
      scrollLink.parent().removeClass("active");
      scrollLink.last().parent().addClass("active");
    } else {
      scrollLink.each(function () {
        var sectionOffset = $(this.hash).offset().top - 73;
        if (sectionOffset <= scrollbarLocation) {
          $(this).parent().addClass("active");
          $(this).parent().siblings().removeClass("active");
        }
      });
    }
  });

  //===== close navbar-collapse when a  clicked

  $(".navbar-nav a").on("click", function () {
    $(".navbar-collapse").removeClass("show");
  });

  $(".navbar-toggler").on("click", function () {
    $(this).toggleClass("active");
  });

  $(".navbar-nav a").on("click", function () {
    $(".navbar-toggler").removeClass("active");
  });

  //===== Projects filter
  var projectFilter = "all";
  var $projectsGrid = $(".projects_grid");
  var projectItems = $projectsGrid.children(".project_item").clone();

  function initProjectsCarousel() {
    if (!$.fn.owlCarousel || !$projectsGrid.length) {
      return;
    }

    $projectsGrid.owlCarousel({
      items: 3,
      loop: $projectsGrid.children(".project_item").length > 3,
      margin: 30,
      nav: true,
      navText: [
        '<i class="fa-solid fa-angle-left"></i>',
        '<i class="fa-solid fa-angle-right"></i>',
      ],
      dots: false,
      autoplay: true,
      autoplayTimeout: 1800,
      autoplayHoverPause: true,
      smartSpeed: 650,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },
        768: {
          items: 2,
          margin: 24,
        },
        992: {
          items: 3,
          margin: 30,
        },
      },
    });
  }

  function filterProjects() {
    var filteredProjects = projectItems.filter(function () {
      var categories = $(this).data("project-categories");
      var categoryList = categories ? categories.split(" ") : [];

      return (
        projectFilter === "all" ||
        categoryList.indexOf(projectFilter) !== -1
      );
    });

    if ($projectsGrid.hasClass("owl-loaded")) {
      $projectsGrid.trigger("destroy.owl.carousel");
      $projectsGrid.removeClass("owl-loaded owl-hidden");
      $projectsGrid.find(".owl-stage-outer").children().unwrap();
    }

    $projectsGrid.empty().append(filteredProjects.clone());
    initProjectsCarousel();
  }

  $(".projects_filter button").on("click", function () {
    projectFilter = $(this).data("filter");
    $(".projects_filter button").removeClass("active");
    $(this).addClass("active");
    filterProjects();
  });

  filterProjects();

  //===== Technologies carousel
  if ($.fn.owlCarousel) {
    $(".technologies_carousel").owlCarousel({
      items: 7,
      loop: true,
      margin: 20,
      nav: true,
      navText: [
        '<i class="fa-solid fa-angle-left"></i>',
        '<i class="fa-solid fa-angle-right"></i>',
      ],
      dots: true,
      autoplay: true,
      autoplayTimeout: 2200,
      autoplayHoverPause: true,
      smartSpeed: 650,
      responsive: {
        0: {
          items: 2,
        },
        480: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 5,
        },
        1200: {
          items: 7,
        },
      },
    });
  }

  //===== Testimonials carousel
  if ($.fn.owlCarousel) {
    $(".testimonial_slider").owlCarousel({
      items: 1,
      loop: true,
      margin: 46,
      nav: true,
      navText: [
        '<i class="fa-solid fa-angle-left"></i>',
        '<i class="fa-solid fa-angle-right"></i>',
      ],
      dots: false,
      autoplay: true,
      autoplayTimeout: 2600,
      autoplayHoverPause: true,
      smartSpeed: 650,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },
        1400: {
          items: 2,
          margin: 46,
        },
      },
    });
  }

  // Show or hide the sticky footer button
  $(window).on("scroll", function (event) {
    if ($(this).scrollTop() > 600) {
      $(".back-to-top").fadeIn(200);
    } else {
      $(".back-to-top").fadeOut(200);
    }
  });

  //Animate the scroll to yop
  $(".back-to-top").on("click", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
  });
});
