// checkout.js

// --- Data ---
const locationDiscounts = {
  KL: {
    name: 'Kerala Handloom Heritage Festival',
    description: 'Celebrating GI-tagged handlooms from the home state',
    percent: 15,
    code: 'KLTEXTILE15',
    color: 'bg-amber-50 border-amber-200',
    badge: 'text-amber-700 bg-amber-100'
  },
  MH: {
    name: 'Mumbai Artisan Showcase',
    description: 'Exclusive offer for patrons in Maharashtra',
    percent: 10,
    code: 'MHCRAFT10',
    color: 'bg-blue-50 border-blue-200',
    badge: 'text-blue-700 bg-blue-100'
  },
  DL: {
    name: 'Delhi Weaves Expo',
    description: 'Special pricing for capital region buyers',
    percent: 12,
    code: 'DLWEAVES12',
    color: 'bg-red-50 border-red-200',
    badge: 'text-red-700 bg-red-100'
  },
  KA: {
    name: 'Karnataka Cultural Exchange',
    description: 'South India solidarity discount for Karnataka buyers',
    percent: 10,
    code: 'KACULTURE10',
    color: 'bg-yellow-50 border-yellow-200',
    badge: 'text-yellow-700 bg-yellow-100'
  },
  TN: {
    name: 'Tamil Nadu Textile Alliance',
    description: 'Cross-state textile community discount',
    percent: 12,
    code: 'TNTEXTILE12',
    color: 'bg-green-50 border-green-200',
    badge: 'text-green-700 bg-green-100'
  },
  WB: {
    name: 'Kolkata Craft Fair',
    description: 'Celebrating India\'s eastern textile traditions',
    percent: 8,
    code: 'WBCRAFT8',
    color: 'bg-purple-50 border-purple-200',
    badge: 'text-purple-700 bg-purple-100'
  },
  GJ: {
    name: 'Gujarat Artisan Connect',
    description: 'Solidarity offer for buyers in the textile hub of Gujarat',
    percent: 10,
    code: 'GJLOOM10',
    color: 'bg-orange-50 border-orange-200',
    badge: 'text-orange-700 bg-orange-100'
  },
  RJ: {
    name: 'Rajasthan Textile Mela',
    description: 'India\'s textile heritage discount for Rajasthan buyers',
    percent: 8,
    code: 'RJMELA8',
    color: 'bg-pink-50 border-pink-200',
    badge: 'text-pink-700 bg-pink-100'
  },
  UP: {
    name: 'Lucknow Weaves Festival',
    description: 'Connecting India\'s finest textile traditions',
    percent: 7,
    code: 'UPLOOM7',
    color: 'bg-teal-50 border-teal-200',
    badge: 'text-teal-700 bg-teal-100'
  },
  OTHER: {
    name: 'National Handloom Day Offer',
    description: 'Celebrating handloom craft across India',
    percent: 5,
    code: 'INDIA5',
    color: 'bg-gray-50 border-gray-200',
    badge: 'text-gray-700 bg-gray-100'
  }
};

let currentDiscountPercent = 0;
let currentPaymentMethod = 'card';

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  showPaymentFields('card');

  // If cart is empty, redirect to cart
  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = 'cart.html';
  }
});

function renderCheckoutSummary() {
  const cart = getCart();
  const itemsList = document.getElementById('checkout-items-list');
  if (!itemsList) return;

  itemsList.innerHTML = cart.map(item => `
    <div class="flex gap-3 items-center">
      <div class="w-12 h-14 flex-shrink-0 overflow-hidden border border-[#e5e4e7]">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-sans text-xs text-[#C5A059] uppercase tracking-wider truncate">${item.collection}</p>
        <p class="font-serif text-sm text-[#2D2D2D] truncate">${item.name}</p>
        <p class="font-sans text-xs text-[#555555]">Qty: ${item.quantity}</p>
      </div>
      <span class="font-sans text-sm font-semibold text-[#2D2D2D] shrink-0">₹${(item.priceValue * item.quantity).toLocaleString('en-IN')}</span>
    </div>
  `).join('');

  recalcTotals();
}

