// cartPage.js

document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();

  // Listen for cart updates to re-render the page
  window.addEventListener('cartUpdated', () => {
    renderCartPage();
  });
});

function renderCartPage() {
  const cart = getCart();
  const cartContainer = document.getElementById('cart-items-container');
  const emptyMessage = document.getElementById('empty-cart-message');
  const itemCountLabel = document.getElementById('cart-item-count-label');
  const subtotalElement = document.getElementById('summary-subtotal');
  const totalElement = document.getElementById('summary-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!cartContainer) return; // Not on cart page

  const totalItems = getCartCount();
  itemCountLabel.textContent = `${totalItems} Item${totalItems !== 1 ? 's' : ''}`;

  if (cart.length === 0) {
    cartContainer.innerHTML = '';
    cartContainer.classList.add('hidden');
    emptyMessage.classList.remove('hidden');
    subtotalElement.textContent = '₹0';
    totalElement.textContent = '₹0';
    checkoutBtn.disabled = true;
  } else {
    cartContainer.classList.remove('hidden');
    emptyMessage.classList.add('hidden');
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.onclick = () => { window.location.href = 'checkout.html'; };
    }

    cartContainer.innerHTML = cart.map(item => `
      <div class="flex gap-6 py-6 border-b border-[#e5e4e7] group">
        <div class="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-white border border-[#e5e4e7] overflow-hidden">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
        </div>
        
        <div class="flex-1 flex flex-col justify-between">
          <div class="flex justify-between items-start gap-4">
            <div>
              <p class="font-sans text-xs uppercase tracking-widest text-[#C5A059] mb-1 font-semibold">${item.collection}</p>
              <h3 class="font-serif text-xl md:text-2xl text-[#2D2D2D] mb-2">${item.name}</h3>
              <p class="font-sans text-sm text-[#555555] hidden md:block">Geographical Indication (GI) tagged handloom.</p>
            </div>
            <div class="text-right">
              <span class="font-sans text-sm font-semibold text-[#2D2D2D] block">${item.price}</span>
            </div>
          </div>
          
          <div class="flex justify-between items-end mt-4">
            <div class="flex items-center border border-[#e5e4e7] bg-white">
              <button onclick="handleUpdateQty(${item.id}, ${item.quantity - 1})" class="px-3 py-1 text-[#555555] hover:text-[#C5A059] hover:bg-[#FAF9F6] transition-colors" ${item.quantity <= 1 ? 'disabled class="opacity-50"' : ''}>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
              </button>
              <span class="font-sans text-sm font-semibold text-[#2D2D2D] w-8 text-center">${item.quantity}</span>
              <button onclick="handleUpdateQty(${item.id}, ${item.quantity + 1})" class="px-3 py-1 text-[#555555] hover:text-[#C5A059] hover:bg-[#FAF9F6] transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
            
            <button onclick="handleRemove(${item.id})" class="font-sans text-xs uppercase tracking-widest text-[#8B2500] hover:text-[#2D2D2D] border-b border-transparent hover:border-[#2D2D2D] transition-colors pb-0.5">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join('');

    const total = getCartTotal();
    // Format number with commas
    const formattedTotal = '₹' + total.toLocaleString('en-IN');
    subtotalElement.textContent = formattedTotal;
    totalElement.textContent = formattedTotal;
  }

  renderRecommendations(cart);
}

function handleUpdateQty(productId, newQty) {
  if (newQty < 1) return;
  updateQuantity(productId, newQty);
}

function handleRemove(productId) {
  removeFromCart(productId);
}

function renderRecommendations(currentCart) {
  const recommendationsGrid = document.getElementById('recommendations-grid');
  if (!recommendationsGrid) return;

  const cartItemIds = currentCart.map(item => item.id);
  
  // Filter products not in cart
  const availableRecommendations = allProducts.filter(p => !cartItemIds.includes(p.id));
  
  // Shuffle array
  const shuffled = availableRecommendations.sort(() => 0.5 - Math.random());
  
  // Pick up to 4
  const recommendations = shuffled.slice(0, 4);

  if (recommendations.length === 0) {
    recommendationsGrid.innerHTML = '<p class="font-sans text-[#555555] col-span-full">You have all our products in your cart!</p>';
    return;
  }

  recommendationsGrid.innerHTML = recommendations.map(product => `
    <div class="group flex flex-col h-full">
      <div class="cursor-pointer">
        <div class="aspect-[3/4] mb-4 overflow-hidden border border-transparent group-hover:border-[#C5A059] transition-colors bg-white shadow-sm">
           <img 
             src="${product.image}" 
             alt="${product.name}" 
             class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
           />
        </div>
        <p class="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A059] mb-2 font-semibold">
          ${product.collection}
        </p>
        <h3 class="font-serif text-xl text-[#2D2D2D] mb-3">${product.name}</h3>
        <span class="font-sans text-sm font-semibold text-[#2D2D2D] border-b border-transparent group-hover:border-[#2D2D2D] pb-0.5 transition-colors block mb-4">
          ${product.price}
        </span>
      </div>
      <div class="mt-auto">
        <button onclick="addToCart(${product.id})" class="w-full font-sans text-xs uppercase tracking-widest text-[#2D2D2D] border border-[#2D2D2D] py-3 hover:bg-[#2D2D2D] hover:text-[#FAF9F6] transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}
