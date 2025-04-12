
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        location.reload();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartCountSpan = document.querySelector('#cart-count');
    const cartItemsContainer = document.querySelector('#cart-items');
    const totalPriceElement = document.querySelector('#total-price');
    const clearCartBtn = document.querySelector('#clear-cart');

    function updateCartUI() {
        // تحديث العداد
        if (cartCountSpan) {
            cartCountSpan.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
        }

        // تحديث السعر الكلي
        if (totalPriceElement) {
            const total = cart.reduce((acc, item) => acc + (item.quantity * parseFloat(item.price)), 0);
            totalPriceElement.textContent = total.toFixed(2);
        }

        // عرض عناصر السلة
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <li class="list-group-item text-center text-muted py-4">
                          
                    </li>
                `;
            } else {
                cart.forEach((product, index) => {
                    const item = document.createElement('li');
                    item.className = 'list-group-item d-flex justify-content-between lh-sm align-items-center';
                    item.innerHTML = `
                        <div class="d-flex align-items-center">
                            <img src="${product.image}" alt="${product.title}" width="80" class="me-2 rounded">
                            <div>
                                <h6 class="my-0">${product.title}</h6>
                                <small class="text-muted">${product.price} د.أ × ${product.quantity}</small>
                            </div>
                        </div>
                        <div class="text-end">
                            <div class="btn-group mb-1" role="group">
                                <button class="btn btn-sm btn-outline-secondary decrease" data-index="${index}">-</button>
                                <span class="mx-2">${product.quantity}</span>
                                <button class="btn btn-sm btn-outline-secondary increase" data-index="${index}">+</button>
                            </div>
                            <button class="btn btn-sm btn-danger delete" data-index="${index}">حذف</button>
                        </div>
                    `;
                    cartItemsContainer.appendChild(item);
                });
            }
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addToCart(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const button = event.currentTarget;
        const title = button.dataset.title;
        const price = parseFloat(button.dataset.price);
        const image = button.dataset.image;

        if (!title || isNaN(price)) {
            console.error("Invalid product data");
            return;
        }

        const existingItemIndex = cart.findIndex(item =>
            item.title === title &&
            item.price === price &&
            item.image === image
        );

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push({ title, price, image, quantity: 1 });
        }

        saveCart();
        updateCartUI();

        if (!event.alreadyShownAlert) {
            const alert = document.createElement('div');
            alert.className = 'alert alert-success position-fixed top-0 end-0 m-3';
            alert.textContent = 'تمت إضافة المنتج إلى السلة';
            document.body.appendChild(alert);
            setTimeout(() => alert.remove(), 2000);
            event.alreadyShownAlert = true;
        }
    }

    function setupEventListeners() {
        // زر إضافة للسلة
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.removeEventListener('click', addToCart);
            button.addEventListener('click', addToCart);
        });

        // التحكم بالكميات والحذف داخل السلة
        if (cartItemsContainer) {
            cartItemsContainer.addEventListener('click', function(e) {
                const index = parseInt(e.target.dataset.index);
                if (isNaN(index)) return;

                if (e.target.classList.contains('increase')) {
                    cart[index].quantity++;
                } else if (e.target.classList.contains('decrease')) {
                    cart[index].quantity--;
                    if (cart[index].quantity <= 0) {
                        cart.splice(index, 1);
                    }
                } else if (e.target.classList.contains('delete')) {
                    cart.splice(index, 1);
                }

                saveCart();
                updateCartUI();
            });
        }

        // تفريغ السلة
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                cart = [];
                saveCart();
                updateCartUI();
            });
        }
    }

    setupEventListeners();
    updateCartUI();
});
