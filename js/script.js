// Hero Slider Functionality
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const sliderNextBtn = document.querySelector('.next');

let currentSlide = 0;
const slideCount = slides.length;

// Initialize slider
function initSlider() {
    // Set initial position
    updateSlider();
    
    // Start auto-sliding
    startAutoSlide();
}

// Update slider position
function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
}

// Auto-sliding functionality
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

sliderNextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
        stopAutoSlide();
        startAutoSlide();
    });
});

// Pause auto-sliding when hovering over slider
sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
sliderWrapper.addEventListener('mouseleave', startAutoSlide);

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const totalAmount = document.querySelector('.total-amount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    loadCart();
    displayProducts();
    setupCheckoutFunctionality();
});

// Enhanced product data
const products = [
    {
        id: 1,
        name: "Summer Collection Bundle",
        price: 1999,
        originalPrice: 2999,
        image: "images/slider1.jpg",
        category: "Fashion",
        rating: 4.8,
        ratingCount: 156,
        description: "Get ready for summer with this exclusive collection bundle featuring trendy outfits and accessories.",
        specifications: {
            "Collection": "Summer 2024",
            "Items Included": "5 pieces",
            "Materials": "Cotton, Linen",
            "Care": "Machine washable"
        },
        variants: {
            colors: ["White", "Beige", "Light Blue"],
            sizes: ["S", "M", "L", "XL"]
        },
        images: [
            "images/slider1.jpg",
            "images/slider1-2.jpg",
            "images/slider1-3.jpg"
        ]
    },
    {
        id: 2,
        name: "Premium Electronics Bundle",
        price: 1299,
        originalPrice: 2599,
        image: "images/slider2.jpg",
        category: "Electronics",
        rating: 4.9,
        ratingCount: 203,
        description: "High-end electronics bundle including the latest gadgets and accessories.",
        specifications: {
            "Bundle Contents": "Laptop, Tablet, Accessories",
            "Warranty": "2 Years",
            "Support": "24/7 Premium Support",
            "Additional": "Free Software Package"
        },
        variants: {
            colors: ["Space Gray", "Silver"],
            sizes: ["256GB", "512GB", "1TB"]
        },
        images: [
            "images/slider2.jpg",
            "images/slider2-2.jpg",
            "images/slider2-3.jpg"
        ]
    },
    {
        id: 3,
        name: "Latest Laptop Collection",
        price: 12999,
        originalPrice: 25999,
        image: "images/slider3.jpg",
        category: "Electronics",
        rating: 4.7,
        ratingCount: 189,
        description: "Powerful laptops featuring the latest processors and premium design.",
        specifications: {
            "Processor": "Latest Gen Intel/AMD",
            "RAM": "Up to 32GB",
            "Storage": "NVMe SSD",
            "Display": "4K Resolution"
        },
        variants: {
            colors: ["Silver", "Space Gray", "Midnight"],
            sizes: ["13 inch", "15 inch", "17 inch"]
        },
        images: [
            "images/slider3.jpg",
            "images/slider3-2.jpg",
            "images/slider3-3.jpg"
        ]
    },
    {
        id: 4,
        name: "Premium Headphones",
        price: 7999,
        originalPrice: 9999,
        image: "images/promo1.jpg",
        category: "Electronics",
        rating: 4.6,
        ratingCount: 245,
        description: "High-quality wireless headphones with noise cancellation.",
        specifications: {
            "Battery Life": "30 hours",
            "Connectivity": "Bluetooth 5.0",
            "Features": "ANC, Touch Controls",
            "Warranty": "1 Year"
        },
        variants: {
            colors: ["Black", "White", "Blue"],
            sizes: ["One Size"]
        },
        images: [
            "images/promo1.jpg",
            "images/promo1-2.jpg",
            "images/promo1-3.jpg"
        ]
    },
    {
        id: 5,
        name: "Smart Watch Pro",
        price: 1999,
        originalPrice: 2999,
        image: "images/promo2.jpg",
        category: "Electronics",
        rating: 4.8,
        ratingCount: 178,
        description: "Advanced smartwatch with health monitoring and fitness tracking.",
        specifications: {
            "Display": "AMOLED",
            "Battery": "Up to 14 days",
            "Water Resistance": "5ATM",
            "Sensors": "Heart Rate, SpO2, GPS"
        },
        variants: {
            colors: ["Black", "Silver", "Rose Gold"],
            sizes: ["40mm", "44mm"]
        },
        images: [
            "images/promo2.jpg",
            "images/promo2-2.jpg",
            "images/promo2-3.jpg"
        ]
    },
    {
        id: 6,
        name: "Wireless Earbuds",
        price: 899,
        originalPrice: 1199,
        image: "images/promo3.jpg",
        category: "Electronics",
        rating: 4.7,
        ratingCount: 156,
        description: "True wireless earbuds with premium sound quality and long battery life.",
        specifications: {
            "Battery Life": "24 hours with case",
            "Drivers": "Dynamic 12mm",
            "Features": "Touch Controls, ANC",
            "Water Resistance": "IPX5"
        },
        variants: {
            colors: ["Black", "White", "Navy"],
            sizes: ["One Size"]
        },
        images: [
            "images/promo3.jpg",
            "images/promo3-2.jpg",
            "images/promo3-3.jpg"
        ]
    },
    {
        id: 7,
        name: "Gaming Laptop Pro",
        price: 14999,
        originalPrice: 18999,
        image: "images/gaming-laptop.jpg",
        category: "Electronics",
        rating: 4.9,
        ratingCount: 342,
        description: "High-performance gaming laptop with RTX graphics and 144Hz display.",
        specifications: {
            "Processor": "Intel Core i7 12th Gen",
            "GPU": "RTX 3070",
            "RAM": "16GB DDR5",
            "Storage": "1TB NVMe SSD"
        },
        variants: {
            colors: ["Black", "White"],
            sizes: ["15.6 inch", "17.3 inch"]
        },
        images: ["images/gaming-laptop.jpg", "images/gaming-laptop-2.jpg", "images/gaming-laptop-3.jpg"]
    },
    {
        id: 8,
        name: "Designer Handbag",
        price: 2599,
        originalPrice: 3999,
        image: "images/handbag.jpg",
        category: "Fashion",
        rating: 4.7,
        ratingCount: 189,
        description: "Luxury designer handbag made with genuine leather.",
        specifications: {
            "Material": "Genuine Leather",
            "Size": "Medium",
            "Style": "Shoulder Bag",
            "Closure": "Magnetic Snap"
        },
        variants: {
            colors: ["Brown", "Black", "Tan"],
            sizes: ["Small", "Medium", "Large"]
        },
        images: ["images/handbag.jpg", "images/handbag-2.jpg", "images/handbag-3.jpg"]
    },
    {
        id: 9,
        name: "Smart 4K TV",
        price: 7999,
        originalPrice: 12999,
        image: "images/smart-tv.jpg",
        category: "Electronics",
        rating: 4.8,
        ratingCount: 456,
        description: "55-inch 4K Smart TV with HDR and built-in streaming apps.",
        specifications: {
            "Screen Size": "55 inch",
            "Resolution": "4K Ultra HD",
            "HDR": "Yes",
            "Smart Features": "Built-in WiFi, Voice Control"
        },
        variants: {
            sizes: ["43 inch", "55 inch", "65 inch"]
        },
        images: ["images/smart-tv.jpg", "images/smart-tv-2.jpg", "images/smart-tv-3.jpg"]
    },
    {
        id: 10,
        name: "Fitness Tracker",
        price: 7999,
        originalPrice: 9999,
        image: "images/fitness-tracker.jpg",
        category: "Electronics",
        rating: 4.6,
        ratingCount: 678,
        description: "Advanced fitness tracker with heart rate monitoring and GPS.",
        specifications: {
            "Display": "AMOLED",
            "Battery Life": "7 days",
            "Water Resistance": "5ATM",
            "Features": "Heart Rate, GPS, Sleep Tracking"
        },
        variants: {
            colors: ["Black", "Blue", "Pink"],
            sizes: ["One Size"]
        },
        images: ["images/fitness-tracker.jpg", "images/fitness-tracker-2.jpg", "images/fitness-tracker-3.jpg"]
    },
    {
        id: 11,
        name: "Coffee Maker",
        price: 1599,
        originalPrice: 2999,
        image: "images/coffee-maker.jpg",
        category: "Home & Kitchen",
        rating: 4.7,
        ratingCount: 234,
        description: "Programmable coffee maker with thermal carafe and auto-brew function.",
        specifications: {
            "Capacity": "12 Cups",
            "Carafe": "Thermal",
            "Timer": "24-hour",
            "Filter": "Permanent"
        },
        variants: {
            colors: ["Silver", "Black"],
            sizes: ["12 Cup", "14 Cup"]
        },
        images: ["images/coffee-maker.jpg", "images/coffee-maker-2.jpg", "images/coffee-maker-3.jpg"]
    },
    {
        id: 12,
        name: "Wireless Speaker",
        price: 1999,
        originalPrice: 2999,
        image: "images/speaker.jpg",
        category: "Electronics",
        rating: 4.8,
        ratingCount: 567,
        description: "Premium wireless speaker with 360° sound and waterproof design.",
        specifications: {
            "Battery Life": "20 hours",
            "Bluetooth": "5.0",
            "Waterproof": "IPX7",
            "Power": "30W"
        },
        variants: {
            colors: ["Black", "Gray", "Blue"],
            sizes: ["One Size"]
        },
        images: ["images/speaker.jpg", "images/speaker-2.jpg", "images/speaker-3.jpg"]
    }
];

