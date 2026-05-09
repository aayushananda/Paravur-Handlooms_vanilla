// components.js

const navLinks = [
  { id: 'home', title: 'Home', path: '/' },
  { id: 'about', title: 'About Us', path: '/' },
  { id: 'artisans', title: 'Our Artisans', path: '/' },
  { id: 'shop', title: 'Collection', path: '/collection.html' },
  { id: 'location', title: 'Location', path: '/' }
];

const contactInfo = {
  address: "Chendamangalam, North Paravur, Kerala",
  email: "info@paravurhandlooms.org",
  phone: "+91 123 456 7890"
};

function renderHeader() {
  const headerContainer = document.getElementById('header-placeholder');
  if (!headerContainer) return;

  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

  let navHtml = navLinks.map(link => {
    // If not home, redirect to root + hash, else just hash
    const href = isHome ? `#${link.id}` : (link.path === '/' ? `index.html#${link.id}` : link.path);
    return `
      <li>
        <a href="${href}" class="text-[#2D2D2D] hover:text-[#C5A059] font-sans text-xs uppercase tracking-widest transition-colors relative group nav-link" data-id="${link.id}">
          ${link.title}
          <span class="absolute -bottom-2 left-0 w-0 h-px bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
    `;
  }).join('');

  let mobileNavHtml = navLinks.map(link => {
    const href = isHome ? `#${link.id}` : (link.path === '/' ? `index.html#${link.id}` : link.path);
    return `
      <a href="${href}" class="block font-serif text-xl text-[#2D2D2D] hover:text-[#C5A059] transition-colors nav-link" data-id="${link.id}">
        ${link.title}
      </a>
    `;
  }).join('');

  // Add Cart to mobile nav
  mobileNavHtml += `
    <a href="cart.html" class="block font-serif text-xl text-[#2D2D2D] hover:text-[#C5A059] transition-colors mt-4 border-t border-[#e5e4e7] pt-4">
      Cart (<span id="mobile-cart-count">0</span>)
    </a>
  `;

  const homeHref = isHome ? '#' : 'index.html';

  headerContainer.innerHTML = `
    <header id="main-header" class="fixed w-full z-50 transition-all duration-300 transform top-0 translate-y-0 bg-transparent py-6">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          
          <div class="flex-shrink-0 flex items-center">
            <a href="${homeHref}" class="flex flex-col group">
              <h1 class="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#2D2D2D]">
                Paravur <span class="text-[#C5A059] italic">Handlooms</span>
              </h1>
            </a>
          </div>
          
          <nav class="hidden lg:flex flex-1 justify-center">
            <ul class="flex items-center space-x-10">
              ${navHtml}
            </ul>
          </nav>
          
          <div class="hidden lg:flex items-center justify-end gap-8">
            <a id="header-auth-link" href="#" class="font-sans text-xs uppercase tracking-widest text-[#2D2D2D] hover:text-[#C5A059] transition-colors relative group nav-link">
              Loading...
            </a>
            <a href="cart.html" class="font-sans text-xs uppercase tracking-widest text-[#2D2D2D] hover:text-[#C5A059] transition-colors relative group flex items-center gap-1">
              Cart (<span id="cart-count">0</span>)
              <span class="absolute -bottom-2 left-0 w-0 h-px bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="${isHome ? '#contact' : 'index.html#contact'}" class="font-sans text-xs uppercase tracking-widest text-[#2D2D2D] border border-[#2D2D2D] px-6 py-2 hover:bg-[#2D2D2D] hover:text-[#FAF9F6] transition-colors nav-link" data-id="contact">
              Inquire
            </a>
          </div>
          
          <div class="lg:hidden flex items-center">
            <button id="mobile-menu-btn" class="p-2 text-[#2D2D2D] focus:outline-none">
              <span class="sr-only">Open main menu</span>
              <svg id="menu-icon-open" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg id="menu-icon-close" class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" class="lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-[#FAF9F6] max-h-0">
        <div class="px-4 py-6 space-y-4 text-center">
          ${mobileNavHtml}
          <a id="mobile-auth-link" href="#" class="block font-serif text-xl text-[#2D2D2D] hover:text-[#C5A059] transition-colors mt-4">
            Loading...
          </a>
        </div>
      </div>
    </header>
  `;

  // Determine auth state
  const userStr = localStorage.getItem('ph_user');
  const authText = userStr ? 'Account' : 'Login';
  const authHref = userStr ? 'user.html' : 'login.html';
  
  const headerAuthLink = document.getElementById('header-auth-link');
  if (headerAuthLink) {
    headerAuthLink.textContent = authText;
    headerAuthLink.href = authHref;
  }
  
  const mobileAuthLink = document.getElementById('mobile-auth-link');
  if (mobileAuthLink) {
    mobileAuthLink.textContent = authText;
    mobileAuthLink.href = authHref;
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  let isMenuOpen = false;

  menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.replace('max-h-0', 'max-h-96');
      mobileMenu.classList.add('border-t', 'border-[#e5e4e7]', 'shadow-lg');
      iconOpen.classList.add('hidden');
      iconOpen.classList.remove('block');
      iconClose.classList.add('block');
      iconClose.classList.remove('hidden');
    } else {
      mobileMenu.classList.replace('max-h-96', 'max-h-0');
      mobileMenu.classList.remove('border-t', 'border-[#e5e4e7]', 'shadow-lg');
      iconClose.classList.add('hidden');
      iconClose.classList.remove('block');
      iconOpen.classList.add('block');
      iconOpen.classList.remove('hidden');
    }
  });

  // Scroll listener
  const header = document.getElementById('main-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // Background styles
        if (currentScrollY > 10) {
          header.classList.remove('bg-transparent', 'py-6');
          header.classList.add('bg-[#FAF9F6]', 'shadow-sm', 'py-3');
        } else {
          header.classList.add('bg-transparent', 'py-6');
          header.classList.remove('bg-[#FAF9F6]', 'shadow-sm', 'py-3');
        }
        
        // Hide/Show logic
        if (currentScrollY > lastScrollY + 5 && currentScrollY > 100) {
          header.classList.replace('translate-y-0', '-translate-y-full');
        } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 10) {
          header.classList.replace('-translate-y-full', 'translate-y-0');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Smooth scroll for nav links on the same page
  if (isHome) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('data-id');
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
            if (isMenuOpen) menuBtn.click(); // close mobile menu
          }
        }
      });
    });
  }

  // Update cart badge right after header renders
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }
}

