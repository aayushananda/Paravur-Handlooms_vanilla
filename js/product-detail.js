// product-detail.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  const product = getProductById(productId);

  if (!product) {
    // Redirect back to collection if not found
    window.location.href = 'collection.html';
    return;
  }

  // Populate DOM
  document.title = `${product.name} | Paravur Handlooms`;
  document.getElementById('pd-image').src = product.image;
  document.getElementById('pd-image').alt = product.name;
  document.getElementById('pd-collection').textContent = product.collection;
  document.getElementById('pd-name').textContent = product.name;
  document.getElementById('pd-price').textContent = product.price;

  // Quantity Controls
  const qtyInput = document.getElementById('pd-qty');
  document.getElementById('pd-qty-minus').addEventListener('click', () => {
    let current = parseInt(qtyInput.value);
    if (current > 1) qtyInput.value = current - 1;
  });
  
  document.getElementById('pd-qty-plus').addEventListener('click', () => {
    let current = parseInt(qtyInput.value);
    qtyInput.value = current + 1;
  });

  // Add to Cart Logic
  document.getElementById('pd-add-btn').addEventListener('click', () => {
    const qty = parseInt(qtyInput.value);
    
    // Using the addToCart function from cart.js
    // Since addToCart normally handles finding the product and defaulting to qty 1,
    // we can either modify addToCart to accept quantity, or implement the add here.
    // Let's implement it here to properly use the qty
    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }
    
    saveCart(cart);
    
    // Change button text temporarily
    const btn = document.getElementById('pd-add-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Added to Cart!';
    btn.classList.add('bg-[#8B2500]');
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('bg-[#8B2500]');
    }, 2000);
  });
});