// Display products in the grid
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price-info">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart-btn">
                    <i class="fas fa-shopping-cart"></i>
                    <span>Add to Cart</span>
                    <div class="button-loader hidden">
                        <div class="spinner"></div>
                    </div>
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners to the new buttons
    attachCartEventListeners();
}

// Add event listeners to the new buttons
function attachCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.card-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering product modal
            console.log("clicked");
            
        });
    });
}

// Cart Management System
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartUI() {
    // Update cart count
    const cartCountElements = document.querySelectorAll('.cart-count');
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = itemCount);

    // Update cart items
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">$${item.price.toFixed(2)} × ${item.quantity}</p>
                    <div class="item-actions">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update totals
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelectorAll('.total-amount').forEach(el => {
        el.textContent = total.toFixed(2);
    });
    document.querySelectorAll('.final-amount').forEach(el => {
        el.textContent = total.toFixed(2);
    });
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add some additional styles for the new elements
const styles = `
    .product-card {
        background: white;
        border-radius: 10px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease;
    }

    .product-card:hover {
        transform: translateY(-5px);
    }

    .product-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .product-info {
        padding: 1rem;
    }

    .price {
        color: #2c3e50;
        font-weight: bold;
        margin: 0.5rem 0;
    }

    .add-to-cart {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        transition: background-color 0.3s ease;
    }

    .add-to-cart:hover {
        background-color: #2980b9;
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Enhanced Product Display
function displayProducts(productsToDisplay = products) {
    productGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <span class="view-details">View Details</span>
                </div>
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id}); event.stopPropagation();">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        <span class="discount-badge">
                            -${Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                    ` : ''}
                </div>
                <div class="product-rating">
                    ${generateStarRating(product.rating || 4.5)}
                    <span class="rating-count">(${product.ratingCount || 123})</span>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Wishlist functionality
