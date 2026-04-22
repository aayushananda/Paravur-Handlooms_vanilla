// products.js

const allProducts = [
  {
    id: 1,
    name: 'Traditional Set Saree',
    collection: 'Raavil Ezhuthiya',
    image: 'assets/setSaree.jpeg',
    price: '₹3,500',
    priceValue: 3500
  },
  {
    id: 2,
    name: 'Double Mundu',
    collection: 'Classic Weaves',
    image: 'assets/double.jpeg',
    price: '₹2,800',
    priceValue: 2800
  },
  {
    id: 3,
    name: 'Kavi Mundu',
    collection: 'Ritual Attire',
    image: 'assets/kavi.jpeg',
    price: '₹2,500',
    priceValue: 2500
  },
  {
    id: 4,
    name: 'Kasavu Jacquard Saree',
    collection: 'In the Weave of Onam',
    image: 'assets/Jacquard Saree.jpeg',
    price: '₹4,500',
    priceValue: 4500
  },
  {
    id: 5,
    name: 'Puliyilakkara Mundu',
    collection: 'Classic Weaves',
    image: 'assets/mundu1.jpeg',
    price: '₹2,600',
    priceValue: 2600
  },
  {
    id: 6,
    name: 'Chuttikara Kasavu Mundu',
    collection: 'Heritage Series',
    image: 'assets/mundu2.jpeg',
    price: '₹3,000',
    priceValue: 3000
  },
  {
    id: 7,
    name: 'Premium Veedi Kara Mundu',
    collection: 'Festive Edition',
    image: 'assets/mundu3.jpeg',
    price: '₹3,200',
    priceValue: 3200
  },
  {
    id: 8,
    name: 'Chendamangalam Kasavu Saree',
    collection: 'Bridal Archive',
    image: 'assets/saree1.jpeg',
    price: '₹4,200',
    priceValue: 4200
  },
  {
    id: 9,
    name: 'Handwoven Check Saree',
    collection: 'Contemporary Loom',
    image: 'assets/saree2.jpeg',
    price: '₹3,800',
    priceValue: 3800
  }
];

// Helper to get product by ID
function getProductById(id) {
  return allProducts.find(p => p.id === parseInt(id));
}
