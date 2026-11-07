//
const cartContainer = document.querySelector('#cart-items');
const cartCount = document.querySelector('[data-cart-count]');
const cartTotal = document.querySelector('#cart-total');
const clearCartButton = document.querySelector('#clear-cart');
const checkoutButton = document.querySelector('#checkout');
const checkoutDialog = document.querySelector('#checkout-dialog');
const checkoutForm = document.querySelector('#checkout-form');
const checkoutTotal = document.querySelector('#checkout-total');
const cancelCheckoutButton = document.querySelector('#cancel-checkout');
const toast = document.querySelector('#toast');

//
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

//
function escapeHtml(value) {
    const text = String(value ?? '');
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

//
const createCartItem = (product) => {
    const imageValue = String(product.image ?? '');
    const isImageUrl =
        imageValue.startsWith('https://') ||
        imageValue.startsWith('http://');

    const image = isImageUrl
        ? `<img src="${escapeHtml(imageValue)}" alt="${escapeHtml(product.title)}">`
        : `<span aria-hidden="true">${escapeHtml(imageValue || '📦')}</span>`;

    return `
        <article class="cart-item">
            ${image}
            <h2>${escapeHtml(product.title)}</h2>
            <p>${escapeHtml(product.price)} ₴ × ${escapeHtml(product.quantity)}</p>
            <div class="quantity-counter">
                <button type="button" data-quantity="decrease" data-id="${escapeHtml(product.id)}"
                    aria-label="Зменшити кількість: ${escapeHtml(product.title)}"
                    ${product.quantity <= 1 ? 'disabled' : ''}>−</button>
                <span>${escapeHtml(product.quantity)}</span>
                <button type="button" data-quantity="increase" data-id="${escapeHtml(product.id)}"
                    aria-label="Збільшити кількість: ${escapeHtml(product.title)}">+</button>
            </div>
            <button type="button" class="btn btn--ghost"
                data-remove-from-cart="${escapeHtml(product.id)}">Видалити</button>
        </article>
    `;
};

//
function renderCart() {
    const markup = cart.map(createCartItem).join('');
    cartContainer.innerHTML = markup || '<p class="empty-state">Ваш кошик порожній.</p>';

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal.textContent = `${cart.reduce((total, item) => total + item.price * item.quantity, 0)} ₴`;
    clearCartButton.disabled = cart.length === 0;
    checkoutButton.disabled = cart.length === 0;
}

//
cartContainer.addEventListener('click', event => {
    const button = event.target.closest('[data-remove-from-cart], [data-quantity]');
    if (!button || !cartContainer.contains(button)) return;

    if (button.hasAttribute('data-remove-from-cart')) {
        cart = cart.filter(item => String(item.id) !== button.dataset.removeFromCart);
    } else {
        const product = cart.find(item => String(item.id) === button.dataset.id);
        if (!product) return;

        if (button.dataset.quantity === 'increase') {
            product.quantity += 1;
        } else {
            product.quantity = Math.max(1, product.quantity - 1);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
});

clearCartButton.addEventListener('click', () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
});

checkoutButton.addEventListener('click', () => {
    if (!cart.length) return;
    toast.textContent = '';
    checkoutTotal.textContent = cartTotal.textContent;
    checkoutDialog.showModal();
});

cancelCheckoutButton.addEventListener('click', () => {
    checkoutDialog.close();
});

checkoutForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!cart.length) return;

    const order = {
        id: Date.now(),
        customer: {
            name: checkoutForm.elements.name.value.trim(),
            phone: checkoutForm.elements.phone.value.trim(),
            address: checkoutForm.elements.address.value.trim(),
        },
        items: cart,
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    try {
        localStorage.setItem('lastOrder', JSON.stringify(order));
        localStorage.setItem('cart', '[]');
    } catch (error) {
        toast.textContent = 'Не вдалося зберегти замовлення. Кошик залишився без змін.';
        return;
    }

    cart = [];
    renderCart();
    checkoutDialog.close();
    checkoutForm.reset();
    toast.textContent = `Замовлення №${order.id} збережено в браузері.`;
});

//
renderCart();
