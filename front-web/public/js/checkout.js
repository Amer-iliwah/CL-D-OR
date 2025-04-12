document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('#cart-items');
    const totalPriceElement = document.querySelector('#total-price');
  
    if (cartItemsContainer) {
      let total = 0;
  
      cart.forEach(product => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between lh-sm';
        item.innerHTML = `
          <div class="d-flex">
            <img src="${product.image}" alt="${product.title}" width="50" class="me-2 rounded">
            <div>
              <h6 class="my-0">${product.title}</h6>
              <small class="text-body-secondary">وصف مختصر</small>
            </div>
          </div>
          <span class="text-body-secondary">${product.price} د.أ</span>
        `;
        cartItemsContainer.appendChild(item);
  
        total += parseFloat(product.price);
      });
  
      totalPriceElement.textContent = total.toFixed(2);
    }
  });
  