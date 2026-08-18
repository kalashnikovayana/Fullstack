# Product Feedback App

Адаптивний застосунок для керування пропозиціями продукту, реалізований за макетом Frontend Mentor.

## Можливості

- візуальний список категорій пропозицій;
- окремі статичні сторінки пропозицій, деталей, форм і roadmap;
- roadmap зі статусами Planned, In-Progress і Live та мобільними вкладками;
- HTML-валідація форм і порожній стан;
- адаптивні макети для desktop, tablet і mobile, доступна клавіатурна навігація.

## Технології

Semantic HTML5 і SCSS (змінні, міксини, вкладення та media queries). Проєкт не використовує JavaScript або backend.

## Запуск

Відкрийте `starter-code/index.html` у браузері або запустіть його через розширення **Live Server** у VS Code. Для компіляції SCSS можна використовувати **Live Sass Compiler**. Жодних пакетів установлювати не потрібно.

## Структура

- `starter-code/index.html` — список пропозицій;
- `starter-code/roadmap.html` — roadmap;
- `starter-code/feedback-detail.html` — деталі та обговорення;
- `starter-code/feedback-new.html`, `feedback-edit.html` — форми;
- `starter-code/styles/abstract` — SCSS-змінні та міксини;
- `starter-code/styles/base` — базові стилі й reset;
- `starter-code/styles/components` — стилі компонентів і сторінок;
- `starter-code/styles/main.scss` — головний файл імпортів;
- `starter-code/styles/main.css` — скомпільований CSS для браузера;

## GitHub Pages

У налаштуваннях репозиторію відкрийте **Settings → Pages**, оберіть **Deploy from a branch** і папку `/starter-code` (якщо інтерфейс GitHub не дозволяє цю папку, перенесіть її вміст у корінь репозиторію або використайте workflow). Після публікації додайте фактичні URL репозиторію та live demo сюди.