let wishlist = [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        showNotification('Added to wishlist!');
    } else {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist!');
    }
    updateWishlistUI(productId);
}

function updateWishlistUI(productId) {
    const wishlistBtn = document.querySelector(`[onclick="toggleWishlist(${productId})"]`);
    if (wishlistBtn) {
        const icon = wishlistBtn.querySelector('i');
        if (wishlist.includes(productId)) {
            icon.classList.replace('far', 'fas');
            icon.style.color = '#e74c3c';
        } else {
            icon.classList.replace('fas', 'far');
            icon.style.color = '';
        }
    }
}

// Product Modal Functionality
const productModal = document.getElementById('productModal');
const modalMainImage = document.getElementById('modalMainImage');
let currentProduct = null;

function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    // Update modal content
    const modalTitle = productModal.querySelector('.product-title');
    const currentPrice = productModal.querySelector('.current-price');
    const originalPrice = productModal.querySelector('.original-price');
    const discountBadge = productModal.querySelector('.discount-badge');
    const description = productModal.querySelector('.product-description');
    const stars = productModal.querySelector('.stars');
    const reviewCount = productModal.querySelector('.review-count');
    const thumbnailList = productModal.querySelector('.thumbnail-list');

    modalTitle.textContent = currentProduct.name;
    currentPrice.textContent = `$${currentProduct.price.toFixed(2)}`;
    
    if (currentProduct.originalPrice) {
        originalPrice.textContent = `$${currentProduct.originalPrice.toFixed(2)}`;
        const discount = Math.round((1 - currentProduct.price / currentProduct.originalPrice) * 100);
        discountBadge.textContent = `-${discount}%`;
        originalPrice.style.display = 'inline';
        discountBadge.style.display = 'inline';
    } else {
        originalPrice.style.display = 'none';
        discountBadge.style.display = 'none';
    }

    // Set main image and thumbnails
    modalMainImage.src = currentProduct.image;
    thumbnailList.innerHTML = currentProduct.images.map((img, index) => `
        <img src="${img}" 
             alt="${currentProduct.name}" 
             class="thumbnail ${index === 0 ? 'active' : ''}"
             onclick="updateMainImage(this.src)">
    `).join('');

    description.innerHTML = currentProduct.description;
    stars.innerHTML = generateStarRating(currentProduct.rating);
    reviewCount.textContent = `(${currentProduct.ratingCount} reviews)`;

    // Update variants
    updateVariants();

    // Update tabs
    updateTabs();

    // Reset quantity
    qtyInput.value = 1;

    // Show modal
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Stop auto-sliding if opened from slider
    if (autoSlideInterval) {
        stopAutoSlide();
    }
}

