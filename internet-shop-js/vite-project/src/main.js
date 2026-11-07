// 
const productsContainer = document.querySelector('#products');
const resultsInfo = document.querySelector('#results-info');
const cartCount = document.querySelector('[data-cart-count]');
const filters = document.querySelector('#filters');

//
let products = [];
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

//
function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

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
const createProductCard = (product) => {
    const imageValue = String(product.image ?? '');
    const isImageUrl =
        imageValue.startsWith('https://') ||
        imageValue.startsWith('http://');

    const image = isImageUrl
        ? `<img src="${escapeHtml(imageValue)}" alt="${escapeHtml(product.title)}" loading="lazy">`
        : `<div class="card__emoji" aria-hidden="true">${escapeHtml(imageValue || '📦')}</div>`;

    return `
        <article class="card">
            ${image}
            <h2>${escapeHtml(product.title)}</h2>
            <p>${escapeHtml(product.category)}</p>
            <p>${escapeHtml(product.description)}</p>
            <p>★ ${escapeHtml(product.rating)} / 5</p>
            <p class="card__price">${escapeHtml(product.price)} ₴</p>
            <button type="button" class="btn" data-add-to-cart="${escapeHtml(product.id)}">Додати в кошик</button>
        </article>
    `;
};

//
const renderProducts = () => {
    const search = filters.elements.search.value.trim().toLocaleLowerCase('uk');
    const category = filters.elements.category.value;
    const sort = filters.elements.sort.value;

    const visibleProducts = products.filter(product => {
        const matchesSearch = product.title.toLocaleLowerCase('uk').includes(search);
        const matchesCategory = category === 'all' || product.category === category;
        return matchesSearch && matchesCategory;
    });

    if (sort === 'price-asc') {
        visibleProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        visibleProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'title-asc') {
        visibleProducts.sort((a, b) => a.title.localeCompare(b.title, 'uk'));
    } else if (sort === 'rating-desc') {
        visibleProducts.sort((a, b) => b.rating - a.rating);
    }

    const markup = visibleProducts.map(createProductCard).join('');
    productsContainer.innerHTML = markup;
    resultsInfo.textContent = visibleProducts.length
        ? `Товарів: ${visibleProducts.length} із ${products.length}`
        : 'За вашим запитом товарів не знайдено.';
};

const fillCategories = () => {
    const categoryNames = {
        electronics: 'Електроніка',
        clothing: 'Одяг',
        books: 'Книги',
        home: 'Дім',
        accessories: 'Аксесуари',
    };
    const categories = [...new Set(products.map(product => product.category))];
    const markup = categories.map(category =>
        `<option value="${escapeHtml(category)}">${escapeHtml(categoryNames[category] || category)}</option>`
    ).join('');
    filters.elements.category.innerHTML = '<option value="all">Усі категорії</option>' + markup;
};

const createSkeleton = () => {
    productsContainer.setAttribute('aria-busy', 'true');
    const markup = Array.from(
        { length: 8 },
        () => '<div class="card card--skeleton" aria-hidden="true"></div>'
    ).join('');
    productsContainer.innerHTML = markup;
};

// 6. Завантаження даних з API
const loadProducts = async () => {
    try {
        createSkeleton();
        const response = await fetch('https://6aef0aa7b9925b27ce169829.mockapi.io/products');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        products = await response.json();
        fillCategories();
        renderProducts();
    } catch (error) {
        productsContainer.replaceChildren();
        resultsInfo.textContent = 'Не вдалося завантажити товари. Спробуйте оновити сторінку.';
        console.error('Error fetching products:', error);
    } finally {
        productsContainer.setAttribute('aria-busy', 'false');
    }
};

//
productsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add-to-cart]');
    if (!button || !productsContainer.contains(button)) return;

    const product = products.find(item => String(item.id) === button.dataset.addToCart);
    if (!product) return;

    const cartItem = cart.find(item => String(item.id) === String(product.id));
    if (cartItem) {
        cart = cart.map(item => {
            if (String(item.id) === String(product.id)) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            } else {
                return item;
            }
        });
    } else {
        cart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
});

filters.addEventListener('input', () => {
    if (productsContainer.getAttribute('aria-busy') !== 'true') renderProducts();
});
filters.addEventListener('submit', event => event.preventDefault());
filters.addEventListener('reset', () => {
    // Чекаємо, доки браузер скине значення полів.
    requestAnimationFrame(() => {
        if (productsContainer.getAttribute('aria-busy') !== 'true') renderProducts();
    });
});

//
updateCartCount();
resultsInfo.textContent = 'Завантаження товарів…';
loadProducts();
