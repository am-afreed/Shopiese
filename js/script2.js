document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add to Cart Functionality
    document.querySelectorAll(".card-button").forEach((button, index) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const item = {
                imgSrc: card.querySelector(".card-img").src,
                title: card.querySelector(".card-title").textContent,
                description: card.querySelector(".card-description").textContent,
                price: Math.floor(Math.random() * 15000) + 5000 // Mock price between 50-250
            };

            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${item.title} added to cart! 🛒`);
        });
    });
    document.querySelectorAll('.card-button').forEach(element => {
        element.innerHTML = element.innerHTML.replace('$', '₹');
      });
      

    // Cart Page Functionality
    if (document.getElementById("cart-items")) {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        const updateCartDisplay = () => {
            cartItemsContainer.innerHTML = "";
            let totalPrice = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = "<h2>Your cart is empty! 😞</h2>";
                cartTotal.textContent = "$0";
                return;
            }

            cart.forEach((item, index) => {
                let cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");

                cartItem.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <p>₹${item.price}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;

                cartItemsContainer.appendChild(cartItem);
                totalPrice += item.price;
            });

            cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;
            attachRemoveEvent();
        };

        const attachRemoveEvent = () => {
            document.querySelectorAll(".remove-btn").forEach(button => {
                button.addEventListener("click", (e) => {
                    let index = e.target.getAttribute("data-index");
                    cart.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartDisplay();
                });
            });
        };
    
    updateCartDisplay();
}
});

// document.getElementById("checkout-btn").addEventListener("click", () => {
//     // alert("Proceeding to checkout...");
//     localStorage.removeItem("cart");
//     window.location.reload();