import { Injectable, effect, inject, signal } from '@angular/core';
import { BodyClassService } from './body-class.service';

export type PageKind = 'home' | 'price' | 'catalog';

/**
 * Централизует состояние «обвязки» (chrome), которая в оригинале жила вне
 * .container и переключалась через JS: верхний баннер, хлебные крошки,
 * баннер автора, главное изображение каталога. Страницы выставляют эти сигналы
 * в ngOnInit, а корневой App рендерит обвязку из них.
 */
@Injectable({ providedIn: 'root' })
export class LayoutService {
  private readonly bodyClass = inject(BodyClassService);

  readonly page = signal<PageKind>('home');
  readonly breadcrumbHtml = signal<string | null>(null);
  readonly authorBannerVisible = signal<boolean>(true);
  readonly productsMainImageVisible = signal<boolean>(false);

  constructor() {
    // Класс body повторяет оригинал: home -> main-page-active, иначе products-page-active.
    effect(() => {
      this.bodyClass.setPageClass(
        this.page() === 'home' ? 'main-page-active' : 'products-page-active',
      );
    });
  }

  /** Устанавливает состояние обвязки для страницы. */
  configure(state: {
    page: PageKind;
    breadcrumbHtml?: string | null;
    authorBannerVisible?: boolean;
    productsMainImageVisible?: boolean;
  }): void {
    this.page.set(state.page);
    this.breadcrumbHtml.set(state.breadcrumbHtml ?? null);
    this.authorBannerVisible.set(state.authorBannerVisible ?? true);
    this.productsMainImageVisible.set(state.productsMainImageVisible ?? false);
  }
}
