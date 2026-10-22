// Частина 1: fetch + then + catch
// Зроби GET-запит на обраний ресурс.

// 1) Використовуй лише fetch, .then, .catch (і за бажанням .finally). Без async/await.

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error('Помилка при завантаженні посту:', error));

// 2) Розпарс відповідь через response.json().

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Запит не вдався: ${response.status}`);
    }
    return response.json(); 
  })
  .then(data => console.log(data)) 
  .catch(error => console.error('Помилка:', error)); 

// 3) Виведи в консоль щось осмислене, а не весь масив. Наприклад: «Знайдено 100 постів, перший: …» або імена всіх користувачів.
// 4) У .catch виведи зрозуміле повідомлення про помилку.

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Сервер повернув статус ${response.status}`);
    }
    return response.json();
  })
  .then(posts => {
    console.log(`Знайдено ${posts.length} постів, перший: "${posts[0].title}"`);
  })
  .catch(error => {
    console.error('Не вдалося завантажити пости:', error.message);
  });

// 5) Перевір обробку помилок: зроби запит на неіснуючий ресурс, наприклад /posts/99999 або /postss, 
// і переконайся, що спрацював саме .catch.

fetch('https://jsonplaceholder.typicode.com/postss')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Сервер повернув статус ${response.status}`);
    }
    return response.json();
  })
  .then(posts => {
    console.log(`Знайдено ${posts.length} постів, перший: "${posts[0].title}"`);
  })
  .catch(error => {
    console.error('Не вдалося завантажити пости:', error.message);
  });


// Частина 2: async + await
// Перепиши той самий код.

// 1) Оголоси async-функцію, наприклад loadPosts(), і виклич її.
async function loadPosts(url = 'https://jsonplaceholder.typicode.com/posts') {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Сервер повернув статус ${response.status}`);
    }
    const posts = await response.json();
    console.log(`Знайдено ${posts.length} постів, перший: "${posts[0].title}"`);
  } catch (error) {
    console.error('Не вдалося завантажити пости:', error.message);
  }
}

loadPosts();

// 2) Заміни ланцюжок .then на await.

async function loadPost() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1'); 
  const post = await response.json();
  console.log(post);
}

loadPost();

// 3) Заміни .catch на try/catch, а .finally (якщо був) — на finally.

async function loadPostSafe() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
      throw new Error(`Запит не вдався: ${response.status}`);
    }
    const post = await response.json();
    console.log(post);
  } catch (error) {
    console.error('Помилка при завантаженні посту:', error.message);
  } finally {
    console.log('Запит завершено');
  }
}

loadPostSafe();

// 4) Результат у консолі має бути ідентичний частині 1, і для успішного запиту, і для помилкового.

loadPosts('https://jsonplaceholder.typicode.com/postss');