function renderFooter() {
  const footerContainer = document.getElementById('footer-placeholder');
  if (!footerContainer) return;

  const currentYear = new Date().getFullYear();
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

  let exploreLinksHtml = navLinks.map(link => {
    const href = isHome ? `#${link.id}` : (link.path === '/' ? `index.html#${link.id}` : link.path);
    return `
      <li>
        <a href="${href}" class="font-sans text-sm text-gray-300 hover:text-white transition-colors footer-link" data-id="${link.id}">
          ${link.title}
        </a>
      </li>
    `;
  }).join('');

  footerContainer.innerHTML = `
    <footer class="relative text-[#FAF9F6] overflow-hidden">
      <div class="absolute inset-0 z-0 bg-cover bg-center" style="background-image: url('assets/footerbg.jpeg')">
        <div class="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-[2px]"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div class="col-span-1 lg:col-span-1">
            <h2 class="font-serif text-3xl font-bold mb-6 text-[#FFFFFF]">
              Paravur <br /><span class="text-[#C5A059] italic font-normal">Handlooms</span>
            </h2>
            <p class="font-sans text-sm text-gray-300 leading-relaxed mb-6 pr-4">
              A collaborative effort highlighting the labour that goes into creating clothing, preserving a craft that dates back centuries in Chendamangalam.
            </p>
          </div>

          <div>
            <h3 class="font-sans text-xs uppercase tracking-widest text-[#C5A059] mb-6 font-semibold">Explore</h3>
            <ul class="space-y-4">
              ${exploreLinksHtml}
            </ul>
          </div>

          <div>
            <h3 class="font-sans text-xs uppercase tracking-widest text-[#C5A059] mb-6 font-semibold">The Society</h3>
            <ul class="space-y-4">
              <li><a href="${isHome ? '#about' : 'index.html#about'}" class="font-sans text-sm text-gray-300 hover:text-white transition-colors footer-link" data-id="about">Our History</a></li>
              <li><a href="${isHome ? '#artisans' : 'index.html#artisans'}" class="font-sans text-sm text-gray-300 hover:text-white transition-colors footer-link" data-id="artisans">Meet the Weavers</a></li>
              <li><a href="${isHome ? '#shop' : 'index.html#shop'}" class="font-sans text-sm text-gray-300 hover:text-white transition-colors footer-link" data-id="shop">GI Tagged Sarees</a></li>
            </ul>
          </div>

          <div>
            <h3 class="font-sans text-xs uppercase tracking-widest text-[#C5A059] mb-6 font-semibold">Visit Us</h3>
            <address class="not-italic font-sans text-sm text-gray-300 space-y-4">
              <p>Chendamangalam<br/>North Paravur, Kerala</p>
              <p>
                <a href="mailto:${contactInfo.email}" class="hover:text-white transition-colors block">${contactInfo.email}</a>
                <a href="tel:${contactInfo.phone}" class="hover:text-white transition-colors block">${contactInfo.phone}</a>
              </p>
            </address>
          </div>

        </div>

        <div class="mt-20 pt-8 border-t border-gray-600/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="font-sans text-xs text-gray-400 uppercase tracking-wider">
            &copy; ${currentYear} Paravur Handloom Weaver's Co-operative Society.
          </p>
          <button id="scrollToTopBtn" class="font-sans text-xs uppercase tracking-widest text-gray-300 hover:text-[#C5A059] transition-colors flex items-center gap-2">
            Back to Top
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  `;

  document.getElementById('scrollToTopBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (isHome) {
    footerContainer.querySelectorAll('.footer-link[data-id]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('data-id');
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
});
