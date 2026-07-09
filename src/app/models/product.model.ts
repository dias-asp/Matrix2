/** Гамма (линейка) продукции Matrix. */
export type Gamma =
  | 'food-for-soft'
  | 'instacure'
  | 'instacure-bond'
  | 'curl'
  | 'color-obsessed'
  | 'glow-mania'
  | 'high-amplify'
  | 'miracle-creator'
  | 'brass-off'
  | 'so-silver'
  | 'keep-me-vivid'
  | 'dark-envy'
  | 'mega-sleek'
  | 'unbreak-my-blonde'
  | 'oil-wonders'
  | 'total-treat'
  | 'styling'
  | 'vavoom';

/** Тип продукта — соответствует фильтру «Тип продукта». */
export type ProductCategory = 'shampoo' | 'conditioner' | 'mask' | 'leave-in' | 'oil' | 'spray';

/** Тип волос — соответствует фильтру «Тип волос». */
export type HairType =
  | 'colored'
  | 'damaged'
  | 'brittle'
  | 'frizzy'
  | 'dry'
  | 'curly'
  | 'blonde'
  | 'thin';

/** Отдельный товар внутри линейки. */
export interface Product {
  gamma: Gamma;
  title: string;
  /** Короткое описание под названием (может отсутствовать). */
  description?: string;
  /** Объём для отображения, например «300 мл». */
  volume: string;
  /** Цена для отображения, например «5 300 ₸». */
  price: string;
  /** Абсолютный путь к изображению, например «/products/color-obsessed/sham300.jpg». */
  image: string;
  /** Тип продукта (вычисляется). null — если товар не попадает ни в один тип. */
  category: ProductCategory | null;
  /** Типы волос, которым подходит товар (вычисляется). */
  hairTypes: HairType[];
  /** Дополнительные гаммы, в фильтрах которых товар также показывается (напр. high-amplify спрей в Mx Styling). */
  alsoInGammas?: Gamma[];
  /** Скрытый товар (был закомментирован в оригинале). */
  hidden?: boolean;
}

/** Линейка продукции (product-line в оригинале). */
export interface ProductLine {
  gamma: Gamma;
  title: string;
  /** Краткое описание рядом с картинкой линейки. */
  briefDescription: string;
  /** Полное описание внутри раскрытой линейки. */
  description: string;
  /** Путь к главному изображению линейки. */
  lineImage: string;
  products: Product[];
  /** Скрытая линейка (была закомментирована в оригинале). */
  hidden?: boolean;
}
