import { Gamma, HairType, Product, ProductCategory, ProductLine } from '../models/product.model';
import { PRODUCT_LINES } from './products.data';
import { CATEGORY_LABELS, GAMMA_LABELS, HAIR_TYPE_LABELS } from './menu.data';

export interface CatalogFilter {
  gamma?: Gamma | null;
  category?: ProductCategory | null;
  hairType?: HairType | null;
}

/** Группа товаров для «плоского» режима (без заголовка линейки). */
export interface ProductGroup {
  line: ProductLine;
  products: Product[];
}

export interface CatalogView {
  /** 'accordion' — линейки с заголовками; 'grid' — плоские группы товаров. */
  mode: 'accordion' | 'grid';
  /** Линейки для режима accordion (в порядке каталога). */
  lines: ProductLine[];
  /** Группы товаров для режима grid. */
  groups: ProductGroup[];
  /** Раскрыты ли линейки по умолчанию (accordion). */
  expanded: boolean;
  /** HTML хлебных крошек или null. */
  breadcrumbHtml: string | null;
  /** Виден ли баннер автора. */
  authorBannerVisible: boolean;
}

const visibleLines = (): ProductLine[] => PRODUCT_LINES.filter((l) => !l.hidden);
const visibleProducts = (line: ProductLine): Product[] => line.products.filter((p) => !p.hidden);

const crumb = (section: string, name: string): string =>
  `Продукция Matrix/${section}/<span class="final">${name}</span>`;

/** Вычисляет представление каталога по активному фильтру (0 или 1 активный). */
export function computeCatalogView(filter: CatalogFilter): CatalogView {
  const lines = visibleLines();

  // Фильтр по гамме
  if (filter.gamma) {
    const gamma = filter.gamma;

    // Особый случай: «Mx Styling» собирает товары styling + кросс-листинг (high-amplify спрей).
    if (gamma === 'styling') {
      const stylingLine = lines.find((l) => l.gamma === 'styling')!;
      const own = visibleProducts(stylingLine);
      const crossListed = lines
        .flatMap(visibleProducts)
        .filter((p) => p.gamma !== 'styling' && p.alsoInGammas?.includes('styling'));
      return {
        mode: 'grid',
        lines: [],
        groups: [{ line: stylingLine, products: [...own, ...crossListed] }],
        expanded: true,
        breadcrumbHtml: crumb('Гамма', GAMMA_LABELS[gamma]),
        authorBannerVisible: false,
      };
    }

    // «InstaCure» в оригинале показывает и обычную линейку, и Build-a-Bond.
    const matches = lines.filter(
      (l) => l.gamma === gamma || (gamma === 'instacure' && l.gamma === 'instacure-bond'),
    );
    return {
      mode: 'accordion',
      lines: matches,
      groups: [],
      expanded: true,
      breadcrumbHtml: crumb('Гамма', GAMMA_LABELS[gamma]),
      authorBannerVisible: false,
    };
  }

  // Фильтр по типу продукта
  if (filter.category) {
    const category = filter.category;
    const groups = lines
      .map((line) => ({ line, products: visibleProducts(line).filter((p) => p.category === category) }))
      .filter((g) => g.products.length > 0);
    return {
      mode: 'grid',
      lines: [],
      groups,
      expanded: true,
      breadcrumbHtml: crumb('Тип продукта', CATEGORY_LABELS[category]),
      authorBannerVisible: false,
    };
  }

  // Фильтр по типу волос
  if (filter.hairType) {
    const hairType = filter.hairType;
    const groups = lines
      .map((line) => ({
        line,
        products: visibleProducts(line).filter((p) => p.hairTypes.includes(hairType)),
      }))
      .filter((g) => g.products.length > 0);
    return {
      mode: 'grid',
      lines: [],
      groups,
      expanded: true,
      breadcrumbHtml: crumb('Тип волос', HAIR_TYPE_LABELS[hairType]),
      authorBannerVisible: false,
    };
  }

  // Без фильтра — аккордеон всех видимых линеек
  return {
    mode: 'accordion',
    lines,
    groups: [],
    expanded: false,
    breadcrumbHtml: null,
    authorBannerVisible: true,
  };
}
