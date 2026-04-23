const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const dropdownButtons = document.querySelectorAll(".dropdown-btn");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

dropdownButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      const parent = button.closest(".has-dropdown");
      if (!parent) return;

      const isOpen = parent.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    }
  });
});

function buildMarqueeHTML(products = []) {
  return products
    .filter((product) => product.show)
    .map(
      (product) => `
        <div class="promo-product-card">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="promo-product-image"
            loading="lazy"
          />
          <p class="promo-product-title">${product.title}</p>
        </div>
      `
    )
    .join("");
}

async function loadHomepageData() {
  try {
    const response = await fetch("./data/homepage-data.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage data: ${response.status}`);
    }

    const data = await response.json();

    const promoImage = document.getElementById("promoImage");

    const topSellingSection = document.getElementById("topSellingSection");
    const topSellingHeading = document.getElementById("topSellingHeading");
    const topSellingTrack = document.getElementById("topSellingTrack");

    const topValueSection = document.getElementById("topValueSection");
    const topValueHeading = document.getElementById("topValueHeading");
    const topValueTrack = document.getElementById("topValueTrack");

    if (promoImage && data.hero?.show) {
      promoImage.src = data.hero.image;
      promoImage.alt = data.hero.title || "Promotion Banner";
    }

    if (data.marquees?.topSelling?.show) {
      if (topSellingHeading) {
        topSellingHeading.textContent =
          data.marquees.topSelling.title || "Top Selling Products";
      }

      if (topSellingTrack) {
        const sellingHTML = buildMarqueeHTML(data.marquees.topSelling.products);
        topSellingTrack.innerHTML = sellingHTML ? sellingHTML + sellingHTML : "";
      }
    } else if (topSellingSection) {
      topSellingSection.style.display = "none";
    }

    if (data.marquees?.topValue?.show) {
      if (topValueHeading) {
        topValueHeading.textContent =
          data.marquees.topValue.title || "Top Value Products";
      }

      if (topValueTrack) {
        const valueHTML = buildMarqueeHTML(data.marquees.topValue.products);
        topValueTrack.innerHTML = valueHTML ? valueHTML + valueHTML : "";
      }
    } else if (topValueSection) {
      topValueSection.style.display = "none";
    }
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }
}

loadHomepageData();