function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
}

function updateVariants() {
    const sizeOptions = productModal.querySelector('.size-options');
    const colorOptions = productModal.querySelector('.color-options');

    if (currentProduct.variants.sizes) {
        sizeOptions.innerHTML = currentProduct.variants.sizes.map(size => `
            <button class="size-option" data-size="${size}">${size}</button>
        `).join('');
    }

    if (currentProduct.variants.colors) {
        colorOptions.innerHTML = currentProduct.variants.colors.map(color => `
            <button class="color-option" 
                    data-color="${color}" 
                    style="background-color: ${color.toLowerCase()}">
            </button>
        `).join('');
    }

    // Add event listeners for variants
    sizeOptions.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', () => {
            sizeOptions.querySelector('.active')?.classList.remove('active');
            btn.classList.add('active');
        });
    });

    colorOptions.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', () => {
            colorOptions.querySelector('.active')?.classList.remove('active');
            btn.classList.add('active');
        });
    });
}

function updateTabs() {
    const tabContent = productModal.querySelector('.tab-content');
    const tabButtons = productModal.querySelectorAll('.tab-btn');

    function showTab(tabName) {
        let content = '';
        switch (tabName) {
            case 'description':
                content = `<p>${currentProduct.description}</p>`;
                break;
            case 'specifications':
                content = `
                    <table class="specs-table">
                        ${Object.entries(currentProduct.specifications).map(([key, value]) => `
                            <tr>
                                <td>${key}</td>
                                <td>${value}</td>
                            </tr>
                        `).join('')}
                    </table>
                `;
                break;
            case 'reviews':
                content = `
                    <div class="reviews-list">
                        ${currentProduct.reviews.map(review => `
                            <div class="review-item">
                                <div class="review-header">
                                    <span class="review-author">${review.user}</span>
                                    <div class="review-rating">
                                        ${generateStarRating(review.rating)}
                                    </div>
                                </div>
                                <p class="review-comment">${review.comment}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
        }
        tabContent.innerHTML = content;
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showTab(btn.dataset.tab);
        });
    });

    // Show initial tab
    showTab('description');
}

// Quantity selector functionality
const qtyInput = productModal.querySelector('.qty-input');
const minusBtn = productModal.querySelector('.qty-btn.minus');
const plusBtn = productModal.querySelector('.qty-btn.plus');

minusBtn.addEventListener('click', () => {
    const currentValue = parseInt(qtyInput.value);
    if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
    }
});

plusBtn.addEventListener('click', () => {
    const currentValue = parseInt(qtyInput.value);
    qtyInput.value = currentValue + 1;
});

// Modal close button
const closeModalBtn = productModal.querySelector('.close-modal');
closeModalBtn.addEventListener('click', closeProductModal);

// Close modal when clicking outside
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        closeProductModal();
    }
});

