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
    scrollLink.each(function () {
      var sectionOffset = $(this.hash).offset().top - 73;
      if (sectionOffset <= scrollbarLocation) {
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
      }
    });
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
  var filteredProjects = $();
  var currentIndex = 0;
  var isProjectSliding = false;
  var projectSlideTimer;

  function getProjectsPerPage() {
    if ($(window).width() < 768) {
      return 1;
    }
    if ($(window).width() < 992) {
      return 2;
    }
    return 3;
  }

  // Filter projects
  function filterProjects() {
    filteredProjects = $(".project_item").filter(function () {
      var categories = $(this).data("project-categories");
      var categoryList = categories ? categories.split(" ") : [];
      return (
        projectFilter === "all" ||
        categoryList.indexOf(projectFilter) !== -1
      );
    });
    currentIndex = 0;
    updateProjects(false);
  }

  function updateProjects(animate) {
    var projectsPerPage = getProjectsPerPage();
    var maxIndex = Math.max(filteredProjects.length - projectsPerPage, 0);
    var slideAmount = currentIndex * (100 / projectsPerPage);
    var $grid = $(".projects_grid");

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
      slideAmount = currentIndex * (100 / projectsPerPage);
    }

    $(".project_item")
      .addClass("project_hidden")
      .attr("aria-hidden", "true");

    filteredProjects.removeClass("project_hidden");

    filteredProjects.each(function (index) {
      var visible =
        index >= currentIndex && index < currentIndex + projectsPerPage;

      $(this).attr("aria-hidden", visible ? "false" : "true");
    });

    $(".projects_pagination").toggle(
      filteredProjects.length > projectsPerPage
    );

    $grid.toggleClass("projects_no_transition", !animate);
    $grid.css({
      "-webkit-transform": "translateX(-" + slideAmount + "%)",
      "-moz-transform": "translateX(-" + slideAmount + "%)",
      "-ms-transform": "translateX(-" + slideAmount + "%)",
      "-o-transform": "translateX(-" + slideAmount + "%)",
      transform: "translateX(-" + slideAmount + "%)",
    });

    if (!animate) {
      $grid[0].offsetHeight;
      $grid.removeClass("projects_no_transition");
    }
  }

  // Filter click
  $(".projects_filter button").on("click", function () {
    projectFilter = $(this).data("filter");
    $(".projects_filter button").removeClass("active");
    $(this).addClass("active");
    filterProjects();
  });

  // Previous
  $(".projects_prev").on("click", function () {
    if (isProjectSliding) {
      return;
    }

    var projectsPerPage = getProjectsPerPage();
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = Math.max(filteredProjects.length - projectsPerPage, 0);
    }
    isProjectSliding = true;
    clearTimeout(projectSlideTimer);
    updateProjects(true);
    projectSlideTimer = setTimeout(function () {
      isProjectSliding = false;
    }, 560);
  });

  // Next
  $(".projects_next").on("click", function () {
    if (isProjectSliding) {
      return;
    }

    var projectsPerPage = getProjectsPerPage();
    currentIndex++;
    if (currentIndex > filteredProjects.length - projectsPerPage) {
      currentIndex = 0;
    }
    isProjectSliding = true;
    clearTimeout(projectSlideTimer);
    updateProjects(true);
    projectSlideTimer = setTimeout(function () {
      isProjectSliding = false;
    }, 560);
  });

  $(".projects_grid").on("transitionend", function (event) {
    if (
      event.originalEvent.propertyName === "transform" ||
      event.originalEvent.propertyName === "-webkit-transform"
    ) {
      clearTimeout(projectSlideTimer);
      isProjectSliding = false;
    }
  });

  // Resize
  $(window).on("resize", function () {
    updateProjects(false);
  });
  // Initial load
  filterProjects();

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
