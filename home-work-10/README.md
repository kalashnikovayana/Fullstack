# Домашнє завдання 10 — SCSS

Рефакторинг шаблону "Simple Site" (домашнє завдання 9) з CSS на SCSS.

## Структура

```
scss/
  abstracts/       // змінні та міксини (нічого не рендерять напряму)
    _variables.scss
    _mixins.scss
    _index.scss   // @forward variables + mixins
  base/             // reset та базова типографіка
    _reset.scss
    _typography.scss
    _index.scss
  layout/
    _container.scss
  components/       // по одному файлу на блок сторінки
    _button.scss
    _hero.scss
    _about.scss
    _stats.scss
    _video.scss
    _footer.scss
    _index.scss
  main.scss         // точка входу, @use всіх модулів
style.css           // скомпільований файл, підключений в index.html
```

Модулі підключаються через `@use` / `@forward` (без застарілого `@import`).
Всі CSS custom properties замінені на SCSS-змінні (`$color-accent`, `$container-width` тощо), медіа-запити винесені в міксин `respond-to($breakpoint)`, який бере брейкпоінти з мапи `$breakpoints`.

## Компіляція SCSS → CSS

```bash
npx sass scss/main.scss style.css --style=expanded --no-source-map
```