// Update main image when clicking thumbnails
function updateMainImage(src) {
    modalMainImage.src = src;
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.toggle('active', thumb.src === src);
    });
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Checkout Functionality
function setupCheckoutFunctionality() {
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = checkoutModal.querySelector('.close-modal');
    const placeOrderBtn = checkoutModal.querySelector('.place-order-btn');
    const summaryItems = checkoutModal.querySelector('.summary-items');
    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');
    const nextBtn = checkoutModal.querySelector('.next-btn');
    const backBtn = checkoutModal.querySelector('.back-btn');
    const progressSteps = checkoutModal.querySelectorAll('.progress-step');

    let currentStep = 'shipping';
    const steps = ['shipping', 'payment', 'review'];
    let appliedCoupon = null;
    const availableCoupons = {
        'WELCOME10': { discount: 0.1, type: 'percentage' },
        'SAVE20': { discount: 0.2, type: 'percentage' },
        'FLAT50': { discount: 50, type: 'fixed' }
    };

    // Add event listeners for checkout
    document.querySelector('.checkout-btn').addEventListener('click', openCheckout);
    document.querySelector('.apply-coupon').addEventListener('click', handleCouponCode);
    document.querySelectorAll('input[name="shipping"]').forEach(input => {
        input.addEventListener('change', handleShippingMethodChange);
    });
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.addEventListener('click', () => handlePaymentMethodChange(btn.dataset.method));
    });
    nextBtn.addEventListener('click', handleNext);
    backBtn.addEventListener('click', handleBack);
    closeCheckoutBtn.addEventListener('click', closeCheckout);
    placeOrderBtn.addEventListener('click', placeOrder);

    // Close checkout modal when clicking outside
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckout();
        }
    });

    // ... rest of the checkout functionality code ...
}

// Open checkout modal
function openCheckout() {
    updateOrderSummary();
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showStep('shipping');
}

// Close checkout modal
function closeCheckout() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
    resetCheckout();
}

// Reset checkout state
function resetCheckout() {
    currentStep = 'shipping';
    appliedCoupon = null;
    updateProgressSteps();
    shippingForm.reset();
    paymentForm.reset();
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
}

// Show specific checkout step
function showStep(step) {
    currentStep = step;
    updateProgressSteps();

    // Hide all sections
    document.querySelectorAll('.checkout-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show current section
    document.getElementById(`${step}Section`).style.display = 'block';

    // Update buttons
    updateButtons();
}

// Update progress steps
function updateProgressSteps() {
    const currentIndex = steps.indexOf(currentStep);
    progressSteps.forEach((step, index) => {
        if (index <= currentIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Update buttons visibility
function updateButtons() {
    const currentIndex = steps.indexOf(currentStep);
    
    backBtn.style.display = currentIndex === 0 ? 'none' : 'block';
    nextBtn.style.display = currentIndex === steps.length - 1 ? 'none' : 'block';
    placeOrderBtn.style.display = currentIndex === steps.length - 1 ? 'block' : 'none';
    
    nextBtn.textContent = currentIndex === 1 ? 'Review Order' : 'Continue to Payment';
}

// Validate shipping form
function validateShippingForm() {
    let isValid = true;
    const requiredFields = shippingForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (!field.value.trim()) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'This field is required';
            isValid = false;
        } else {
            formGroup.classList.remove('error');
            errorMessage.textContent = '';
            
            // Additional validation
            if (field.type === 'email' && !validateEmail(field.value)) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Please enter a valid email address';
                isValid = false;
            }
            if (field.id === 'phone' && !validatePhone(field.value)) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Please enter a valid phone number';
                isValid = false;
            }
            if (field.id === 'postalCode' && !validatePostalCode(field.value)) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Please enter a valid postal code';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Validate payment form
function validatePaymentForm() {
    let isValid = true;
    const activePaymentMethod = document.querySelector('.payment-method-btn.active').dataset.method;
    
    if (activePaymentMethod === 'card') {
        const requiredFields = document.querySelector('.card-form').querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            if (!field.value.trim()) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'This field is required';
                isValid = false;
            } else {
                formGroup.classList.remove('error');
                errorMessage.textContent = '';
                
                // Additional validation
                if (field.id === 'cardNumber' && !validateCardNumber(field.value)) {
                    formGroup.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid card number';
                    isValid = false;
                }
                if (field.id === 'expiry' && !validateExpiry(field.value)) {
                    formGroup.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid expiry date';
                    isValid = false;
                }
                if (field.id === 'cvv' && !validateCVV(field.value)) {
                    formGroup.classList.add('error');
                    errorMessage.textContent = 'Please enter a valid CVV';
                    isValid = false;
                }
            }
        });
    }
    
    return isValid;
}

// Validation helper functions
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

function validatePostalCode(code) {
    return /^[\d\w\s-]{3,10}$/.test(code);
}

function validateCardNumber(number) {
    return /^\d{16}$/.test(number.replace(/\s/g, ''));
}

function validateExpiry(expiry) {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    
    const [month, year] = expiry.split('/').map(num => parseInt(num));
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    
    return month >= 1 && month <= 12 && 
           year >= currentYear && 
           (year > currentYear || month >= currentMonth);
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// Handle next button click
function handleNext() {
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentStep === 'shipping' && !validateShippingForm()) {
        return;
    }
    
    if (currentStep === 'payment' && !validatePaymentForm()) {
        return;
    }
    
    if (currentIndex < steps.length - 1) {
        showStep(steps[currentIndex + 1]);
    }
}

// Handle back button click
function handleBack() {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
        showStep(steps[currentIndex - 1]);
    }
}

