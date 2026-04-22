// cart.js

// Initialize cart from localStorage or empty array
function getCart() {
  const cart = localStorage.getItem('paravur_cart');
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('paravur_cart', JSON.stringify(cart));
  updateCartBadge();
  
  // Dispatch a custom event so other parts of the app know the cart updated
  window.dispatchEvent(new Event('cartUpdated'));
}

// Add to cart function
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  
  // Optional: Show a subtle toast or visual feedback (could be expanded later)
  showToast(`Added ${product.name} to cart`);
}

// Remove from cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== parseInt(productId));
  saveCart(cart);
}

// Update quantity
function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) return;
  
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === parseInt(productId));
  
  if (itemIndex > -1) {
    cart[itemIndex].quantity = newQuantity;
    saveCart(cart);
  }
}

// Get cart total value
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.priceValue * item.quantity), 0);
}

// Get total number of items
function getCartCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update badge in header
function updateCartBadge() {
  const count = getCartCount();
  const badge = document.getElementById('cart-count');
  const mobileBadge = document.getElementById('mobile-cart-count');
  
  if (badge) {
    badge.textContent = count;
    badge.classList.add('scale-125', 'text-[#C5A059]');
    setTimeout(() => {
      badge.classList.remove('scale-125', 'text-[#C5A059]');
    }, 200);
  }
  
  if (mobileBadge) {
    mobileBadge.textContent = count;
  }
}

// Simple toast notification
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'bg-[#2D2D2D] text-[#FAF9F6] px-6 py-3 shadow-lg font-sans text-sm translate-y-10 opacity-0 transition-all duration-300 flex items-center gap-3';
  toast.innerHTML = `
    <svg class="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    ${message}
  `;

  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);

  // Animate out and remove
  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Initialize badge on load
document.addEventListener('DOMContentLoaded', () => {
  // Try to update badge slightly after components.js renders the header
  setTimeout(updateCartBadge, 50);
});
