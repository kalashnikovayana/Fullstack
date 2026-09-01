// 1. Площа прямокутника
// Напиши функцію getRectangleArea(width, height), яка повертає площу. 
// Виклич її тричі з різними аргументами і виведи результати в консоль.
// Перевірка: getRectangleArea(3, 4) → 12.

function getRectangleArea(width, height) {
    return width * height;
}

console.log(getRectangleArea(3, 4)); // 12
console.log(getRectangleArea(5, 6)); // 30
console.log(getRectangleArea(7, 8)); // 56

// 2. Знижка
// Напиши функцію applyDiscount(price, discount), де discount — відсоток. 
// Функція повертає ціну зі знижкою. Якщо discount не передали — знижка 0.
// Перевірка: applyDiscount(1000, 15) → 850, applyDiscount(1000) → 1000.

function applyDiscount(price, discount = 0) {
    return price - (price * discount / 100);
}

console.log(applyDiscount(1000, 15)); // 850
console.log(applyDiscount(1000)); // 1000
console.log(applyDiscount(2000, 20)); // 1600

// 3. Привітання з форматуванням
// Напиши функцію greet(name), всередині якої оголошена внутрішня функція capitalize(str) — вона робить першу літеру великою, решту малою. greet повертає рядок Привіт, <Ім'я>! з уже відформатованим іменем. Спробуй викликати capitalize зовні greet і поясни, чому не виходить.
// Перевірка:greet("оЛЕГ") → "Привіт, Олег!".

function greet(name) {
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return `Привіт, ${capitalize(name)}!`;
}

console.log(greet("оЛЕГ")); // "Привіт, Олег!"