const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const dropdownButtons = document.querySelectorAll(".dropdown-btn");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

dropdownButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      const parent = button.parentElement;
      parent.classList.toggle("open");
    }
  });
});