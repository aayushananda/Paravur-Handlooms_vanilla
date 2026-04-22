// main.js

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP and ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Initialize Lenis for smooth scrolling if available
  if (typeof Lenis !== 'undefined') {
    window.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    if (typeof ScrollTrigger !== 'undefined') {
      // Synchronize Lenis with GSAP ScrollTrigger
      window.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        window.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        window.lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Scroll to hash on load
  if (window.location.hash) {
    const id = window.location.hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  } else {
    window.scrollTo(0, 0);
  }

  // Preloader Logic
  const loadingFrame = document.getElementById('loading-frame');
  if (loadingFrame) {
    if (typeof window.lenis !== 'undefined') {
      window.lenis.stop();
    }
    document.body.style.overflow = 'hidden';
    // Listen for the complete event from loading.html iframe
    window.addEventListener('message', (e) => {
      if (e.data === 'loaderComplete') {
        const frame = document.getElementById('loading-frame');
        if (frame && typeof gsap !== 'undefined') {
          gsap.to(frame, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
            onComplete: () => {
              frame.remove();
              finishPreloader();
            }
          });
        } else if (frame) {
          frame.remove();
          finishPreloader();
        } else {
          finishPreloader();
        }
      }
    });

    function finishPreloader() {
      if (typeof window.lenis !== 'undefined') window.lenis.start();
      document.body.style.overflow = '';
      if (window.initLandingPage) window.initLandingPage();
    }
  } else {
    if (window.initLandingPage) window.initLandingPage();
  }
});
