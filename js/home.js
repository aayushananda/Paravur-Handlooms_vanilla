// home.js

const slides = [
  {
    mediaType: "video",
    src: "assets/hero_vid1.mp4",
    superTitle: "A Craft Documentation Project",
    title: "The Paravur",
    italicTitle: "Handloom Story",
    description:
      "A tribute to the hands, eyes, and bodies behind the Geographical Indication (GI) tagged sarees of Chendamangalam. Preserving a craft that dates back centuries.",
  },
  {
    mediaType: "image",
    src: "assets/hero2.jpeg",
    superTitle: "Intricate Techniques",
    title: "The Golden",
    italicTitle: "Kasavu Thread",
    description:
      "Experience the meticulously woven gold and silver metallic threads that form the highlight of the Chendamangalam identity.",
  },
  {
    mediaType: "image",
    src: "assets/hero3.jpeg",
    superTitle: "Meet the Makers",
    title: "Generational",
    italicTitle: "Artisans",
    description:
      "The society reverberates with the sound of more than 20 shuttles beating with vigour. Meet the individuals who breathe life into the fabric.",
  },
];

let currentSlide = 0;
let slideInterval;

function renderHomeSlider() {
  const bgContainer = document.getElementById("hero-bg-container");
  const contentContainer = document.getElementById("hero-content-container");
  const controlsContainer = document.getElementById("hero-controls");

  if (!bgContainer || !contentContainer || !controlsContainer) return;

  // Render backgrounds
  bgContainer.innerHTML = slides
    .map((slide, index) => {
      let mediaHtml = "";
      if (slide.mediaType === "video") {
        mediaHtml = `<video src="${slide.src}" autoplay loop muted playsinline></video>`;
      } else {
        mediaHtml = `<img src="${slide.src}" alt="Slide ${index + 1}" />`;
      }
      return `
      <div class="hero-slide-bg ${index === currentSlide ? "active" : ""}" id="hero-bg-${index}">
        ${mediaHtml}
        <div class="hero-overlay"></div>
      </div>
    `;
    })
    .join("");

  // Render content
  contentContainer.innerHTML = slides
    .map(
      (slide, index) => `
    <div class="hero-slide-content ${index === currentSlide ? "active" : ""}" id="hero-content-${index}">
      <h3 class="hero-super-title">${slide.superTitle}</h3>
      <h1 class="hero-title">
        ${slide.title} <br />
        <span>${slide.italicTitle}</span>
      </h1>
    </div>
  `,
    )
    .join("");

  // Render controls
  controlsContainer.innerHTML = slides
    .map(
      (_, index) => `
    <button class="hero-control-btn ${index === currentSlide ? "active" : ""}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
  `,
    )
    .join("");

  // Add event listeners to controls
  const controlBtns = controlsContainer.querySelectorAll(".hero-control-btn");
  controlBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(btn.getAttribute("data-index"));
      goToSlide(index);
      resetInterval();
    });
  });

  startInterval();
}

function goToSlide(index) {
  // Hide current
  document
    .getElementById(`hero-bg-${currentSlide}`)
    ?.classList.remove("active");
  document
    .getElementById(`hero-content-${currentSlide}`)
    ?.classList.remove("active");
  document
    .querySelector(`.hero-control-btn[data-index="${currentSlide}"]`)
    ?.classList.remove("active");

  currentSlide = index;

  // Show new
  document.getElementById(`hero-bg-${currentSlide}`)?.classList.add("active");
  document
    .getElementById(`hero-content-${currentSlide}`)
    ?.classList.add("active");
  document
    .querySelector(`.hero-control-btn[data-index="${currentSlide}"]`)
    ?.classList.add("active");
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

function startInterval() {
  slideInterval = setInterval(nextSlide, 6000);
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomeSlider();
});
