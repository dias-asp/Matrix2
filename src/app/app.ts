import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderMenuComponent } from './components/header-menu.component';
import { computeCatalogView } from './data/catalog-filter';
import { Gamma, HairType, ProductCategory } from './models/product.model';
import { LayoutService } from './services/layout.service';

/**
 * Корневой компонент — «обвязка» сайта (шапка, баннеры, хлебные крошки, лого),
 * которая в оригинале жила вне .container. Состояние обвязки вычисляется из
 * текущего URL (роут + query-параметры) в LayoutService.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, HeaderMenuComponent],
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly layout = inject(LayoutService);

  protected readonly page = this.layout.page;
  protected readonly breadcrumbHtml = this.layout.breadcrumbHtml;
  protected readonly authorBannerVisible = this.layout.authorBannerVisible;
  protected readonly productsMainImageVisible = this.layout.productsMainImageVisible;

  constructor() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.updateChrome());
    this.updateChrome();
  }

  private updateChrome(): void {
    const tree = this.router.parseUrl(this.router.url);
    const segments = tree.root.children['primary']?.segments.map((s) => s.path).join('/') ?? '';
    const qp = tree.queryParams;

    if (segments === 'price') {
      this.layout.configure({ page: 'price' });
      return;
    }

    if (segments === 'catalog') {
      const view = computeCatalogView({
        gamma: (qp['gamma'] as Gamma) ?? null,
        category: (qp['category'] as ProductCategory) ?? null,
        hairType: (qp['hairType'] as HairType) ?? null,
      });
      this.layout.configure({
        page: 'catalog',
        breadcrumbHtml: view.breadcrumbHtml,
        authorBannerVisible: view.authorBannerVisible,
        productsMainImageVisible: true,
      });
      return;
    }

    this.layout.configure({ page: 'home', authorBannerVisible: true });
  }
}
