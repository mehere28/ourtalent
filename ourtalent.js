/* ========================================
   HANDMADE CREATIONS
   COMPLETE SCRIPT.JS
======================================== */


/* ========================================
   CART
======================================== */

let cart = JSON.parse(
    localStorage.getItem("handmadeCart")
) || [];


/* ========================================
   SAVE CART
======================================== */

function saveCart() {

    localStorage.setItem(
        "handmadeCart",
        JSON.stringify(cart)
    );

}


/* ========================================
   UPDATE CART COUNT
======================================== */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent = cart.length;

    }

}


/* ========================================
   ADD TO CART
======================================== */

function addToCart(button) {

    const card =
        button.closest(".product-card");

    if (!card) return;


    const id =
        button.getAttribute("data-id");

    const name =
        button.getAttribute("data-name");

    const price =
        Number(
            button.getAttribute("data-price")
        );


    const sizeSelect =
        card.querySelector(".size-select");


    const size =
        sizeSelect
            ? sizeSelect.value
            : "Free Size";


    const product = {

        id: id,

        name: name,

        price: price,

        size: size

    };


    cart.push(product);

    saveCart();

    updateCartCount();

    displayCart();


    alert(
        name +
        " has been added to your cart!"
    );

}


/* ========================================
   DISPLAY CART
======================================== */

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");


    const cartTotal =
        document.getElementById("cartTotal");


    const advanceAmount =
        document.getElementById(
            "advanceAmount"
        );


    if (!cartItems) return;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        if (cartTotal) {

            cartTotal.textContent =
                "Rs. 0";

        }

        if (advanceAmount) {

            advanceAmount.textContent =
                "2% Advance Booking: Rs. 0";

        }

        return;

    }


    let total = 0;


    let html = "";


    cart.forEach(
        function(product, index) {

            total += product.price;


            html += `

                <div class="cart-item">

                    <p>

                        <strong>
                            ${index + 1}.
                            ${product.name}
                        </strong>

                    </p>

                    <p>
                        Size:
                        ${product.size}
                    </p>

                    <p>
                        Price:
                        Rs. ${product.price}
                    </p>

                    <button
                        onclick="removeFromCart(${index})"
                        class="remove-cart">
                        Remove
                    </button>

                    <hr>

                </div>

            `;

        }
    );


    cartItems.innerHTML = html;


    if (cartTotal) {

        cartTotal.textContent =
            "Rs. " + total;

    }


    const advance =
        Math.round(total * 0.02);


    if (advanceAmount) {

        advanceAmount.textContent =
            "2% Advance Booking: Rs. " +
            advance;

    }

}


/* ========================================
   REMOVE FROM CART
======================================== */

function removeFromCart(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }


    cart.splice(index, 1);


    saveCart();

    updateCartCount();

    displayCart();

}


/* ========================================
   CHECKOUT
======================================== */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Please add a product to your cart first."
        );

        return;

    }


    const orderItems =
        document.getElementById(
            "orderItems"
        );


    if (orderItems) {

        orderItems.value =
            cart
                .map(
                    function(product) {

                        return (
                            product.name +
                            " | Size: " +
                            product.size +
                            " | Rs. " +
                            product.price
                        );

                    }
                )
                .join("\n");

    }


    const orderSection =
        document.getElementById("order");


    if (orderSection) {

        orderSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ========================================
   ORDER FORM
======================================== */

function submitOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Please add at least one product to your cart."
        );

        return;

    }


    const form =
        document.getElementById(
            "orderForm"
        );


    const name =
        form.querySelector(
            '[name="name"]'
        ).value;


    const phone =
        form.querySelector(
            '[name="phone"]'
        ).value;


    const city =
        form.querySelector(
            '[name="city"]'
        ).value;


    const payment =
        form.querySelector(
            '[name="payment"]'
        ).value;


    const address =
        form.querySelector(
            '[name="address"]'
        ).value;


    if (
        !name ||
        !phone ||
        !city ||
        !payment ||
        !address
    ) {

        alert(
            "Please fill in all required details."
        );

        return;

    }


    const total =
        cart.reduce(
            function(sum, product) {

                return sum + product.price;

            },
            0
        );


    const advance =
        Math.round(total * 0.02);


    alert(
        "Thank you, " +
        name +
        "!\n\n" +

        "Your order request has been prepared.\n" +

        "Total: Rs. " +
        total +
        "\n" +

        "20% Advance: Rs. " +
        advance +
        "\n\n" +

        "Payment Method: " +
        payment
    );


    /*
       Order request successfully prepared.
       Cart is kept so customer can review it.
    */

}


/* ========================================
   PRODUCT BUTTONS
======================================== */

function setupProductButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-cart"
        );


    buttons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    addToCart(button);

                }
            );

        }
    );

}


/* ========================================
   CHECKOUT BUTTON
======================================== */

function setupCheckoutButton() {

    const button =
        document.getElementById(
            "checkoutButton"
        );


    if (button) {

        button.addEventListener(
            "click",
            checkout
        );

    }

}


/* ========================================
   ORDER FORM SETUP
======================================== */

function setupOrderForm() {

    const form =
        document.getElementById(
            "orderForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            submitOrder
        );

    }

}


/* ========================================
   PRODUCT IMAGE THUMBNAILS
======================================== */

function setupThumbnails() {

    const thumbnails =
        document.querySelectorAll(
            ".thumbs img"
        );


    thumbnails.forEach(
        function(thumbnail) {

            thumbnail.addEventListener(
                "click",
                function() {

                    const productCard =
                        thumbnail.closest(
                            ".product-card"
                        );


                    if (!productCard) return;


                    const mainImage =
                        productCard.querySelector(
                            ".product-image img"
                        );


                    if (mainImage) {

                        mainImage.src =
                            thumbnail.src;

                    }

                }
            );

        }
    );

}


/* ========================================
   NAVIGATION ACTIVE EFFECT
======================================== */

function setupNavigation() {

    const links =
        document.querySelectorAll(
            "nav a"
        );


    links.forEach(
        function(link) {

            link.addEventListener(
                "click",
                function() {

                    links.forEach(
                        function(item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    link.classList.add(
                        "active"
                    );

                }
            );

        }
    );

}


/* ========================================
   START WEBSITE
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

        setupProductButtons();

        setupCheckoutButton();

        setupOrderForm();

        setupThumbnails();

        setupNavigation();

    }
);

function showOrderForm() {
    const form = document.getElementById("orderFormBox");

    if (form) {
        form.style.display = "block";
        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}





















