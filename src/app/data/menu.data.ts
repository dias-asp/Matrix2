import { Gamma, HairType, ProductCategory } from '../models/product.model';

export interface MenuItem<T> {
  value: T;
  label: string;
}

/** Гаммы, видимые в подменю «Гамма» (скрытые линейки исключены). */
export const GAMMA_MENU: MenuItem<Gamma>[] = [
  { value: 'food-for-soft', label: 'Food For Soft' },
  { value: 'instacure', label: 'InstaCure' },
  { value: 'curl', label: 'A Curl Can Dream' },
  { value: 'color-obsessed', label: 'Color Obsessed' },
  { value: 'glow-mania', label: 'Glow Mania' },
  { value: 'high-amplify', label: 'High Amplify' },
  { value: 'miracle-creator', label: 'Miracle Creator' },
  { value: 'brass-off', label: 'Brass Off' },
  { value: 'so-silver', label: 'So Silver' },
  { value: 'mega-sleek', label: 'Mega Sleek' },
  { value: 'total-treat', label: 'Total Treat' },
];

/** Подменю «Styling». */
export const STYLING_MENU: MenuItem<Gamma>[] = [
  { value: 'styling', label: 'Mx Styling' },
  { value: 'vavoom', label: 'Лак-спрей Vavoom' },
];

/** Подменю «Тип продукта». */
export const CATEGORY_MENU: MenuItem<ProductCategory>[] = [
  { value: 'shampoo', label: 'Шампунь для волос' },
  { value: 'conditioner', label: 'Кондиционер для волос' },
  { value: 'mask', label: 'Маски для волос' },
  { value: 'leave-in', label: 'Несмываемый уход' },
  { value: 'oil', label: 'Масло для волос' },
  { value: 'spray', label: 'Спрей для волос' },
];

/** Подменю «Тип волос». */
export const HAIR_TYPE_MENU: MenuItem<HairType>[] = [
  { value: 'colored', label: 'Окрашенные волосы' },
  { value: 'damaged', label: 'Поврежденные волосы' },
  { value: 'brittle', label: 'Ломкие и секущиеся кончики' },
  { value: 'frizzy', label: 'Пушащиеся и непослушные волосы' },
  { value: 'dry', label: 'Сухие волосы' },
  { value: 'curly', label: 'Кудрявые волосы' },
  { value: 'blonde', label: 'Блонд' },
  { value: 'thin', label: 'Тонкие и редеющие волосы' },
];

/** Человекочитаемые названия для хлебных крошек (включая скрытые/служебные). */
export const GAMMA_LABELS: Record<string, string> = {
  ...Object.fromEntries([...GAMMA_MENU, ...STYLING_MENU].map((m) => [m.value, m.label])),
};
export const CATEGORY_LABELS: Record<ProductCategory, string> = Object.fromEntries(
  CATEGORY_MENU.map((m) => [m.value, m.label]),
) as Record<ProductCategory, string>;
export const HAIR_TYPE_LABELS: Record<HairType, string> = Object.fromEntries(
  HAIR_TYPE_MENU.map((m) => [m.value, m.label]),
) as Record<HairType, string>;
