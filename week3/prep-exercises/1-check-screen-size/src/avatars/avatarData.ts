export const hats = ['beanie', 'none', 'none2', 'none3', 'none4', 'none5', 'turban'] as const;
export const hatColors = ['red', 'blue', 'green', 'black'] as const;

export const accessories = ['none', 'shades', 'roundGlasses', 'tinyGlasses'] as const;
export const clothings = ['naked', 'shirt', 'dressShirt', 'vneck', 'tankTop', 'dress'] as const;
export const clothingColors = ['red', 'blue', 'green', 'black'] as const;

export const graphics = ['none', 'react', 'vue', 'redwood', 'gatsby', 'graphQL'] as const;

// функция для случайного выбора значения из массива
export function getRandom<T extends readonly unknown[]>(arr: T): T[number] {
  return arr[Math.floor(Math.random() * arr.length)];
}
