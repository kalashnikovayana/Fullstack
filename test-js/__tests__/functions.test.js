const { ageClassification, weekFn } = require('../functions')

describe('ageClassification', () => {
  test('повертає null для віку 0 і менше', () => {
    expect(ageClassification(-1)).toBe(null)
    expect(ageClassification(0)).toBe(null)
  })

  test('від 1 до 24 — Дитинство', () => {
    expect(ageClassification(1)).toBe('Дитинство')
    expect(ageClassification(24)).toBe('Дитинство')
  })

  test('від 24.01 до 44 — Молодість', () => {
    expect(ageClassification(24.01)).toBe('Молодість')
    expect(ageClassification(44)).toBe('Молодість')
  })

  test('від 44.01 до 65 — Зрілість', () => {
    expect(ageClassification(44.01)).toBe('Зрілість')
    expect(ageClassification(65)).toBe('Зрілість')
  })

  test('від 65.1 до 75 — Старість', () => {
    expect(ageClassification(65.1)).toBe('Старість')
    expect(ageClassification(75)).toBe('Старість')
  })

  test('від 75.01 до 90 — Довголіття', () => {
    expect(ageClassification(75.01)).toBe('Довголіття')
    expect(ageClassification(90)).toBe('Довголіття')
  })

  test('від 90.01 до 122 — Рекорд', () => {
    expect(ageClassification(90.01)).toBe('Рекорд')
    expect(ageClassification(122)).toBe('Рекорд')
  })

  test('повертає null для віку більше 122', () => {
    expect(ageClassification(122.01)).toBe(null)
    expect(ageClassification(150)).toBe(null)
  })
})

describe('weekFn', () => {
  test('повертає назву дня для чисел від 1 до 7', () => {
    expect(weekFn(1)).toBe('Понеділок')
    expect(weekFn(2)).toBe('Вівторок')
    expect(weekFn(3)).toBe('Середа')
    expect(weekFn(4)).toBe('Четвер')
    expect(weekFn(5)).toBe('П\'ятниця')
    expect(weekFn(6)).toBe('Субота')
    expect(weekFn(7)).toBe('Неділя')
  })

  test('повертає null для числа поза діапазоном', () => {
    expect(weekFn(9)).toBe(null)
  })

  test('повертає null для дробового числа', () => {
    expect(weekFn(1.5)).toBe(null)
  })

  test('повертає null для рядка', () => {
    expect(weekFn('2')).toBe(null)
  })
})
