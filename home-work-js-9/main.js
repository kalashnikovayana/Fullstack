// 1. Є масив const queue = ['Аня', 'Богдан']. 
// Додай 'Віра' у кінець, а 'Гліб' - на початок. Виведи масив і його довжину.
const queue = ['Аня', 'Богдан'];

queue.push('Віра');
queue.unshift('Гліб');
console.log(queue);
console.log(queue.length);

// 2. Є масив [10, 20, 30, 40]. 
// Видали перший і останній елементи, збережи їх у змінні first і last. 
// Виведи суму first + last і масив, що залишився.
const numbers = [10, 20, 30, 40];
const first = numbers.shift();
const last = numbers.pop();
console.log(first + last);
console.log(numbers);

// 3. Є масив задач. Додай нову задачу { id: 3, title: 'Купити хліб', done: false } в кінець і видали першу. Виведи результат.

const tasks = [
  { id: 1, title: 'Почистити зуби', done: true },
  { id: 2, title: 'Приготувати сніданок', done: false },
];

tasks.push({ id: 3, title: 'Купити хліб', done: false });
tasks.shift();
console.log(tasks);

// 4. Напиши функцію addUser(users, name), яка додає нового користувача в кінець масиву. 
// id має бути на 1 більшим за id останнього елемента (якщо масив порожній - 1).

function addUser(users, name) {
  const lastUser = users[users.length - 1];
  const lastId = lastUser.id;
  const newId = lastId + 1;
  const newUser = { id: newId, name: name };
  users.push(newUser);
}

// 5. Знайди перше число, більше за 10, у масиві [3, 8, 12, 5, 20]
const numbersArray = [3, 8, 12, 5, 20];

const firstNumberGreaterThanTen = numbersArray.find(num => num > 10);
console.log(firstNumberGreaterThanTen); // Виведе 12

// 6. Знайди перший рядок довжиною більше 5 символів у 
// ['кіт', 'собака', 'пес', 'ведмідь']. Що повернеться, якщо таких немає?
const stringsArray = ['кіт', 'собака', 'пес', 'ведмідь'];

const firstLongString = stringsArray.find(str => str.length > 5);
if (firstLongString) {
  console.log(firstLongString); // Виведе 'собака'
} else {
  console.log('Рядків довжиною більше 5 символів немає');
}

// 7. Знайди перше від'ємне число в масиві [4, 0, -2, 7, -9]. 
// Якщо його немає - виведи 'Від'ємних немає'.
const mixedNumbers = [4, 0, -2, 7, -9];

const firstNegativeNumber = mixedNumbers.find(num => num < 0);
if (firstNegativeNumber !== undefined) {
  console.log(firstNegativeNumber); // Виведе -2
} else {
  console.log('Від\'ємних немає');
}

// 8. Знайди користувача з id === 2. Виведи його ім'я.
const users = [
  { id: 1, name: 'Аня', age: 25 },
  { id: 2, name: 'Богдан', age: 17 },
  { id: 3, name: 'Віра', age: 32 },
];

const userWithId2 = users.find(user => user.id === 2);
if (userWithId2) {
  console.log(userWithId2.name); // Виведе 'Богдан'
} else {
  console.log('Користувача з id === 2 немає');
}

// 9. Напиши функцію getUserName(users, id), яка повертає ім'я користувача або 'Невідомий', якщо такого id немає.

function getUserName(users, id) {
  const user = users.find(user => user.id === id);
  return user ? user.name : 'Невідомий';
}

// 10.  Знайди перший товар, якого немає в наявності, і виведи його назву.
const products = [
  { name: 'Ноутбук', price: 30000, inStock: true },
  { name: 'Миша', price: 800, inStock: false },
  { name: 'Клавіатура', price: 2500, inStock: false },
];

const firstOutOfStockProduct = products.find(product => !product.inStock);
if (firstOutOfStockProduct) {
  console.log(firstOutOfStockProduct.name); // Виведе 'Миша'
} else {
  console.log('Всі товари в наявності');
}
// 11. Залиш тільки слова, що починаються на 'к': 
const animals = ['кіт', 'собака', 'пес', 'кролик', 'ведмідь'];

const animalsStartingWithK = animals.filter(animal => animal.startsWith('к'));
console.log(animalsStartingWithK); // Виведе ['кіт', 'кролик']


// 12. Напиши функцію removeAll(array, value), яка повертає новий масив без усіх входжень value.
// removeAll([1, 2, 1, 3, 1], 1) → [2, 3].

function removeAll(array, value) {
  return array.filter(item => item !== value);
}

// 13. Отримай товари в наявності з ціною до 5000.
const products = [
  { name: 'Ноутбук', price: 30000, inStock: true },
  { name: 'Миша', price: 800, inStock: false },
  { name: 'Клавіатура', price: 2500, inStock: true },
  { name: 'Килимок', price: 300, inStock: true },
];

const affordableInStockProducts = products.filter(product => product.inStock && product.price < 5000);
console.log(affordableInStockProducts); 
// Виведе [{ name: 'Клавіатура', price: 2500, inStock: true }, { name: 'Килимок', price: 300, inStock: true }]

// 14. Отримай масив квадратів: [1, 2, 3, 4] → [1, 4, 9, 16].
const numbers = [1, 2, 3, 4];
const squares = numbers.map(num => num * num);
console.log(squares); // Виведе [1, 4, 9, 16]

