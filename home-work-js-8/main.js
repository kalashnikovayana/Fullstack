console.log('#6. JavaScript homework example file')

/*
 * #1
 * Задача: Калькулятор калорійності продуктів через клас.
 * Завдання: Розробити модуль на JavaScript, який імплементує клас CalorieCalculator. Клас має використовувати Map для управління даними про калорійність продуктів. Необхідно реалізувати наступні функціональності:
 * Додавання продуктів: Метод addProduct приймає назву продукту та його калорійність, додаючи їх до колекції.
 * Отримання калорійності продукту: Метод getProductCalories повертає калорійність продукту за його назвою. Якщо продукт не знайдено, повертає рядок 'Product not found'.
 * Видалення продукту: Метод removeProduct видаляє продукт з колекції за назвою.
 *
 * Критерії перевірки:
 * Клас CalorieCalculator має бути реалізований з використанням ключового слова class.
 * Внутрішнє сховище продуктів має бути реалізоване за допомогою new Map().
 * Наявність методів addProduct, getProductCalories, та removeProduct.
 */

class CalorieCalculator {
  constructor() {
    this.products = new Map()
  }

  addProduct(productName, calories) {
    this.products.set(productName, calories)
  }

  getProductCalories(productName) {
    if (this.products.has(productName)) {
      return this.products.get(productName)
    } else {
      return 'Product not found'
    }
  }

  removeProduct(productName) {
    this.products.delete(productName)
  }
}

// Демонстрація використання
// const calorieCalculator = new CalorieCalculator()
// calorieCalculator.addProduct('Apple', 52)
// calorieCalculator.addProduct('Banana', 89)
//
// console.log(calorieCalculator.getProductCalories('Apple')) // 52
// console.log(calorieCalculator.getProductCalories('Banana')) // 89
//
// calorieCalculator.removeProduct('Apple')
// console.log(calorieCalculator.getProductCalories('Apple')) // Product not found

/*
 * #2
 * Задача: Унікальні користувачі.
 * Завдання: Реалізувати модуль на JavaScript у формі класу UniqueUsernames, який використовує Set для збереження унікальних імен користувачів. Клас має надавати можливість:
 * Додавання імен користувачів: Метод addUser дозволяє додати нове ім'я до набору. Якщо ім'я вже існує, воно не буде додано повторно, зберігаючи унікальність імен у наборі.
 * Перевірка наявності імені: Метод exists перевіряє, чи існує задане ім'я серед збережених унікальних імен.
 * Отримання кількості унікальних імен: Метод count повертає кількість унікальних імен, збережених у наборі.
 *
 * Критерії перевірки:
 * Наявність методів addUser, exists, count у класі UniqueUsernames.
 * Використання конструкції class для створення класу UniqueUsernames.
 * Застосування new Set() для внутрішнього сховища імен користувачів у конструкторі класу.
 */

class UniqueUsernames {
  constructor() {
    this.usernames = new Set()
  }

  addUser(username) {
    if (!this.usernames.has(username)) {
      this.usernames.add(username)
    }
  }

  exists(username) {
    return this.usernames.has(username)
  }

  count() {
    return this.usernames.size
  }
}

// Демонстрація використання
// const uniqueUsernames = new UniqueUsernames()
// uniqueUsernames.addUser('john_doe')
// uniqueUsernames.addUser('jane_doe')
// uniqueUsernames.addUser('john_doe') // Ця дія не змінить набір, оскільки 'john_doe' вже існує
//
// console.log(`Існує 'john_doe': ${uniqueUsernames.exists('john_doe')}`) // true
// console.log(`Кількість унікальних імен: ${uniqueUsernames.count()}`) // 2

// Експорт для використання в тестах
export { CalorieCalculator, UniqueUsernames }

// 1) Телефонна книга (Map + цикл)
// Створи Map, де ключ — ім'я, значення — номер телефону:
// const phoneBook = new Map();
// phoneBook.set("Оля", "050-111-22-33");
// phoneBook.set("Іван", "067-444-55-66");
// phoneBook.set("Марія", "093-777-88-99");
// Напиши три функції:
// findPhone(name) — повертає номер за ім'ям або "Контакт не знайдено".
// removeContact(name) — видаляє контакт і виводить "Контакт видалено", або "Такого контакту нема".
// printAll() — виводить кожен контакт у форматі Ім'я: номер.
// findPhone("Іван");      // → "067-444-55-66"
// findPhone("Петро");     // → "Контакт не знайдено"

// removeContact("Оля");   // Контакт видалено
// removeContact("Оля");   // Такого контакту нема

// printAll();
// // Іван: 067-444-55-66
// // Марія: 093-777-88-99

const phoneBook = new Map()

phoneBook.set('Оля', '050-111-22-33')
phoneBook.set('Іван', '067-444-55-66')
phoneBook.set('Марія', '093-777-88-99')

console.log(phoneBook)

function findPhone(name) {
  if (phoneBook.has(name)) {
    return phoneBook.get(name)
  } else {
    return 'Контакт не знайдено'
  }
}

function removeContact(name) {
  if (phoneBook.has(name)) {
    phoneBook.delete(name)
    return 'Контакт видалено'
  } else {
    return 'Такого контакту нема'
  }
}

function printAll() {
  for (const [name, phone] of phoneBook) {
    console.log(`${name}: ${phone}`)
  }
}

console.log(findPhone('Іван'))  // 067-444-55-66
console.log(findPhone('Петро')) // Контакт не знайдено

console.log(removeContact('Оля')) // Контакт видалено
console.log(removeContact('Оля')) // Такого контакту нема

console.log('Всі контакти:')
printAll()
// Іван: 067-444-55-66
// Марія: 093-777-88-99


// 2) Чи є число в списку (Set + умова)
// Є список дозволених кодів:
// const allowedCodes = new Set();
// allowedCodes.add(101);
// allowedCodes.add(205);
// allowedCodes.add(333);Напиши функцію checkCode(code), яка виводить "Доступ дозволено", якщо код є в списку, і "Доступ заборонено", якщо нема.
// checkCode(205); // Доступ дозволено
// checkCode(999); // Доступ заборонен

const allowedCodes = new Set()

allowedCodes.add(101)
allowedCodes.add(205)
allowedCodes.add(333)

function checkCode(code) {
  if (allowedCodes.has(code)) {
    console.log("Доступ дозволено")
  } else {
    console.log("Доступ заборонено")
  }
}

checkCode(205); // Доступ дозволено
checkCode(999); // Доступ заборонено
