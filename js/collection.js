// collection.js

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = allProducts.map(product => `
    <div class="group flex flex-col h-full">
      <a href="product.html?id=${product.id}" class="cursor-pointer block group-hover:no-underline">
        <div class="aspect-[3/4] mb-6 overflow-hidden border border-transparent group-hover:border-[#C5A059] transition-colors bg-white shadow-sm">
           <img 
             src="${product.image}" 
             alt="${product.name}" 
             class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
           />
        </div>
        <p class="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A059] mb-2 font-semibold">
          ${product.collection}
        </p>
        <h3 class="font-serif text-2xl text-[#2D2D2D] mb-3">${product.name}</h3>
        <span class="font-sans text-sm font-semibold text-[#2D2D2D] border-b border-transparent group-hover:border-[#2D2D2D] pb-0.5 transition-colors block mb-4">
          ${product.price}
        </span>
      </a>
      <div class="mt-auto">
        <button onclick="addToCart(${product.id})" class="w-full font-sans text-xs uppercase tracking-widest text-[#2D2D2D] border border-[#2D2D2D] py-3 hover:bg-[#2D2D2D] hover:text-[#FAF9F6] transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