function recalcTotals() {
  const subtotal = getCartTotal();
  const discountAmt = Math.round(subtotal * currentDiscountPercent / 100);
  const codFee = currentPaymentMethod === 'cod' ? 50 : 0;
  const total = subtotal - discountAmt + codFee;

  document.getElementById('co-subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
  document.getElementById('co-total').textContent = '₹' + total.toLocaleString('en-IN');

  const discountRow = document.getElementById('co-discount-row');
  if (discountAmt > 0) {
    discountRow.classList.remove('hidden');
    document.getElementById('co-discount-amount').textContent = '−₹' + discountAmt.toLocaleString('en-IN');
  } else {
    discountRow.classList.add('hidden');
  }

  const codRow = document.getElementById('co-cod-row');
  if (codFee > 0) {
    codRow.classList.remove('hidden');
  } else {
    codRow.classList.add('hidden');
  }
}

// --- Location Discounts ---
function applyLocationDiscount() {
  const state = document.getElementById('state').value;
  const container = document.getElementById('discount-container');

  if (!state) {
    container.innerHTML = `
      <div class="py-8 border-2 border-dashed border-[#e5e4e7] text-center text-[#aaa] font-sans text-sm">
        Select your state above to view exclusive regional offers
      </div>`;
    currentDiscountPercent = 0;
    recalcTotals();
    return;
  }

  const discount = locationDiscounts[state];
  if (!discount) return;

  currentDiscountPercent = discount.percent;

  container.innerHTML = `
    <div class="border ${discount.color} p-6 space-y-3 discount-badge">
      <div class="flex items-start justify-between gap-4">
        <div>
          <span class="inline-block font-sans text-xs font-bold uppercase tracking-widest px-2 py-0.5 ${discount.badge} mb-2">${discount.percent}% OFF</span>
          <h4 class="font-serif text-lg text-[#2D2D2D]">${discount.name}</h4>
          <p class="font-sans text-sm text-[#555555] mt-1">${discount.description}</p>
        </div>
        <svg class="w-6 h-6 text-[#C5A059] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 9V4a1 1 0 011-1z"/>
        </svg>
      </div>
      <div class="flex items-center gap-2 pt-1">
        <code class="font-mono text-xs bg-white border border-[#e5e4e7] px-3 py-1 text-[#2D2D2D] tracking-widest">${discount.code}</code>
        <span class="font-sans text-xs text-[#555555]">Applied automatically</span>
        <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      </div>
    </div>
  `;

  recalcTotals();
}

// --- Payment Fields ---
function showPaymentFields(method) {
  currentPaymentMethod = method;
  const allFields = ['card', 'upi', 'netbanking', 'cod'];
  allFields.forEach(m => {
    const el = document.getElementById('fields-' + m);
    if (el) el.classList.add('hidden');
  });
  const active = document.getElementById('fields-' + method);
  if (active) active.classList.remove('hidden');
  recalcTotals();
}

// --- Card Formatting ---
function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1  ').trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) val = val.slice(0, 2) + ' / ' + val.slice(2);
  input.value = val;
}

// --- Payment Submission ---
function handlePayment(e) {
  e.preventDefault();

  const payBtn = document.getElementById('pay-btn');
  payBtn.disabled = true;
  payBtn.textContent = 'Processing…';

  // Brief processing delay for realism
  setTimeout(() => {
    triggerThankYou();
  }, 1200);
}

function triggerThankYou() {
  // Generate mock order ID
  const orderId = 'PHW-' + Date.now().toString(36).toUpperCase();
  document.getElementById('overlay-order-id').textContent = 'Order ID: ' + orderId;

  // Show overlay
  const overlay = document.getElementById('thankyou-overlay');
  overlay.classList.add('visible');

  // Animate progress bar
  const bar = document.getElementById('progress-bar');
  bar.style.transition = 'width 3.5s linear';
  setTimeout(() => { bar.style.width = '100%'; }, 50);

  // Clear cart
  saveCart([]);

  // Redirect home after 4s
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 4000);
}
