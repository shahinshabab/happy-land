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

async function loadPromotionBanner() {
  try {
    const response = await fetch("./data/promotion.json");
    const promo = await response.json();

    const promoHero = document.querySelector(".promo-hero");
    const promoImage = document.getElementById("promoImage");
    const promoProductsSection = document.getElementById("promoProductsSection");
    const promoProductsHeading = document.getElementById("promoProductsHeading");
    const promoProductsTrack = document.getElementById("promoProductsTrack");

    if (!promo.show) {
      if (promoHero) promoHero.style.display = "none";
      if (promoProductsSection) promoProductsSection.style.display = "none";
      return;
    }

    if (promoImage) {
      promoImage.src = promo.image;
      promoImage.alt = promo.title || "Promotion Banner";
    }

    if (promoProductsHeading && promo.title) {
      promoProductsHeading.textContent = `${promo.title} Top Selling Products`;
    }

    if (
      promoProductsTrack &&
      promo.products &&
      Array.isArray(promo.products) &&
      promo.products.length > 0
    ) {
      const visibleProducts = promo.products.filter(product => product.show);

      if (visibleProducts.length === 0) {
        promoProductsSection.style.display = "none";
        return;
      }

      const productsHTML = visibleProducts.map((product) => {
        return `
          <div class="promo-product-card">
            <img src="${product.image}" alt="${product.title}" class="promo-product-image" />
            <p class="promo-product-title">${product.title}</p>
          </div>
        `;
      }).join("");

      // duplicate for smooth infinite scroll
      promoProductsTrack.innerHTML = productsHTML + productsHTML;
    } else {
      promoProductsSection.style.display = "none";
    }

  } catch (error) {
    console.error("Error loading promotion banner:", error);
  }
}

loadPromotionBanner();