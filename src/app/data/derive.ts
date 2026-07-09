import { Gamma, HairType, ProductCategory } from '../models/product.model';

/**
 * Порт логики оригинального script.js (getProductCategory / isProductForHairType),
 * но с ЯВНОЙ гаммой вместо угадывания её из строки пути к картинке.
 * Категория и типы волос вычисляются один раз при построении данных и хранятся
 * на товаре как явные типизированные поля.
 */

/** Тип продукта — порядок проверок повторяет оригинал (спрей попадает в leave-in). */
export function deriveCategory(
  title: string,
  description: string,
  image: string,
): ProductCategory | null {
  const t = title.toLowerCase();
  const d = description.toLowerCase();
  const img = image.toLowerCase();

  if (t.includes('шампунь') || img.includes('sham')) return 'shampoo';
  if (t.includes('кондиционер') || img.includes('cond')) return 'conditioner';
  if (t.includes('маска') || img.includes('mask')) return 'mask';
  if (
    t.includes('несмываемый') ||
    t.includes('спрей') ||
    t.includes('крем') ||
    t.includes('бальзам') ||
    d.includes('несмываемый') ||
    img.includes('spray') ||
    img.includes('cream') ||
    img.includes('balm')
  ) {
    return 'leave-in';
  }
  if (t.includes('масло') || img.includes('oil')) return 'oil';
  if (t.includes('спрей') || img.includes('spray')) return 'spray';
  return null;
}

/** Типы волос — порт правил isProductForHairType с явной гаммой. */
export function deriveHairTypes(gamma: Gamma, image: string, title: string): HairType[] {
  const img = image.toLowerCase();
  const t = title.toLowerCase();

  const has = (s: string) => img.includes(s);
  const size1000 = has('1000');
  const spray500 = has('spray 500') || has('spray%20500');
  const instacureFamily = gamma === 'instacure' || gamma === 'instacure-bond';

  const result: HairType[] = [];
  const add = (h: HairType) => {
    if (!result.includes(h)) result.push(h);
  };

  // Окрашенные волосы
  if (gamma === 'oil-wonders' && t.includes('egyptian hibiscus')) add('colored');
  if (gamma === 'unbreak-my-blonde') {
    if (has('mask')) add('colored');
    else if ((has('sham') || has('cond')) && has('300')) add('colored');
  }
  if (gamma === 'so-silver' && !size1000) add('colored');
  if (gamma === 'brass-off' && !size1000) add('colored');
  if (gamma === 'miracle-creator') add('colored');
  if (gamma === 'color-obsessed' && !size1000) add('colored');

  // Поврежденные волосы
  if (gamma === 'total-treat') add('damaged');
  if (instacureFamily && !size1000 && !spray500) add('damaged');
  if (gamma === 'miracle-creator') add('damaged');

  // Ломкие и секущиеся кончики
  if (
    gamma === 'oil-wonders' &&
    (t.includes('amazonian murumuru') || t.includes('indian amla'))
  ) {
    add('brittle');
  }
  if (gamma === 'curl' && has('mask')) add('brittle');
  if (gamma === 'food-for-soft' && !size1000) add('brittle');
  if (instacureFamily && !size1000) add('brittle');
  if (gamma === 'miracle-creator') add('brittle');

  // Пушащиеся и непослушные волосы
  if (gamma === 'mega-sleek' && !size1000) add('frizzy');
  if (gamma === 'curl' && (has('cream') || has('mask') || has('oil') || has('gel'))) add('frizzy');
  if (gamma === 'miracle-creator') add('frizzy');
  if (gamma === 'oil-wonders' && t.includes('amazonian murumuru')) add('frizzy');
  if (instacureFamily && spray500) add('frizzy');

  // Сухие волосы
  if (gamma === 'food-for-soft' && !size1000) add('dry');
  if (gamma === 'curl' && (has('cream') || has('oil') || has('mask'))) add('dry');
  if (gamma === 'high-amplify' && has('water')) add('dry');

  // Кудрявые волосы
  if (gamma === 'curl' && !size1000) add('curly');

  // Блонд
  if (gamma === 'unbreak-my-blonde' && !size1000) add('blonde');
  if (gamma === 'so-silver' && !size1000) add('blonde');

  // Тонкие и редеющие волосы
  if (gamma === 'high-amplify' && !size1000 && !has('dry')) add('thin');

  return result;
}