// 15. Перетвори масив рядків на масив їхніх довжин: 
// ['кіт', 'собака', 'пес'] → [3, 6, 3].
const words = ['кіт', 'собака', 'пес'];
const lengths = words.map(word => word.length);
console.log(lengths); // Виведе [3, 6, 3]

// 16. Перетвори масив цін у гривнях на рядки з валютою: 
// [100, 250] → ['100 грн', '250 грн'].
const prices = [100, 250];
const pricesWithCurrency = prices.map(price => `${price} грн`);
console.log(pricesWithCurrency); // Виведе ['100 грн', '250 грн']

// 17. Отримай масив імен користувачів.
const users = [
  { id: 1, name: 'Аня', age: 25 },
  { id: 2, name: 'Богдан', age: 17 },
];

const userNames = users.map(user => user.name);
console.log(userNames); // Виведе ['Аня', 'Богдан']

/*
 * #1
 *
 * Розробити функцію, яка використовує метод reduce масиву для обчислення суми усіх елементів масиву чисел.
 Функція повинна приймати масив чисел та повертати їх суму.
*/

function sumArray(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Використання функції
// const exampleArray = [1, 2, 3, 4, 5]
// const sum = sumArray(exampleArray)
// console.log('Сума елементів масиву:', sum) // Виведення суми


/*
 * #2
 *
 * Розробити функцію, яка використовує метод map масиву для створення нового масиву, в якому кожен елемент буде вдвічі більшим за елементи вхідного масиву чисел.
*/

function doubleArrayElements(numbers) {
  return numbers.map(num => num * 2);
}

// Використання функції
// const exampleArray = [1, 2, 3, 4, 5]
// const doubledArray = doubleArrayElements(exampleArray)
// console.log('Подвоєні елементи масиву:', doubledArray) // Виведення подвоєних елементів


/*
 * #3
 *
 * Розробити клас `SkillsManager`, що відповідає за управління списком навичок. Клас повинен включати:
 * 1. Конструктор:
 * - Ініціалізує порожній масив `skills`, який буде використовуватися для зберігання навичок.
 * 2. Метод `addSkill(skill)`:
 * - Приймає один аргумент `skill` (рядок).
 * - Перевіряє, чи аргумент є рядком і має мінімум два символи.
 * - Якщо умови виконані, додає `skill` до масиву `skills` і повертає додану навичку.
 * - Якщо умови не виконані (навичка не є рядком або має менше двох символів), повертає `null`.
 * 3. Метод `getAllSkills()`:
 *   - Повертає поточний масив усіх навичок, збережених у класі.
 *
 * Загальні вимоги:
 * - Клас має бути модульним і здатним до використання в інших частинах програми, тому він повинен бути експортований.
 * - Клас має забезпечувати легке управління навичками, включаючи додавання нових навичок та отримання списку всіх наявних навичок.
 * - Код має бути написаний з урахуванням принципів чистого коду, забезпечуючи читабельність та легкість підтримки.
*/

class SkillsManager {
  constructor() {
    this.skills = [];
  }

  addSkill(skill) {
    if (typeof skill === 'string' && skill.length >= 2) {
      this.skills.push(skill);
      return skill;
    }
    return null;
  }

  getAllSkills() {
    return this.skills;
  }
}

// const skillsManager = new SkillsManager()

// console.log(skillsManager.addSkill('JavaScript'))
// console.log(skillsManager.addSkill('CSS'))
// console.log(skillsManager.getAllSkills())


/*
 * #4
 * Задача: Калькулятор дат.
 * Завдання: Створити модуль на JavaScript, який імплементує функцію-конструктор DateCalculator для створення об'єктів, здатних керувати датами. Калькулятор дат має надавати такі можливості:
 * Додавання днів: Метод addDays приймає кількість днів як аргумент і додає цю кількість до поточної дати об'єкта.
 * Віднімання днів: Метод subtractDays приймає кількість днів як аргумент і віднімає цю кількість від поточної дати об'єкта.
 * Отримання результату: Метод getResult повертає поточну дату об'єкта у форматі "YYYY-MM-DD".
 *
 * Критерії перевірки:
 * В модулі має бути визначена функція-конструктор DateCalculator, яка ініціалізує об'єкт з початковою датою.
 * Мають бути реалізовані та доступні методи addDays, subtractDays, та getResult для екземплярів DateCalculator.
 * Об'єкти DateCalculator мають створюватися за допомогою ключового слова new і використання функції-конструктора.
 */

function DateCalculator(initialDate) {
  let currentDate = new Date(initialDate);

  this.addDays = function(days) {
    currentDate.setDate(currentDate.getDate() + days);
  }

  this.subtractDays = function(days) {
    currentDate.setDate(currentDate.getDate() - days);
  }

  this.getResult = function() {
    return currentDate
  }
}

// Демонстрація використання
// const dateCalculator = new DateCalculator('2023-01-01')
// dateCalculator.addDays(5)
// console.log(dateCalculator.getResult()) // Виводить нову дату після додавання днів
//
// dateCalculator.subtractDays(3)
// console.log(dateCalculator.getResult()) // Виводить нову дату після віднімання днів

export { doubleArrayElements, sumArray, SkillsManager, DateCalculator }
