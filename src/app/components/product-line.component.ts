import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { Product, ProductLine } from '../models/product.model';
import { ProductItemComponent } from './product-item.component';

/**
 * Линейка продукции. Хост несёт класс .product-line. В режиме с заголовком —
 * раскрывающийся аккордеон; без заголовка (showHeader=false) — только сетка
 * товаров (для фильтров по типу продукта/типу волос/стайлингу).
 */
@Component({
  selector: 'app-product-line',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductItemComponent],
  host: { class: 'product-line' },
  template: `
    @if (showHeader()) {
      <div class="product-line-header" (click)="toggle()">
        <h3>{{ line().title }}</h3>
        <div class="row">
          <img [src]="line().lineImage" [alt]="line().title" class="product-line-image" />
          <p class="brief-description">{{ line().briefDescription }}</p>
        </div>
        <span class="arrow" [class.up]="expanded()">▼</span>
      </div>
    }
    <div class="product-line-content" [class.active]="expanded()">
      @if (showHeader()) {
        <p class="product-description">{{ line().description }}</p>
      }
      @for (product of items(); track product.image + product.price) {
        <app-product-item [product]="product" />
      }
    </div>
  `,
})
export class ProductLineComponent {
  readonly line = input.required<ProductLine>();
  /** Явный список товаров; если не задан — все видимые товары линейки. */
  readonly products = input<Product[] | null>(null);
  readonly showHeader = input<boolean>(true);
  /** Начальное состояние раскрытия. */
  readonly initiallyExpanded = input<boolean>(false);

  // Раскрытие следует за initiallyExpanded, но пользователь может переключать его вручную.
  protected readonly expanded = linkedSignal(() => this.initiallyExpanded());

  protected readonly items = computed(
    () => this.products() ?? this.line().products.filter((p) => !p.hidden),
  );

  toggle(): void {
    this.expanded.update((v) => !v);
  }
}