// Update order summary
function updateOrderSummary() {
    // Update items
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="summary-item-details">
                <h4>${item.name}</h4>
                <p class="summary-item-price">$${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <span class="summary-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    updateTotals();
}

// Update totals
function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    const shipping = getShippingCost(shippingMethod);
    let discount = 0;
    
    if (appliedCoupon) {
        if (appliedCoupon.type === 'percentage') {
            discount = subtotal * appliedCoupon.discount;
        } else {
            discount = appliedCoupon.discount;
        }
    }
    
    const tax = (subtotal - discount) * 0.1; // 10% tax
    const total = subtotal + shipping + tax - discount;

    // Update summary totals
    checkoutModal.querySelector('.subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
    checkoutModal.querySelector('.shipping-amount').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    checkoutModal.querySelector('.tax-amount').textContent = `$${tax.toFixed(2)}`;
    
    const discountRow = checkoutModal.querySelector('.summary-row.discount');
    if (discount > 0) {
        discountRow.classList.remove('hidden');
        discountRow.querySelector('.discount-amount').textContent = `-$${discount.toFixed(2)}`;
    } else {
        discountRow.classList.add('hidden');
    }
    
    checkoutModal.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
}

// Get shipping cost
function getShippingCost(method) {
    switch (method) {
        case 'express': return 14.99;
        case 'overnight': return 29.99;
        default: return 0;
    }
}

// Handle shipping method change
function handleShippingMethodChange() {
    updateTotals();
}

// Handle payment method change
function handlePaymentMethodChange(method) {
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.payment-form').forEach(form => {
        form.classList.remove('active');
    });
    
    document.querySelector(`[data-method="${method}"]`).classList.add('active');
    document.querySelector(`.${method}-form`).classList.add('active');
}

// Handle coupon code
function handleCouponCode() {
    const couponInput = document.getElementById('couponCode');
    const couponMessage = document.querySelector('.coupon-message');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    if (availableCoupons[couponCode]) {
        appliedCoupon = availableCoupons[couponCode];
        couponMessage.textContent = 'Coupon applied successfully!';
        couponMessage.className = 'coupon-message success';
        updateTotals();
    } else {
        couponMessage.textContent = 'Invalid coupon code';
        couponMessage.className = 'coupon-message error';
    }
}

// Place order
function placeOrder() {
    // Show loading state
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Processing...';

    // Simulate order processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        updateCart();

        // Show success message
        showNotification('Order placed successfully! Thank you for your purchase.');

        // Reset button and close modal
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = 'Place Order';
        closeCheckout();
    }, 2000);
}

// Event Listeners
document.querySelector('.apply-coupon').addEventListener('click', handleCouponCode);
document.querySelectorAll('input[name="shipping"]').forEach(input => {
    input.addEventListener('change', handleShippingMethodChange);
});
document.querySelectorAll('.payment-method-btn').forEach(btn => {
    btn.addEventListener('click', () => handlePaymentMethodChange(btn.dataset.method));
});
nextBtn.addEventListener('click', handleNext);
backBtn.addEventListener('click', handleBack);
closeCheckoutBtn.addEventListener('click', closeCheckout);
placeOrderBtn.addEventListener('click', placeOrder);

// Close modal when clicking outside
checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        closeCheckout();
    }
});

// Notification System
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 2700);
}

// Add these CSS styles if not already present
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: #2ecc71;
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease forwards;
    }

    .notification.error {
        background: #e74c3c;
    }

    .notification i {
        font-size: 1.2rem;
    }

    .notification.fade-out {
        animation: slideOut 0.3s ease forwards;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 