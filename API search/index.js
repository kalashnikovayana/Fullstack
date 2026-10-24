// Загальні вимоги до завдання:

// Використання зовнішнього API:Інтегрувати API для отримання даних, що відповідають тематиці проєкту 
// (наприклад, OMDb API для пошуку фільмів).
// Функціонал "LiveSearch":Реалізувати можливість відображення результатів пошуку в реальному часі, 
// як тільки користувач починає вводити запит у пошукове поле.
// Забезпечити оновлення результатів без потреби натискати на кнопку "Пошук".
// Відображення результатів пошуку:Кожен результат пошуку повинен включати ключову інформацію, 
// залежно від тематики проєкту (наприклад, для фільмів: назву, рік випуску, тип та постер).
// Користувацький інтерфейс:Розробити користувацький інтерфейс, який буде інтуїтивно зрозумілим, 
// легким у використанні та візуально привабливим.
// Інтерфейс має адаптуватися під різні розміри екранів та пристрої.
// Робота з помилками та винятками:Імплементувати належне управління помилками та винятковими ситуаціями, 
// які можуть виникати під час запитів до API або в процесі роботи програми.
// Ці загальні вимоги можуть бути адаптовані під різні типи проєктів, в залежності від задачі та обраної тематики. 
// Важливо, щоб кожен студент зміг демонструвати розуміння основних концепцій розробки веб-додатків, 
// а також вміння працювати з зовнішніми API та обробляти дані в реальному часі.


const searchInput = document.getElementById('search');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');

let timerId;

async function searchShows(query) {
  const response = await fetch('https://api.tvmaze.com/search/shows?q=' + query);

  if (!response.ok) {
    throw new Error('Помилка сервера: ' + response.status);
  }

  const data = await response.json();
  return data;
}

function createShowCard(item) {
  const { name, type, premiered, image } = item.show;

  const card = document.createElement('li');
  card.className = 'card';

  let poster;
  if (image?.medium) {
    poster = document.createElement('img');
    poster.src = image.medium;
    poster.alt = name;
  } else {
    poster = document.createElement('div');
    poster.textContent = 'Немає постера';
  }
  poster.classList.add('card__poster');

  const title = document.createElement('h2');
  title.className = 'card__title';
  title.textContent = name;

  let year = '—';
  if (premiered) {
    year = premiered.slice(0, 4);
  }

  const info = document.createElement('p');
  info.className = 'card__info';
  info.textContent = year + ' · ' + type;

  card.append(poster, title, info);
  return card;
}

function renderShows(shows) {
  resultsEl.innerHTML = '';

  shows.forEach((item) => {
    const card = createShowCard(item);
    resultsEl.append(card);
  });
}

function showStatus(text, isError) {
  statusEl.textContent = text;

  if (isError) {
    statusEl.classList.add('status--error');
  } else {
    statusEl.classList.remove('status--error');
  }
}

async function handleSearch() {
  const query = searchInput.value.trim();

  if (query === '') {
    resultsEl.innerHTML = '';
    showStatus('', false);
    return;
  }

  showStatus('Завантаження...', false);

  try {
    const shows = await searchShows(query);

    if (query !== searchInput.value.trim()) {
      return;
    }

    if (shows.length === 0) {
      resultsEl.innerHTML = '';
      showStatus('За запитом "' + query + '" нічого не знайдено', false);
      return;
    }

    showStatus('Знайдено: ' + shows.length, false);
    renderShows(shows);
  } catch (error) {
    console.error(error);
    resultsEl.innerHTML = '';
    showStatus('Не вдалося завантажити дані. Перевір інтернет і спробуй ще раз.', true);
  }
}

searchInput.addEventListener('input', () => {
  clearTimeout(timerId);                 
  timerId = setTimeout(handleSearch, 500);
});
