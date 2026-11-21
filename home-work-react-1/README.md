# React компоненти — Button та Input

Проєкт на React + Vite. У ньому створено два перевикористовувані компоненти:

- **Button** — кнопка, приймає props `text`, `type` (`button` / `submit`) та `onClick`.
- **Input** — поле введення, приймає props `placeholder`, `type` (`text` / `password`), `value` та `onChange`.

У `App.jsx` компоненти використовуються у формі: користувач вводить ім'я та пароль, натискає «Надіслати» — і бачить повідомлення. Кнопка «Очистити» скидає форму.

## Структура

```
src/
├── components/
│   ├── Button.jsx
│   └── Input.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Встановлення та запуск

```bash
git clone <посилання-на-репозиторій>
cd home-work-react-1
npm install
npm run dev
```

Після запуску відкрийте http://localhost:5173 у браузері.

Інші команди:

- `npm run build` — збірка проєкту
- `npm run preview` — перегляд зібраної версії
- `npm run lint` — перевірка коду лінтером

## Демо

