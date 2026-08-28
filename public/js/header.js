document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });

  const scrollLeftButton = document.getElementById("scroll-left");
  const scrollRightButton = document.getElementById("scroll-right");
  const carousel = document.getElementById("achievements-carousel");

  const toggleBtn = document.getElementById("toggle-projects-btn");
  const toggleText = document.getElementById("toggle-projects-text");
  const extraProjects = document.querySelectorAll(".extra-project");

  scrollLeftButton.addEventListener("click", function () {
    carousel.scrollBy({ left: -300, behavior: "smooth" });
  });

  scrollRightButton.addEventListener("click", function () {
    carousel.scrollBy({ left: 300, behavior: "smooth" });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      carousel.scrollBy({ left: -300, behavior: "smooth" });
    } else if (event.key === "ArrowRight") {
      carousel.scrollBy({ left: 300, behavior: "smooth" });
    }
  });

  let startX;
  carousel.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
  });

  carousel.addEventListener("touchmove", function (event) {
    const currentX = event.touches[0].clientX;
    const diffX = startX - currentX;

    if (Math.abs(diffX) > 50) {
      carousel.scrollBy({
        left: diffX > 0 ? 300 : -300,
        behavior: "smooth",
      });
      startX = currentX;
    }
  });

  let showingMore = false;

  toggleBtn.addEventListener("click", () => {
    showingMore = !showingMore;

    extraProjects.forEach((project) => {
      project.classList.toggle("hidden");
    });

    extraProjects.forEach((project) => {
      project.classList.toggle("animate-fade-in");
      project.classList.toggle("animate-fade-out");
      project.classList.toggle("opacity-0");
      project.classList.toggle("opacity-100");
    });

    toggleText.textContent = showingMore
      ? "Mostrar menos"
      : "Ver más proyectos";
  });
});
