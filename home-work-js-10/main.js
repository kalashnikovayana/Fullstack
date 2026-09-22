// В index.html є лише порожній контейнер: <ul id="catalog" class="catalog"></ul>. 
// Усю розмітку карток створюєш через JS. Масив клади в data.js, руками його не змінюй.
// Що треба зробити:
// Напиши функцію createProductCard(product). Вона приймає один об'єкт і повертає готовий <li>. 
// У картці мають бути зображення, назва, категорія, ціна, рейтинг, теги і статус наявності.


function createProductCard(product) {
  const li = document.createElement('li');
  li.classList.add('product-card');

  const img = document.createElement('img');
  img.src = product.image || 'https://via.placeholder.com/300x200?text=No+Image';
  img.alt = product.title;
  li.appendChild(img);

  const title = document.createElement('h2');
  title.textContent = product.title;
  li.appendChild(title);

  const category = document.createElement('p');
  category.textContent = `Категорія: ${product.category}`;
  li.appendChild(category);

  const price = document.createElement('p');
  price.textContent = `Ціна: ${product.price} грн`;
  if (product.discount) {
    const discountedPrice = product.price - (product.price * product.discount / 100);
    price.textContent += ` (Знижка: ${product.discount}%, Ціна зі знижкою: ${discountedPrice.toFixed(2)} грн)`;
    }
    li.appendChild(price);

  const rating = document.createElement('p');
  rating.textContent = `Рейтинг: ${product.rating}`;
  li.appendChild(rating);

  const tags = document.createElement('p');
  tags.textContent = `Теги: ${product.tags.length ? product.tags.join(', ') : 'немає'}`;
  li.appendChild(tags);

  const stockStatus = document.createElement('p');
  stockStatus.textContent = product.inStock ? 'В наявності' : 'Немає в наявності';
  li.appendChild(stockStatus);

  return li;
}

const catalogContainer = document.getElementById('catalog');
products.forEach(product => {
  const productCard = createProductCard(product);
  catalogContainer.appendChild(productCard);
});
