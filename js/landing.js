// landing.js

// 1. Home Slider Logic
const slides = [
  {
    mediaType: 'video',
    src: 'assets/hero_vid1.mp4',
    superTitle: 'A Craft Documentation Project',
    title: 'The Paravur',
    italicTitle: 'Handloom Story',
    description: 'A tribute to the hands, eyes, and bodies behind the Geographical Indication (GI) tagged sarees of Chendamangalam. Preserving a craft that dates back centuries.'
  },
  {
    mediaType: 'image',
    src: 'assets/hero2.jpeg',
    superTitle: 'Intricate Techniques',
    title: 'The Golden',
    italicTitle: 'Kasavu Thread',
    description: 'Experience the meticulously woven gold and silver metallic threads that form the highlight of the Chendamangalam identity.'
  },
  {
    mediaType: 'image',
    src: 'assets/hero3.jpeg',
    superTitle: 'Meet the Makers',
    title: 'Generational',
    italicTitle: 'Artisans',
    description: 'The society reverberates with the sound of more than 20 shuttles beating with vigour. Meet the individuals who breathe life into the fabric.'
  }
];

let currentSlide = 0;
let slideInterval;

function renderHomeSlider() {
  const bgContainer = document.getElementById('hero-bg-container');
  const contentContainer = document.getElementById('hero-content-container');
  const controlsContainer = document.getElementById('hero-controls');

  if (!bgContainer || !contentContainer || !controlsContainer) return;

  bgContainer.innerHTML = slides.map((slide, index) => {
    let mediaHtml = slide.mediaType === 'video' 
      ? `<video src="${slide.src}" autoplay loop muted playsinline class="w-full h-full object-cover"></video>`
      : `<img src="${slide.src}" alt="Slide ${index + 1}" class="w-full h-full object-cover" />`;
    
    return `
      <div id="hero-bg-${index}" class="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}">
        ${mediaHtml}
        <div class="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/60 via-[#FAF9F6]/40 to-[#FAF9F6]/70"></div>
      </div>
    `;
  }).join('');

  contentContainer.innerHTML = slides.map((slide, index) => `
    <div id="hero-content-${index}" class="absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out w-full ${index === currentSlide ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-8 invisible'}">
      <h3 class="text-[#8B2500] font-sans tracking-[0.25em] uppercase text-xs md:text-sm mb-6 font-bold drop-shadow-sm">
        ${slide.superTitle}
      </h3>
      <h1 class="font-serif text-5xl md:text-7xl lg:text-[5.5rem] text-[#2D2D2D] mb-8 leading-[1.1] text-center drop-shadow-sm">
        ${slide.title} <br />
        <span class="italic font-light">${slide.italicTitle}</span>
      </h1>
      <p class="font-sans text-base md:text-lg lg:text-xl text-[#2D2D2D] max-w-3xl text-center mb-10 leading-relaxed font-medium">
        ${slide.description}
      </p>
      <button class="bg-[#2D2D2D] text-[#FAF9F6] font-sans px-10 py-4 uppercase tracking-[0.2em] text-xs hover:bg-[#8B2500] hover:scale-105 transition-all duration-300 shadow-xl">
        Discover the Craft
      </button>
    </div>
  `).join('');

  controlsContainer.innerHTML = slides.map((_, index) => `
    <button data-index="${index}" class="hero-control-btn h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-[#2D2D2D] w-8' : 'bg-[#2D2D2D]/30 w-2 hover:bg-[#2D2D2D]/60'}" aria-label="Go to slide ${index + 1}"></button>
  `).join('');

  const controlBtns = controlsContainer.querySelectorAll('.hero-control-btn');
  controlBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(btn.getAttribute('data-index'));
      goToSlide(index);
      resetInterval();
    });
  });

  startInterval();
}

function goToSlide(index) {
  // Hide current
  document.getElementById(`hero-bg-${currentSlide}`)?.classList.replace('opacity-100', 'opacity-0');
  
  const oldContent = document.getElementById(`hero-content-${currentSlide}`);
  oldContent?.classList.remove('opacity-100', 'translate-y-0', 'visible');
  oldContent?.classList.add('opacity-0', 'translate-y-8', 'invisible');

  const oldBtn = document.querySelector(`.hero-control-btn[data-index="${currentSlide}"]`);
  oldBtn?.classList.remove('bg-[#2D2D2D]', 'w-8');
  oldBtn?.classList.add('bg-[#2D2D2D]/30', 'w-2');

  currentSlide = index;

  // Show new
  document.getElementById(`hero-bg-${currentSlide}`)?.classList.replace('opacity-0', 'opacity-100');
  
  const newContent = document.getElementById(`hero-content-${currentSlide}`);
  newContent?.classList.remove('opacity-0', 'translate-y-8', 'invisible');
  newContent?.classList.add('opacity-100', 'translate-y-0', 'visible');

  const newBtn = document.querySelector(`.hero-control-btn[data-index="${currentSlide}"]`);
  newBtn?.classList.remove('bg-[#2D2D2D]/30', 'w-2');
  newBtn?.classList.add('bg-[#2D2D2D]', 'w-8');
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


// 2. About Section GSAP Animations
function initAboutAnimations() {
  const aboutSection = document.getElementById('about');
  const imageEl = document.getElementById('about-image');
  const textEl = document.getElementById('about-text');

  if (!aboutSection || !imageEl || !textEl) return;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    // Desktop animation (split screen)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.fromTo(imageEl, {
      y: 350,
      scale: 0.3,
      opacity: 0
    }, {
      y: -10,
      scale: 1.1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    })
    .to(imageEl, {
      xPercent: -130,
      y: 20,
      scale: 1,
      duration: 1.5,
      ease: "power2.inOut"
    })
    .from(textEl, {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "<0.2");
  });

  mm.add("(max-width: 767px)", () => {
    // Mobile animation (stacked/overlay)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.fromTo(imageEl, {
      y: 200,
      scale: 0.5,
      opacity: 0
    }, {
      y: -120,
      scale: 0.9,
      opacity: 0.15,
      duration: 1.5,
      ease: "power2.out"
    })
    .from(textEl, {
      y: 40,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "<0.5");
  });
}

// Expose initialization to be triggered after preloader
window.initLandingPage = () => {
  renderHomeSlider();
  setTimeout(initAboutAnimations, 100);
};
